import styled from "styled-components"
import { Link } from "gatsby"
import { Divider } from "@mui/material";
import { brandColors } from "../../styles/brandColors"
import variables from "../../styles/variables"
import { RegularButton } from "./buttons"

export const ContentDiv = styled.div`
    max-width: 700px;
    margin: auto;
    overflow-x: hidden;
`

export const UnstyledGatsbyLink = styled(Link)`
    color: initial;
    text-decoration: none;
    &:hover {
        text-decoration: none;
        color: initial;
    }
`

export const PostHeaderWrapper = styled.div`
    position: relative;
    overflow-x: hidden;
    display: flex;
`

export const PostHeader = styled.div`
    margin: auto auto 20px auto;
    max-width: 700px;
    width: 100%;
    display: flex;
    flex-direction: column;
`

export const PostHeaderTitle = styled.h1`
    color: ${brandColors.darkgrey};
    font-family: "Roboto Condensed", sans-serif;
    font-size: 44px;
    font-weight: 700;
    border-bottom: solid 2px ${brandColors.darkgrey};
    margin-bottom: 10px;

    @media (max-width: ${variables.maxWidthSM}) {
        font-size: 24px;
    }
`

export const InfoRow = styled.div`
    display: flex;
    flex-direction: row;
    color: ${brandColors.darkgrey};

    .first-icon {
        margin: auto 5px auto 0px;
        font-size: 1.1rem;
    }

    .icon-separator-dot {
        margin: auto 5px;
        font-size: 0.4rem;
    }

    .last-icon {
        margin: auto auto auto 5px;
        font-size: 1.1rem;
    }

    .icon-info-row-text {
        margin: auto 0px;
        font-size: 0.9rem;
        color: ${brandColors.darkgrey};
    }
`

export const VerticalDividerWrapper = styled(Divider)`
    height: 15px;
    width: 1px;
    margin: auto 5px;
`

export const PaginationNumber = styled(RegularButton)`
    min-width: 0px;
    padding: 6px 16px;
    transition: background-color 0.3s;
    cursor: ${(props) => (props.active ? "default" : "pointer")};
    margin: auto 0px;

    color: ${(props) => (props.active ? "white" : brandColors.darkgrey)};
    background-color: ${(props) =>
        props.active ? brandColors.darkgrey : "white"};

    &:hover {
        color: ${(props) => (props.active ? "white" : brandColors.orange)};
        background-color: ${(props) =>
        props.active ? brandColors.darkgrey : brandColors.lightgrey};
    }
`
