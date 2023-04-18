import React from "react"
import { StaticImage } from "gatsby-plugin-image"
import styled from "styled-components"
import variables from "../../styles/variables"

const BannerText = styled.h1`
    position: absolute;
    text-align: left;
    width: 30%;
    max-width: 330px;
    color: black;
    font-weight: 500;
    margin-left: 15vw;
`

const Banner = styled.div`
    position: relative;
    overflow: hidden;
    top: -25px;
    width: 100vw;
    display: flex;
    // max-height: 50vh;
    align-items: center;

    @media (min-width: ${variables.minWidthSM}) {
        left: -15vw;
        padding-left: 0vw;
        padding-right: 0vw;
        height: 400px;

        ${BannerText} {
            font-size: 30px;
        }
    }

    @media (max-width: ${variables.maxWidthSM}) {
        left: -5vw;
        min-height: 200px;

        ${BannerText} {
            font-size: 15px;
        }
    }
`

const IndexBanner = () => {
    return (
        <Banner>
            <StaticImage
                src="../../images/heuschrecke.jpg"
                alt="Grasshopper on display - banner image"
                placeholder="blurred"
                layout="fullWidth"
                objectPosition="60% center"
                style={{ position: "unset" }}
                imgStyle={{ height: "auto", minHeight: 200, maxHeight: 400 }}
            />
            <BannerText>Welcome to the world of edible insects</BannerText>
        </Banner>
    )
}

export default IndexBanner
