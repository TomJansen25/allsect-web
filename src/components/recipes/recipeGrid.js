import React, { useState, useEffect, useCallback } from "react"
import CardContent from "@material-ui/core/CardContent"
import { RichText } from "prismic-reactjs"
import RecipeCard from "./recipeCard"
import styled from "styled-components"

import {
    MasonryWrapper,
    UnstyledGatsbyLink,
    CardItem,
    GeneralCard,
    CardTitle,
    CardShadow,
} from "../styled"
import { brandColors } from "../../styles/brandColors"
import variables from "../../styles/variables"

const RecipeCardItem = styled(CardItem)`
    margin: 0px auto 50px auto;

    @media (max-width: ${variables.maxWidthSM}) {
        margin: 0px auto 25px auto;
    }
`

const RecipeCardTitle = styled(CardTitle)`
    color: white;
    font-size: 1.1rem;
    margin: auto;
    text-align: center;
`

const RecipeCardImg = styled.img`
    width: 100%;
    object-fit: cover;
    transition: transform 0.5s ease-in-out;

    @media (min-width: ${variables.muiSMwidth}) {
        height: 220px;
    }
    @media (max-width: ${variables.muiSMwidth}) {
        height: 140px;
    }
`

const RecipeCardWrapper = styled(GeneralCard)`
    background-color: ${brandColors.orange};
    padding: 1px;
    overflow: hidden;

    &:hover {
        ${RecipeCardImg} {
            transform: scale(1.15);
        }
    }
`

const AltRecipeCard = ({ recipe, i, view }) => {
    return (
        <RecipeCardItem>
            <RecipeCardWrapper>
                <UnstyledGatsbyLink to={recipe.url}>
                    <div style={{ overflow: "hidden" }}>
                        <RecipeCardImg
                            src={recipe.data.main_image.url}
                            alt={recipe.data.main_image.alt}
                        />
                    </div>
                    <CardContent style={{ padding: "16px" }}>
                        <RecipeCardTitle view={view}>
                            {RichText.asText(recipe.data.title.richText)}
                        </RecipeCardTitle>
                    </CardContent>
                </UnstyledGatsbyLink>
            </RecipeCardWrapper>
            <CardShadow />
        </RecipeCardItem>
    )
}

const RecipeGrid = ({ recipes, view }) => {
    const [latestRecipeIndex, setlatestRecipeIndex] = useState(6)
    const [isBottom, setIsBottom] = useState(false)
    const maxIndex = recipes.length

    const breakpointColumnsObj = {
        default: 3,
        1100: 2,
    }

    function handleScroll() {
        const scrollTop =
            (document.documentElement && document.documentElement.scrollTop) ||
            document.body.scrollTop
        const scrollHeight =
            (document.documentElement &&
                document.documentElement.scrollHeight) ||
            document.body.scrollHeight
        if (scrollTop + window.innerHeight + 100 >= scrollHeight) {
            setIsBottom(true)
        }
    }

    const loadMore = useCallback(() => {
        if (view === "grid") {
            setlatestRecipeIndex(latestRecipeIndex + 6)
        } else if (view === "list") {
            setlatestRecipeIndex(latestRecipeIndex + 4)
        }
        setIsBottom(false)
    }, [view, latestRecipeIndex])

    useEffect(() => {
        if (isBottom && maxIndex >= latestRecipeIndex) {
            loadMore()
        }
    }, [isBottom, loadMore, maxIndex, latestRecipeIndex])

    useEffect(() => {
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    })

    return (
        <div>
            {view === "grid" ? (
                <MasonryWrapper
                    breakpointCols={breakpointColumnsObj}
                    columnClassName="masonry-col"
                >
                    {recipes
                        .slice(0, latestRecipeIndex)
                        .map((recipe, index) => {
                            return (
                                <AltRecipeCard
                                    recipe={recipe}
                                    i={index}
                                    view={view}
                                    key={index}
                                />
                            )
                        })}
                </MasonryWrapper>
            ) : (
                recipes.slice(0, latestRecipeIndex).map((recipe, index) => {
                    return (
                        <RecipeCard
                            recipe={recipe}
                            i={index}
                            view={view}
                            key={index}
                        />
                    )
                })
            )}
        </div>
    )
}

export default RecipeGrid
