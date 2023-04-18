import React from "react"
import { PrismicRichText } from "@prismicio/react"
import { linkResolver } from "../../utils/linkResolver"
import { Link } from "gatsby"
/* eslint-disable no-unused-vars */

const GatsbyLink = (type, element, content, children, index) => {
    if (element.data.link_type === "Document") {
        return (
            <Link to={linkResolver(element.data)} key={element.data.id}>
                {content}
            </Link>
        )
    }
    return null
}

const Text = ({ slice }) => (
    <div>
        <PrismicRichText field={slice.primary.text.richText} />
    </div>
)

export default Text
