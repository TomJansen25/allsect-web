import React, { useRef } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import styled, { createGlobalStyle } from "styled-components"
// import firebaseApp, { FirebaseContext } from '../firebase';
import { StyledEngineProvider, ThemeProvider, createTheme } from '@mui/material/styles';

import { Link } from 'gatsby'
import { PrismicProvider } from '@prismicio/react'

import Navbar from "../navbar/navbar"
// import CookieConsentBar from "./cookieConsent"
import Footer from "./footer"
import BackToTop from "./scrollTop"

import { brandColors } from "../../styles/brandColors";
import variables from "../../styles/variables"

const GlobalStyle = createGlobalStyle`
    html {
	    height: 100%;
	    width: 100vw;
	    overflow-x: hidden;
	    overflow-y: auto;
	    margin: 0px;
    }

    body {
        color: #353535;
        line-height: 1.5;
        font-family: "Raleway", serif !important;
        margin: 0px;
        *,
        *::before,
        *::after {
            box-sizing: border-box;
        }
    }

    a {
        text-decoration: none;
    }

    h1, h2, h3, h4, h5, h6 {
        font-weight: 500;
        margin-top: 0px;
        margin-bottom: 0.5rem;
    }

    h1 {
        font-size: 2.2em;
    }

    h2 {
        font-size: 2em;
    }

    h3 {
        font-size: 1.8em;
    }

    img {
        transition: opacity ease-in-out 0.35s;
        opacity: 1;
    }
`

const theme = createTheme({
    palette: {
        green: {
            main: brandColors.green,
            darker: brandColors.darkgreen,
        },
        blue: {
            main: brandColors.waterblue,
            darker: brandColors.darkblue,
        },
        brown: {
            main: brandColors.brown,
            darker: brandColors.darkbrown,
        },
    },
});

const MainContentDiv = styled.div`
    ol,
    ul {
        max-width: 100%;
    }

    @media (max-width: ${variables.maxWidthSM}) {
        margin: 50px auto 0;
        width: 90%;
        font-size: 14px;
    }

    @media (min-width: ${variables.minWidthSM}) {
        margin: 75px auto 0;
        width: 70%;
        font-size: 17px;
    }
`

const Layout = ({ children }) => {

    const target = useRef()

    const data = useStaticQuery(graphql`
        query SiteTitleQuery {
            site {
                siteMetadata {
                    title
                }
            }
        }
    `)

    return (
        <PrismicProvider
            internalLinkComponent={({ href, ...props }) => (
                <Link to={href} {...props} />
            )}
        >
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={theme}>
                    <GlobalStyle />
                    <Navbar target={target} />
                    <MainContentDiv {...{ ref: target }}>
                        <main>{children}</main>
                    </MainContentDiv>
                    <Footer siteTitle={data.site.siteMetadata.title} />
                    <BackToTop />
                </ThemeProvider>
            </StyledEngineProvider>
        </PrismicProvider>
    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Layout
