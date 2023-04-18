import styled from "styled-components"
import { Avatar, Card, CardContent, CardMedia, Paper } from "@mui/material"
import { brandColors } from "../../styles/brandColors"
import variables from "../../styles/variables"

export const CardShadow = styled.div`
    background-color: #fff;
    box-shadow: 0 2px 25px 2px rgba(0, 0, 0, 1), 0 2px 50px 2px rgba(0, 0, 0, 1),
        0 0 100px 3px rgba(0, 0, 0, 0.25);
    height: 1px;
    margin: -1px auto 0;
    width: 80%;
    z-index: -1;
`

export const CardItem = styled(Paper)`
    width: 95%;

    @media (min-width: ${variables.muiSMwidth}) {
        max-width: 900px;
    }

    @media (max-width: ${variables.muiSMwidth}) {
        h2 {
            font-size: 1.1rem;
        }
    }

    &.left {
        margin: 0px auto 50px auto;
    }

    &.right {
        margin: 0px auto 50px auto;
    }
`

export const GeneralCard = styled.div`
    padding: 20px;
    position: relative;
    box-shadow: 0 0 5px rgba(75, 75, 75, 0.07);
    border-radius: 0px;
    border: solid 1px ${brandColors.orange};
    background-color: white;
    z-index: 1;
`

export const CardContentWrapper = styled.div`
    position: relative;
    width: 55%;
    background: white;
    z-index: 3;
    top: 0;

    &.left {
        left: 0;
        padding-right: 20px;
        transition: left 0.5s ease-in-out;
    }

    &.right {
        right: 0;
        text-align: right;
        margin-left: 45%;
        padding-left: 20px;
        transition: right 0.5s ease-in-out;
    }
`

export const CardTitle = styled.h2`
    font-size: ${(props) => (props.view === "grid" ? "1.3rem" : "1.6rem")};
    margin: 15px auto;
    font-weight: 600;
    text-transform: uppercase;
`

export const CardMediaWrapper = styled.img`
    position: absolute;
    width: 45%;
    height: 100%;
    object-fit: cover;
    z-index: 2;
    top: 0;

    &.left {
        left: 0;
        padding: 20px 0px 20px 20px;
    }

    &.right {
        right: 0;
        padding: 20px 20px 20px 0px;
    }
`

export const CardRead = styled.div`
    cursor: pointer;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 6px;
    margin: 5px 0 5px;
    position: relative;
    text-transform: uppercase;

    &.left {
        text-align: left;
    }

    &.right {
        text-align: right;
    }

    &:after {
        background-color: ${brandColors.green};
        content: "";
        display: block;
        height: 1px;
        position: absolute;
        top: 50%;
        width: calc(100% - 120px);
    }

    &.left:after {
        right: 0;
    }

    .card-read-button {
        color: ${brandColors.green};
        width: 120px;
        font-size: 1rem;

        &:hover {
            color: ${brandColors.darkgreen};
        }
    }
`

export const NewsCardContent = styled(CardContent)`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 15px;
    position: relative;
    background-color: white;
    transition: all 1s ease-in-out;
`

export const NewsCardAvatar = styled(Avatar)`
    font-size: 0.85rem;
    text-align: center;
    background-color: ${brandColors.green};
    width: 50px;
    height: 50px;
    margin: 0px 10px 0px auto;
    top: 10px;
    padding: 5px;
`

export const NewsCardMedia = styled(CardMedia)`
    height: 200px;

    @media (max-width: ${variables.muiMDwidth}) {
        height: 130px;
    }
`

export const NewsCardTitle = styled.h5`
    font-weight: normal;
    font-size: 1rem;
    margin: 10px 0px;
    transition: all 0.5s ease-out 0.5s;
`

export const NewsCardSource = styled.p`
    text-transform: uppercase;
    letter-spacing: 0.04rem;
    font-size: 0.55em;
    margin-bottom: 0;
    transition: all 0.5s ease-out 0.5s;

    @media (min-width: ${variables.muiMDwidth}) {
        font-size: 0.6rem;
        transition: all 0.5s ease-out 0.5s;
        opacity: 0;
        height: 0;
        overflow: hidden;
    }
`

export const NewsCardIntro = styled.p`
    color: grey;
    font-size: 0.8rem;
    margin-bottom: 0;

    @media (min-width: ${variables.muiMDwidth}) {
        transition: all 0.5s ease-out 0.5s;
        opacity: 0;
        height: 0;
        overflow: hidden;
    }
`

export const NewsCard = styled(Card)`
    width: calc(100% - 3vh);
    margin: 0 auto 3vh;
    position: relative;

    @media (min-width: ${variables.muiMDwidth}) {
        &:hover {
            ${NewsCardContent} {
                transform: translateY(-100px);
                height: auto;
                margin-bottom: -100px;
            }

            ${NewsCardMedia} {
                opacity: 0.6;
            }

            ${NewsCardContent} > p {
                opacity: 1;
                height: auto;
            }
        }
    }
`
