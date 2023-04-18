import React from "react"
import { useScrollTrigger, Fab, Zoom } from "@mui/material"
import { KeyboardArrowUp } from "styled-icons/material"
import styled from "styled-components"

import { brandColors } from "../../styles/brandColors"

const RootDiv = styled.div`
    position: fixed;
    bottom: 16px;
    right: 15px;
    z-index: 10;
`

const ScrollButton = styled(Fab)`
    background-color: ${brandColors.green};
    color: white;
    &:hover {
        backgorund-color: ${brandColors.darkgreen};
    }
`

function handleClick() {
    window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
    })
}

function ScrollTop(props) {
    const { children, window } = props

    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100,
    })

    return (
        <Zoom in={trigger}>
            <RootDiv onClick={handleClick} role="presentation">
                {children}
            </RootDiv>
        </Zoom>
    )
}

export default function BackToTop(props) {
    return (
        <React.Fragment>
            <ScrollTop {...props}>
                <ScrollButton size="small" aria-label="scroll back to top">
                    <KeyboardArrowUp />
                </ScrollButton>
            </ScrollTop>
        </React.Fragment>
    )
}
