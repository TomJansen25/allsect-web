import styled from "styled-components"
import { Button, TextField } from "@mui/material"
import { AccountCircle } from "styled-icons/remix-fill"
import { brandColors } from "../../styles/brandColors.js"

export const FormPaper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 30px;

    .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
        border-color: ${brandColors.darkgreen};
    }

    .MuiFormLabel-root.Mui-focused {
        color: ${brandColors.darkgreen};
    }

    .MuiAlert-filledSuccess {
        background-color: ${brandColors.darkgreen};
    }
`

export const FormWrapper = styled.form`
    display: grid;
    max-width: 500px;
    width: 100%;
    margin: 8px auto 0px;
`

export const AccountFormTextField = styled(TextField)`
    margin: 10px auto;
    width: 100%;
    max-width: 400px;
`

export const AccountFormAvatar = styled(AccountCircle)`
    margin: 8px;
    color: ${brandColors.darkgreen};
`

export const ContactFormWrapper = styled(FormWrapper)`
    max-width: 700px;
`

export const FormSubmitButton = styled(Button)`
    margin: 16px auto;
    background-color: ${brandColors.green};
    color: white;
    width: 50%;
    min-width: 200px;

    &:hover {
        background-color: ${brandColors.darkgreen};
        color: white;
    }
`

export const ErrorMessage = styled.span`
    color: red;
    font-size: 0.75em;
`
