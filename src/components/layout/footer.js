import React from "react"
import { Grid } from "@mui/material"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import { StaticImage } from "gatsby-plugin-image"
import styled from "styled-components"

import { brandColors } from "../../styles/brandColors"
import variables from "../../styles/variables"
import { RegularButton } from "../styled"

// Material icon imports
import { Facebook, Instagram, Linkedin } from "styled-icons/fa-brands"
import { Mail } from "styled-icons/entypo"
import { HomeWork, RateReview, Store, BugReport, LiveTv } from "styled-icons/material-twotone"

const FooterWrapper = styled.footer`
    padding-left: 10vw;
    padding-right: 10vw;
    margin-top: 25px;
    border-top-style: solid;
    border-top-width: 2px;
    border-top-color: ${brandColors.lightgrey};

    @media (max-width: ${variables.muiMDwidth}) {
        padding: 0;
    }
`

const FooterGridItem = styled(Grid)`
    display: flex;
    flex-direction: column;
    padding: 20px;
`

const FooterText = styled.p`
    font-size: 1rem;
    padding: 5px 0;
    margin-bottom: 0;
`

const FooterLogoGridItem = styled(FooterGridItem)`
    @media (max-width: ${variables.muiMDwidth}) {
        flex-direction: row;
        justify-content: center;
        padding-bottom: 0;

        ${FooterText} {
            margin-top: auto;
            margin-bottom: 10px;
        }
    }

    @media (max-width: ${variables.maxWidthSM}) {
        ${FooterText} {
            font-size: 0.75rem;
            margin-bottom: 14px;
        }
    }
`

const FooterButton = styled(RegularButton)`
    text-transform: none;
    font-weight: 400;
    margin-bottom: 5px;
`

const FooterTitle = styled.p`
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 5px;
`

const AllsectLogoTitle = styled(Link)`
    display: flex;
    flex-direction: row;

    .svg {
        max-height: 50px;
        width: auto;
    }
`

const Footer = ({ siteTitle }) => {
    return (
        <FooterWrapper className="footer">
            <Grid container style={{ justifyContent: "center" }}>
                <FooterLogoGridItem item sm={12} md={6}>
                    <AllsectLogoTitle to="/">
                        <StaticImage
                            src="../../images/allsect-logo-black.png"
                            alt="Allsect Logo"
                            placeholder="blurred"
                            layout="fixed"
                            height={50}
                        />
                    </AllsectLogoTitle>
                    <FooterText>
                        {"© " + siteTitle + " " + new Date().getFullYear()}
                        {". All rights reserved."}
                    </FooterText>
                </FooterLogoGridItem>
                <FooterGridItem item xs={5} sm={4} md={3}>
                    <FooterTitle>Links</FooterTitle>
                    <FooterButton
                        startIcon={<HomeWork />}
                        component={Link}
                        to="/"
                    >
                        Home
                    </FooterButton>
                    <FooterButton
                        startIcon={<RateReview />}
                        component={Link}
                        to="/blog"
                    >
                        Blog
                    </FooterButton>
                    <FooterButton
                        startIcon={<BugReport />}
                        component={Link}
                        to="/recipes"
                    >
                        Recipes
                    </FooterButton>
                    <FooterButton
                        startIcon={<Store />}
                        component={Link}
                        to="/products"
                    >
                        Products
                    </FooterButton>
                    <FooterButton
                        startIcon={<LiveTv />}
                        component={Link}
                        to="/news"
                    >
                        News
                    </FooterButton>
                </FooterGridItem>
                <FooterGridItem
                    item
                    xs={7}
                    sm={4}
                    md={3}
                    className="footer-social-links"
                >
                    <FooterTitle>Stay in touch</FooterTitle>
                    <FooterButton
                        startIcon={<Instagram />}
                        href="https://www.instagram.com/allsect_official/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        - Instagram
                    </FooterButton>
                    <FooterButton
                        startIcon={<Facebook />}
                        href="https://www.facebook.com/allsectofficial/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        - Facebook
                    </FooterButton>
                    <FooterButton
                        startIcon={<Linkedin />}
                        href="https://www.linkedin.com/company/allsect/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        - LinkedIn
                    </FooterButton>
                    <FooterButton
                        startIcon={<Mail />}
                        href="mailto:allsect.info@gmail.com"
                    >
                        - Email us!
                    </FooterButton>
                </FooterGridItem>
            </Grid>
        </FooterWrapper>
    )
}

Footer.propTypes = {
    siteTitle: PropTypes.string,
}

Footer.defaultProps = {
    siteTitle: "Allsect",
}

export default Footer
