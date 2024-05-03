import React, { useState } from "react"
import { navigate } from "gatsby"
import { InputAdornment, TextField } from "@mui/material"
// import { makeStyles } from "@material-ui/core/styles"
import { SearchAlt } from "styled-icons/boxicons-regular/"
import styled from "styled-components"
// import { brandColors } from "../../styles/brandColors"

const SearchWrapper = styled(TextField)`
    border-radius: 10px;
    background-color: white;
    margin: auto;
    width: auto;
`

/*
const SearchIcon = styled.div`
    padding: 0px;
    height: 100%;
    color: ${brandColors.darkgrey};
    position: absolute;
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: center;
`


const useStyles = makeStyles({
    inputRoot: {
        color: brandColors.darkgrey,
    },
    inputInput: {
        padding: "10px 0px 0px 32px",
        transition: "width 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        width: "75px",
        "&:focus": {
            width: "160px",
            color: brandColors.brown,
        },
        "&::placeholder": {
            fontFamily: "Roboto",
        },
    },
})
*/



export const NavbarSearchBox = () => {
    const [query, setQuery] = useState("")

    return (
        <>
            <SearchWrapper
                hiddenLabel
                id="filled-hidden-label-small"
                // label="Search..."
                placeholder="Search…"
                variant="standard"
                size="normal"
                margin="none"
                color="green"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(event) => {
                    if (event.key === "Enter") {
                        navigate("/search/", {
                            state: { query: event.target.value },
                        })
                        setQuery("")
                    }
                }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchAlt size={20} />
                        </InputAdornment>
                    ),
                }}
            />
        </>
    )
}

/**
 * <SearchIcon>
                <SearchAlt size="1.5em" />
            </SearchIcon>
            <InputBase
                placeholder="Search…"
                onKeyPress={(event) => {
                    if (event.key === "Enter") {
                        const searchStr = "/search?q=" + event.target.value
                        navigate(searchStr, {
                            state: { query: event.target.value },
                        })
                    }
                }}
                classes={
                    {
                        root: {
                            color: brandColors.darkgrey,
                        },
                        input: {
                            padding: "10px 0px 0px 32px",
                            width: "75px"
                        },
                    }
                }
                inputProps={{
                    "aria-label": "search",
                }}
            />
 */
