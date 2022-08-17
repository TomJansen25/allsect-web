import React from "react"
import { Algolia } from "styled-icons/fa-brands/"
import styled from "styled-components"

const PoweredByWrapper = styled.span`
    font-size: 0.75em;
    text-align: end;
    padding: 0px;
`

const PoweredByLink = styled.a`
    text-decoration: none;
`

export const PoweredBy = () => {
    return (
        <PoweredByWrapper>
            Powered by{` `}
            <PoweredByLink href="https://algolia.com">
                <Algolia size="1em" /> Algolia
            </PoweredByLink>
        </PoweredByWrapper>
    )
}
