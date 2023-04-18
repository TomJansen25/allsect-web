import React, { useState, useEffect, useCallback } from "react"
import { CardContent } from "@mui/material"
import { Masonry } from "@mui/lab"
import { PrismicRichText } from "@prismicio/react"
import RecipeCard from "./recipeCard"
import styled from "styled-components"

import {
    UnstyledGatsbyLink,
    CardItem,
    GeneralCard,
    CardTitle,
    CardShadow,
} from "../styled"
import { brandColors } from "../../styles/brandColors"
import variables from "../../styles/variables"

const RecipeCardItem = styled(CardItem)`
    margin: auto;
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
        <div>
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
                                <PrismicRichText
                                    field={recipe.data.title.richText}
                                    components={{ heading2: ({ children }) => <span>{children}</span>, }}
                                />
                            </RecipeCardTitle>
                        </CardContent>
                    </UnstyledGatsbyLink>
                </RecipeCardWrapper>
                <CardShadow />
            </RecipeCardItem>
        </div>
    )
}

const RecipeGrid = ({ recipes, view }) => {
    const [latestRecipeIndex, setlatestRecipeIndex] = useState(6)
    const [isBottom, setIsBottom] = useState(false)
    const maxIndex = recipes.length

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
                <Masonry columns={3} spacing={2}>
                    {recipes
                        .slice(0, latestRecipeIndex)
                        .map((recipe, index) => {
                            return (
                                <div key={recipe.data.uid}>
                                    <AltRecipeCard
                                        recipe={recipe}
                                        i={index}
                                        view={view}
                                        key={index}
                                    />
                                </div>
                            )
                        })}
                </Masonry>
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
