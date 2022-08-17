import React from "react"
import { RichText } from "prismic-reactjs"
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
        <RichText
            render={slice.primary.text.richText || []}
            serializeHyperlink={GatsbyLink}
        />
    </div>
)

export default Text
