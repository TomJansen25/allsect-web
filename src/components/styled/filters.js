import styled from "styled-components"
import Autocomplete from "@material-ui/lab/Autocomplete"
import { makeStyles } from "@material-ui/styles"
import IconButton from "@material-ui/core/IconButton"
import { brandColors } from "../../styles/brandColors"
import variables from "../../styles/variables"

export const FilterHeader = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    width: 100%;
    max-width: ${(props) => (props.view === "grid" ? "unset" : "900px")};
    padding: 0px 5px;
    margin: 5px auto 10px;

    @media (max-width: ${variables.maxWidthSM}) {
        margin-top: 0;
    }
`

const classes = makeStyles({
    option: {
        "@media (max-width: 960px)": {
            fontSize: "0.85rem",
            padding: "0px 10px",
            lineHeight: "1.2rem",
            minHeight: 0,
            margin: "0px",
        },
    },
})

export const AutocompleteWrapper = styled(Autocomplete).attrs((props) => ({
    size: "small",
    classes: { option: classes().option },
}))`
    min-width: 200px;
    max-width: 300px;
    margin: 0px 10px;

    .MuiAutocomplete-endAdornment {
        top: unset;
    }
`

export const ViewButton = styled(IconButton)`
    --grey: ${brandColors.grey};
    padding: ${(props) => (props.active ? "3px" : "4.5px")};
    height: fit-content;
    border: ${(props) => (props.active ? "1.5px solid var(--grey)" : "none")};
    border-radius: 0px;

    &:first-of-type {
        margin: auto 5px 4px 0px;
    }
    &:last-of-type {
        margin: auto 0px 4px 5px;
    }
`

export const FilterCategoryDiv = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`

export const InputDiv = styled(FilterCategoryDiv)`
    margin-right: auto;

    @media (max-width: ${variables.maxWidthSM}) {
        flex-direction: column;

        .MuiAutocomplete-root * {
            font-size: 0.8rem;
        }

        ${AutocompleteWrapper} {
            margin: 0;

            .MuiFormControl-marginDense {
                margin: 4px 0px 0px 0px;
            }
        }
    }
`
