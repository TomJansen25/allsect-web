import React, { useEffect, useCallback, useState } from "react"
import { graphql } from "gatsby"
import { ArrowLeftCircle, ArrowRightCircle } from "styled-icons/bootstrap"

import SEO from "../components/layout/seo"
import RecipeHeader from "../components/recipes/recipeHeader"
import RecipeGrid from "../components/recipes/recipeGrid"

import {
    BigHeader,
    ReadMoreWrapper,
    VerticalDividerWrapper,
    RegularButton,
    PaginationNumber,
} from "../components/styled"

// Query for the Recipe content in Prismic
export const query = graphql`
    query Recipes($recipeType: String, $insect: String) {
        allPrismicRecipe(
            sort: {data: {date: DESC}}
            filter: {
                lang: { eq: "en-au" }
                data: {
                    insect_of_choice: { eq: $insect }
                    recipe_type: { eq: $recipeType }
                }
            }
        ) {
            pageInfo {
                hasNextPage
                hasPreviousPage
                totalCount
                perPage
            }
            nodes {
                url
                prismicId
                lang
                data {
                    title {
                        richText
                    }
                    subtitle {
                        richText
                    }
                    date
                    insect_of_choice
                    prep_time
                    recipe_type
                    servings
                    main_image {
                        alt
                        url
                        copyright
                        thumbnails {
                            thumbnail {
                                alt
                                url
                            }
                        }
                    }
                    body {
                        ... on PrismicRecipeDataBodyImage {
                            id
                            slice_type
                            slice_label
                            primary {
                                image {
                                    url
                                    thumbnails {
                                        thumbnail {
                                            url
                                            alt
                                        }
                                    }
                                    alt
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`

const RecipesPage = ({ data }) => {
    const [page, setPage] = useState(1)
    const [recipes, setRecipes] = useState(data.allPrismicRecipe.nodes)
    // const [perPage, setPerPage] = useState(12)
    const perPage = 12
    const [pageCount, setPageCount] = useState(
        Math.ceil(recipes.length / perPage)
    )
    const [pages, setPages] = useState(
        Array.from({ length: pageCount }, (_, i) => i + 1)
    )
    const [pageRecipes, setPageRecipes] = useState({ start: 0, end: perPage })
    const [recipeTypeState, setRecipeTypeState] = useState("")
    const [ingredientState, setIngredientState] = useState("")
    const [viewState, setViewState] = useState("")

    const wrapperSetRecipeTypeState = useCallback(
        (val) => {
            setRecipeTypeState(val)
        },
        [setRecipeTypeState]
    )

    const wrapperSetIngredientState = useCallback(
        (val) => {
            setIngredientState(val)
        },
        [setIngredientState]
    )

    const wrapperSetViewState = useCallback(
        (val) => {
            setViewState(val)
        },
        [setViewState]
    )

    const filterRecipes = useCallback(
        (recipe) => {
            if (recipeTypeState !== "" && ingredientState !== "") {
                return (
                    recipe.data.recipe_type === recipeTypeState &&
                    recipe.data.insect_of_choice === ingredientState
                )
            } else if (recipeTypeState !== "" && ingredientState === "") {
                return recipe.data.recipe_type === recipeTypeState
            } else if (recipeTypeState === "" && ingredientState !== "") {
                return recipe.data.insect_of_choice === ingredientState
            } else {
                return recipe
            }
        },
        [recipeTypeState, ingredientState]
    )

    useEffect(() => {
        const newRecipes = data.allPrismicRecipe.nodes.filter(filterRecipes)
        setRecipes(newRecipes)
        setPage(1)
        const pageCount = Math.ceil(newRecipes.length / perPage)
        setPageCount(pageCount)
        setPages(Array.from({ length: pageCount }, (_, i) => i + 1))
    }, [
        recipeTypeState,
        ingredientState,
        viewState,
        data.allPrismicRecipe.nodes,
        filterRecipes,
        perPage,
    ])

    useEffect(() => {
        window.scrollTo(0, 0)
        setPageRecipes({
            start: page === 1 ? 0 : (page - 1) * perPage,
            end: (page - 1) * perPage + perPage,
        })
    }, [page, perPage])

    const onPreviousClick = () => setPage(page - 1)
    const onNextClick = () => setPage(page + 1)
    const onPageClick = (p) => setPage(p)

    return (
        <section>

            <BigHeader style={{ marginBottom: 0 }}>Our Recipes</BigHeader>

            <RecipeHeader
                recipeTypeState={recipeTypeState}
                recipeTypeStateSetter={wrapperSetRecipeTypeState}
                ingredientState={ingredientState}
                ingredientStateSetter={wrapperSetIngredientState}
                viewState={viewState}
                viewStateSetter={wrapperSetViewState}
            />

            <RecipeGrid
                recipes={recipes.slice(pageRecipes.start, pageRecipes.end)}
                view={viewState}
            />

            <ReadMoreWrapper style={{ display: "flex" }}>
                <RegularButton
                    disabled={page === 1}
                    onClick={onPreviousClick}
                    startIcon={<ArrowLeftCircle size={20} />}
                    style={{ margin: "auto 2px auto auto" }}
                >
                    Newer
                </RegularButton>
                <VerticalDividerWrapper orientation="vertical" />
                {pages.map((pg, index) => (
                    <div key={index} style={{ display: "flex" }}>
                        <PaginationNumber
                            onClick={() => onPageClick(pg)}
                            active={pg === page ? 1 : 0}
                        >
                            {pg}
                        </PaginationNumber>
                        <VerticalDividerWrapper orientation="vertical" />
                    </div>
                ))}
                <RegularButton
                    disabled={page === pageCount}
                    onClick={onNextClick}
                    endIcon={<ArrowRightCircle size={20} />}
                    style={{ margin: "auto auto auto 2px" }}
                >
                    Older
                </RegularButton>
            </ReadMoreWrapper>
        </section>
    )
}

export default RecipesPage

export const Head = () => (
    <SEO
        title="Edible Insect Recipes"
        description="Find the best insect recipes and inspiration to cook with grasshoppers, crickets, mealworms, buffaloworms and more right here."
        keywords={[
            "insect recipes",
            "cooking with insects",
            "cricket recipes",
            "grasshopper recipes",
        ]}
    />
)