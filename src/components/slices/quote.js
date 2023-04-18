import React from "react"
import { PrismicRichText } from "@prismicio/react"
import styled from "styled-components"
import { brandColors } from "../../styles/brandColors"

const QuoteDiv = styled.div`
    display: flex;
    font-style: italic;
    font-size: 20px;
    color: ${brandColors.grey};
    padding: 10px 25px;
`

const Quote = ({ slice }) => {
    return (
        <QuoteDiv>
            <blockquote style={{ margin: "auto" }}>
                <PrismicRichText field={slice.primary.quote.richText} />
            </blockquote>
        </QuoteDiv>
    )
}

export default Quote
