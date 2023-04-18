import styled from "styled-components"
import { Paper, Button, InputBase } from "@mui/material"
import { FormSubmitButton } from "./form"
import { brandColors } from "../../styles/brandColors"

export const CommentFormPaper = styled(Paper)`
    margin: 5px 5px 25px;
    padding: 10px 20px;
    max-height: ${(props) => (props.show ? "400px" : "0px")};
    transition: all 3s ease-in-out;
    display: ${(props) => (props.show ? "flex" : "none")};

    > div {
        width: 100%;
        color: ${brandColors.darkgrey};
        cursor: text;
    }
`

export const CommentFormWrapper = styled.form`
    width: 100%;
    margin: 8px auto;
    display: flex;
    flex-direction: column;
    transition: all 3s linear;

    > div {
        display: flex;
        flex-direction: row;
    }
`

export const CommentFormInput = styled(InputBase)`
    font-family: "Raleway", serif;
    margin-bottom: 5px;

    > input {
        color: ${brandColors.darkgrey};
    }
`

export const CommentFormCancelButton = styled(Button)`
    margin-right: 8px;
    margin-left: auto;
`

export const CommentFormSubmitButton = styled(FormSubmitButton)`
    margin: inherit;
    min-width: unset;
    padding: 0 15px;
    width: min-content;
    line-height: 1.25;
`

export const CommentListItem = styled.div`
    > div {
        display: flex;
        margin-bottom: 5px;
    }

    border-bottom: 1px solid ${brandColors.grey};
    margin: 0px 5px 10px;
    padding: 5px 0;
`

export const CommentListItemAvatar = styled.div`
    display: flex;
    margin-right: 10px;

    > svg {
        margin: auto;
        color: ${brandColors.grey};
    }
`

export const CommentListItemUser = styled.div`
    display: flex;
    flex-direction: column;

    > strong {
        font-size: 0.9rem;
        text-transform: uppercase;
    }

    > span {
        font-size: 0.8rem;
    }
`
