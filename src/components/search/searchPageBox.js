import React, { useState } from "react"
import TextField from "@material-ui/core/TextField"
import { navigate } from "gatsby"
import InputAdornment from "@material-ui/core/InputAdornment"
import Divider from "@material-ui/core/Divider"
import IconButton from "@material-ui/core/IconButton"
import { SearchAlt } from "styled-icons/boxicons-regular/"
import { Cancel } from "styled-icons/material-outlined/"
import styled from "styled-components"

const SearchDiv = styled.div`
    text-align: center;
    margin-top: 30px;
`

const TextFieldWrapper = styled(TextField)`
    min-width: 300px;
    width: 50%;

    .MuiInputLabel-outlined:not(.Mui-focused) {
        transform: translate(14px, 8px) scale(1);
    }
`

const IconButtonWrapper = styled(IconButton)`
    padding: 10px;
`

const DividerWrapper = styled(Divider)`
    height: 20px;
    width: 1px;
    margin: 5px;
`

export const SearchPageBox = () => {
    const [newQuery, setNewQuery] = useState("")

    const newSearch = () => {
        const searchStr = "/search?q=" + newQuery
        navigate(searchStr)
    }

    const emptySearch = () => setNewQuery("")

    return (
        <SearchDiv>
            <TextFieldWrapper
                id="update-query"
                label="New search"
                variant="outlined"
                margin="dense"
                value={newQuery}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButtonWrapper
                                aria-label="cancel"
                                onClick={emptySearch}
                            >
                                <Cancel size="1em" />
                            </IconButtonWrapper>
                            <DividerWrapper orientation="vertical" />
                            <IconButton
                                type="submit"
                                aria-label="search"
                                onClick={newSearch}
                            >
                                <SearchAlt size="1em" />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
                onChange={(event) => setNewQuery(event.target.value)}
                onKeyPress={(event) => {
                    if (event.key === "Enter") {
                        const searchStr = "/search?q=" + event.target.value
                        navigate(searchStr)
                    }
                }}
            />
        </SearchDiv>
    )
}
