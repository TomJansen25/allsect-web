import React, { useState } from "react";
import { Link } from "gatsby";
import { IconButton, Toolbar, SwipeableDrawer } from "@mui/material";
import { Menu, MenuOpen } from "styled-icons/material";
import { StaticImage } from "gatsby-plugin-image";
import styled from "styled-components";
import { NavbarSearchBox } from "../search/navbarSearchBox"
import ReadingProgress from "./readingProgress";
import { UnstyledGatsbyLink, RegularButton } from "../styled";

import { brandColors } from "../../styles/brandColors";
import variables from "../../styles/variables";

const AppbarWrapper = styled.div`
    background-color: white;
    border-bottom-color: ${brandColors.lightgrey};
    border-bottom-style: solid;
    border-bottom-width: 3px;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
        0px 4px 5px 0px rgba(0, 0, 0, 0.14),
        0px 1px 10px 0px rgba(0, 0, 0, 0.12);

    @media (max-width: ${variables.maxWidthSM}) {
        padding-left: 5vw;
        padding-right: 5vw;
    }

    @media (min-width: ${variables.minWidthSM}) {
        padding-left: 10vw;
        padding-right: 10vw;
    }
`

const ToolbarWrapper = styled.div`
    min-height: 0px;
    height: 56px;
    display: flex;
    position: relative;
    align-items: center;
`
/*
const NavbarLogo = styled(Img)`
    position: absolute !important;
    top: -7px;
    z-index: 2;
`
*/

const NavbarButton = styled(RegularButton)`
    font-weight: 700;

    &:hover {
        color: ${brandColors.darkgrey};
        text-decoration: underline;
        text-underline-position: under;
        text-decoration-color: ${brandColors.brown};
        text-decoration-thickness: 2.5px;
    }

    @media (min-width: 1450px) {
        margin-right: 15px;
        letter-spacing: 0.15rem;
    }

    @media (max-width: 1450px) {
        margin-right: 8px;
        letter-spacing: 0.1rem;
    }
`

const NavbarButtons = styled.div`
    display: flex;
    @media (max-width: 1450px) {
        display: none;
    }
`

const NavbarToggle = styled(IconButton)`
    @media (min-width: 1450px) {
        display: none;
    }

    border: none;

    svg {
        color: ${brandColors.darkgreen};
        width: 32px;
        height: 32px;
    }
`

const SwipeableDrawerWrapper = styled(SwipeableDrawer)`
    flex-shrink: 0;

    ${NavbarButton} {
        width: min-content;
        margin: auto;
    }

    .search-div {
        width: 200px;
        margin: auto auto 25px auto;
    }
`

const NavBar = ({ target }) => {
    const [open, setOpen] = useState(false)

    const toggleDrawer = (open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return
        }

        setOpen(open)
    }

    return (
        <AppbarWrapper>
            <ReadingProgress target={target} />
            <ToolbarWrapper>
                <UnstyledGatsbyLink
                    to="/"
                    style={{ flexGrow: 1 }}
                    onClick={toggleDrawer(false)}
                >
                    <StaticImage
                        src="../../images/allsect-logo-black.png"
                        alt="Allsect Logo"
                        placeholder="blurred"
                        layout="fixed"
                        height={88}
                        style={{ top: "-7px", position: "absolute", zIndex: 2 }}
                    />
                </UnstyledGatsbyLink>
                <NavbarButtons>
                    <NavbarButton component={Link} to="/blog">
                        Blog
                    </NavbarButton>
                    <NavbarButton component={Link} to="/recipes">
                        Recipes
                    </NavbarButton>
                    <NavbarButton component={Link} to="/products">
                        Products
                    </NavbarButton>
                    <NavbarButton component={Link} to="/news">
                        News
                    </NavbarButton>
                    <NavbarButton component={Link} to="/about">
                        About
                    </NavbarButton>
                    <NavbarButton component={Link} to="/contact">
                        Contact
                    </NavbarButton>
                    <NavbarSearchBox />
                </NavbarButtons>
                <NavbarToggle aria-controls="nav" onClick={toggleDrawer(!open)}>
                    {open ? <MenuOpen size={15} /> : <Menu size={15} />}
                </NavbarToggle>
                <SwipeableDrawerWrapper
                    anchor="top"
                    open={open}
                    onClose={toggleDrawer(false)}
                    onOpen={toggleDrawer(true)}
                >
                    <Toolbar style={{ marginBottom: 15 }} />
                    <NavbarButton
                        component={Link}
                        to="/blog"
                        onClick={toggleDrawer(false)}
                        onKeyDown={toggleDrawer(false)}
                    >
                        Blog
                    </NavbarButton>
                    <NavbarButton
                        component={Link}
                        to="/recipes"
                        onClick={toggleDrawer(false)}
                        onKeyDown={toggleDrawer(false)}
                    >
                        Recipes
                    </NavbarButton>
                    <NavbarButton
                        component={Link}
                        to="/news"
                        onClick={toggleDrawer(false)}
                        onKeyDown={toggleDrawer(false)}
                    >
                        News
                    </NavbarButton>
                    <NavbarButton
                        component={Link}
                        to="/products"
                        onClick={toggleDrawer(false)}
                        onKeyDown={toggleDrawer(false)}
                    >
                        Products
                    </NavbarButton>
                    <NavbarButton
                        component={Link}
                        to="/about"
                        onClick={toggleDrawer(false)}
                        onKeyDown={toggleDrawer(false)}
                    >
                        About
                    </NavbarButton>
                    <NavbarButton
                        component={Link}
                        to="/contact"
                        onClick={toggleDrawer(false)}
                        onKeyDown={toggleDrawer(false)}
                    >
                        Contact
                    </NavbarButton>
                    <div className="search-div">
                        <NavbarSearchBox />
                    </div>
                </SwipeableDrawerWrapper>
            </ToolbarWrapper>
        </AppbarWrapper>
    )
}

export default NavBar
