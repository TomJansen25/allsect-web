import React from "react"
// import { PrismicRichText } from "@prismicio/react";
import { asText } from "@prismicio/richtext";
import { Link } from "gatsby"
import PropTypes from "prop-types"
import { Card, CardMedia } from "@mui/material"
import styled from "styled-components"

import { UnstyledGatsbyLink, BigHeader } from "../styled"
import variables from "../../styles/variables"

const CardBackdrop = styled.div`
    position: absolute;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
    background-color: black;
    opacity: 0.25;
    transition: opacity ease-in-out 0.25s;
`

const CardTitleBox = styled.div`
    position: absolute;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 25px;
`

const CardTitle = styled.span`
    color: white;
    font-size: 1.2rem;
    font-weight: 600;
    position: relative;
    text-transform: uppercase;
    padding: 10px;
    @media (max-width: 1200px) and (min-width: ${variables.muiMDwidth}) {
        font-size: 0.9rem;
    }
    @media (max-width: ${variables.maxWidthSM}) {
        font-size: 0.9rem;
    }
`

const CardTitleUnderline = styled.span`
    height: 3px;
    width: 30px;
    background-color: white;
    position: absolute;
    bottom: -5px;
    left: calc(50% - 15px);
    transition: opacity ease-in-out 0.25s;
`

const CardWrapper = styled(Card)`
    margin: auto;
    box-shadow: none;
    border-radius: 0;
    position: relative;
    width: 100%;

    &:hover {
        z-index: 1;
        ${CardBackdrop} {
            opacity: 0.1;
        }
        ${CardTitleUnderline} {
            opacity: 0;
        }
        ${CardTitle} {
            border: 4px solid white;
        }
    }
`

const CardMediaWrapper = styled(CardMedia)`
    height: 300px;
    @media (max-width: ${variables.muiMDwidth}) {
        height: 150px;
    }
    text-align: center;
    color: white;
`

const CardLinkWrapper = styled(Link)`
    margin: auto;
    width: 23.5%;

    @media (max-width: ${variables.muiMDwidth}) {
        width: 48%;
        margin-bottom: 5px;
    }
`

const RecipeCard = ({ recipe, i }) => {
    return (
        <CardLinkWrapper to={recipe.url} key={i}>
            <CardWrapper>
                <CardMediaWrapper
                    image={recipe.data.main_image.thumbnails.thumbnail.url}
                    title={recipe.data.main_image.thumbnails.thumbnail.alt}
                >
                    <CardBackdrop />
                    <CardTitleBox>
                        <CardTitle>
                            {asText(recipe.data.title.richText)}
                            <CardTitleUnderline />
                        </CardTitle>
                    </CardTitleBox>
                </CardMediaWrapper>
            </CardWrapper>
        </CardLinkWrapper>
    )
}

const RecipesWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    position: relative;
    width: 100%;
`

const LatestRecipes = ({ recipes }) => {
    return (
        <div style={{ marginTop: "50px" }}>
            <BigHeader>
                <UnstyledGatsbyLink to="/recipes">
                    OUR RECIPES
                </UnstyledGatsbyLink>
            </BigHeader>
            <RecipesWrapper>
                {recipes.map((recipe, index) => {
                    return <RecipeCard recipe={recipe} i={index} key={index} />
                })}
            </RecipesWrapper>
        </div>
    )
}

LatestRecipes.propTypes = {
    recipes: PropTypes.array.isRequired,
}

export default LatestRecipes
