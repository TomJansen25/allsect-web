import styled from "styled-components";
import { Button } from "@mui/material";
import { brandColors } from "../../styles/brandColors";

/* Green Brand Color lines after big and small headers/labels */

export const SmallHeader = styled.h2`
    text-transform: uppercase;
    font-size: 1.5rem;
    font-weight: 600;
    overflow: hidden;
    margin-bottom: 1rem;

    &:after {
        content: "";
        background-color: ${brandColors.green};
        display: inline-block;
        height: 2px;
        vertical-align: middle;
        width: 100%;
        margin-right: -100%;
        margin-left: 10px;
    }
`

export const BigHeader = styled.h2`
    text-transform: uppercase;
    font-size: 2rem;
    font-weight: 700;
    overflow: hidden;
    margin-bottom: 2vh;

    &:after {
        content: "";
        background-color: ${brandColors.green};
        display: inline-block;
        height: 5px;
        vertical-align: middle;
        width: 100%;
        margin-right: -100%;
        margin-left: 10px;
    }
`

export const HeaderButton = styled(Button)`
    color: inherit;
    font-size: inherit;
    font-weight: inherit;
    font-family: inherit;
    &:hover {
        color: ${brandColors.darkGreen};
    }
`
