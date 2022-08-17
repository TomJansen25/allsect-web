import React from "react"
import { navigate } from "gatsby"
import InputBase from "@material-ui/core/InputBase"
import { makeStyles } from "@material-ui/core/styles"
import { SearchAlt } from "styled-icons/boxicons-regular/"
import styled from "styled-components"
import { brandColors } from "../../styles/brandColors"

const SearchWrapper = styled.div`
    padding-left: 10px;
    position: relative;
    border-radius: 5px;
    background-color: white;
    margin-left: 0px;
    width: auto;
    &:hover {
        background-color: ${brandColors.lightgrey};
    }
    &:focus {
        background-color: ${brandColors.lightgrey};
        color: ${brandColors.brown};
    }
`

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

export const NavbarSearchBox = () => {
    const classes = useStyles()
    return (
        <SearchWrapper className="search-div">
            <SearchIcon>
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
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                inputProps={{
                    "aria-label": "search",
                }}
            />
        </SearchWrapper>
    )
}
