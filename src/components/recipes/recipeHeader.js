import React, { useEffect, useState } from "react"
import { TextField, Autocomplete } from "@mui/material"
import { LayoutGrid } from "styled-icons/remix-fill"
import { List } from "styled-icons/foundation"

import {
    InputDiv,
    FilterCategoryDiv,
    FilterHeader,
    AutocompleteWrapper,
    ViewButton,
} from "../styled"

import { brandColors } from "../../styles/brandColors"

const insects = [
    { label: "Cricket", value: "Cricket" },
    { label: "Grasshopper", value: "Grasshopper" },
    { label: "Mealworm", value: "Mealworm" },
    { label: "Buffaloworm", value: "Buffaloworm" },
]

const recipeTypes = [
    { label: "Dinner", value: "Dinner" },
    { label: "Breakfast", value: "Breakfast" },
    { label: "Lunch", value: "Lunch" },
    { label: "Sweet", value: "Sweet" },
    { label: "Snack", value: "Snack" },
    { label: "Salad", value: "Salad" },
    { label: "Side Dish", value: "Side Dish" },
    { label: "Dessert", value: "Dessert" },
]

const RecipeHeader = ({
    recipeTypeStateSetter,
    ingredientStateSetter,
    viewStateSetter,
}) => {
    const [ingredient, setIngredient] = useState("")
    const [recipeType, setRecipeType] = useState("")
    const [view, setView] = useState("grid")

    useEffect(() => {
        recipeTypeStateSetter(recipeType)
    }, [recipeTypeStateSetter, recipeType])

    useEffect(() => {
        ingredientStateSetter(ingredient)
    }, [ingredientStateSetter, ingredient])

    useEffect(() => {
        viewStateSetter(view)
    }, [viewStateSetter, view])

    const updateIngredient = (ingredient) => {
        if (ingredient) {
            setIngredient(ingredient.value)
        } else {
            setIngredient("")
        }
    }

    const updateRecipeType = (recipe) => {
        if (recipe) {
            setRecipeType(recipe.value)
        } else {
            setRecipeType("")
        }
    }

    return (
        <FilterHeader view={view}>
            <InputDiv>
                <AutocompleteWrapper>
                    <Autocomplete
                        options={recipeTypes}
                        size="small"
                        getOptionLabel={(option) => option.label}
                        id="recipe-type"
                        onChange={(event, value) => updateRecipeType(value)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Meal type"
                                variant="standard"
                            />
                        )}
                    />
                </AutocompleteWrapper>
                <AutocompleteWrapper>
                    <Autocomplete
                        size="small"
                        options={insects}
                        getOptionLabel={(option) => option.label}
                        id="insect-ingredient"
                        onChange={(event, value) => updateIngredient(value)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Insect of choice"
                                variant="standard"
                            />
                        )}
                    />
                </AutocompleteWrapper>
            </InputDiv>
            <FilterCategoryDiv>
                <ViewButton
                    onClick={() => setView("list")}
                    active={view === "list" ? 1 : 0}
                >
                    <List
                        size="20"
                        title="List view"
                        fill={brandColors.darkgreen}
                    />
                </ViewButton>
                <ViewButton
                    onClick={() => setView("grid")}
                    active={view === "grid" ? 1 : 0}
                >
                    <LayoutGrid
                        size="20"
                        title="Grid view"
                        fill={brandColors.darkgreen}
                    />
                </ViewButton>
            </FilterCategoryDiv>
        </FilterHeader>
    )
}

export default RecipeHeader
