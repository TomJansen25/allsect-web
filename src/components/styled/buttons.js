import styled from "styled-components"
import { Button } from "@mui/material"
import { brandColors } from "../../styles/brandColors"
import variables from "../../styles/variables"

export const ReadMoreWrapper = styled.div`
    width: 100%;
    text-align: center;
    margin-top: 10px;
`

export const BaseButton = styled(Button)`
    padding: 6px 12px;
    font-family: "Raleway", serif;
    font-weight: 600;
    font-size: 1rem;
    width: fit-content;
`

export const FilledButton = styled(BaseButton)`
    color: white;
    background-color: ${brandColors.green};

    &:hover {
        color: white;
        background-color: ${brandColors.darkgreen};
    }
`

export const RegularButton = styled(BaseButton)`
    color: ${brandColors.darkgrey};
    letter-spacing: 0.1em;

    &:hover {
        color: ${brandColors.orange};
    }

    svg {
        width: 1.2em;
        height: 1.2em;
    }

    @media (max-width: ${variables.maxWidthSM}) {
        span {
            font-size: 0.8rem;
        }
        svg {
            width: 1.1rem;
            height: 1.1rem;
        }
    }
`
