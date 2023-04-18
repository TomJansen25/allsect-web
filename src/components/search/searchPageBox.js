import React from "react";
import { useSearchBox } from "react-instantsearch-hooks-web";
import { TextField, InputAdornment, Divider, IconButton } from "@mui/material";
import { navigate } from "gatsby";
import { SearchAlt } from "styled-icons/boxicons-regular/";
import { Cancel } from "styled-icons/material-outlined/";
import styled from "styled-components";

const SearchDiv = styled.div`
    text-align: center;
    margin-top: 30px;
`

const TextFieldWrapper = styled(TextField)`
    min-width: 300px;
    width: 50%;
`

const IconButtonWrapper = styled(IconButton)`
    padding: 10px;
`

const DividerWrapper = styled(Divider)`
    height: 20px;
    width: 1px;
    margin: 5px;
`

const SearchPageBox = (props) => {
    const { refine, clear } = useSearchBox(props);

    const update = (event) => {
        event.preventDefault()
        navigate("/search/", {
            state: { query: event.target.value },
        })
    }

    return (
        <SearchDiv>
            <TextFieldWrapper
                id="update-query"
                label="New search"
                variant="outlined"
                margin="dense"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButtonWrapper
                                aria-label="cancel"
                                onClick={clear}
                            >
                                <Cancel size="1em" />
                            </IconButtonWrapper>
                            <DividerWrapper orientation="vertical" />
                            <IconButton
                                type="submit"
                                aria-label="search"
                                onClick={(event) => { update(event) }}
                            >
                                <SearchAlt size="1em" />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
                onChange={(event) => {
                    event.preventDefault()
                    refine(event.target.value)
                }}
            />
        </SearchDiv>
    )
}

export default SearchPageBox
