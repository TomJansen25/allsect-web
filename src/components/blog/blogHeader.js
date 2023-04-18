import React, { useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { LayoutGrid } from "styled-icons/remix-fill"
import { List } from "styled-icons/foundation"

import {
    FilterHeader,
    FilterCategoryDiv,
    InputDiv,
    AutocompleteWrapper,
    ViewButton,
} from "../styled"
import { brandColors } from "../../styles/brandColors"

const tags = [
    { label: "Informative", value: "Informative" },
    { label: "Tried & Tested", value: "Tried & Tested" },
    { label: "Fun Facts", value: "Fun facts" },
    { label: "In the Spotlight", value: "Spotlight" },
    { label: "On the Menu", value: "On the Menu" },
]

const BlogHeader = ({ tagStateSetter, viewStateSetter }) => {
    const [tag, setTag] = useState("")
    const [view, setView] = useState("grid")

    useEffect(() => {
        tagStateSetter(tag)
    }, [tagStateSetter, tag])

    useEffect(() => {
        viewStateSetter(view)
    }, [viewStateSetter, view])

    const updateTag = (tag) => {
        if (tag) {
            setTag(tag.value)
        } else {
            setTag("")
        }
    }

    return (
        <FilterHeader view={view}>
            <InputDiv>
                <AutocompleteWrapper>
                    <Autocomplete
                        size="small"
                        options={tags}
                        getOptionLabel={(option) => option.label}
                        id="tag"
                        onChange={(event, value) => updateTag(value)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Post type"
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

export default BlogHeader
