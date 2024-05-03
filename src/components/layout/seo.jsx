import React from "react"
import PropTypes from "prop-types"
import { useSiteMetadata } from "../../hooks/useSiteMetadata"
import { linkResolver } from "../../utils/linkResolver";

const Seo = ({
    description,
    lang,
    // meta,
    keywords,
    title,
    docMeta,
    docImage,
    structuredData,
}) => {
    const [site, logo] = useSiteMetadata()
    // const { title: defaultTitle, description: defaultDescription, image, siteUrl, twitterUsername } = useSiteMetadata()

    const {
        defaultTitle,
        defaultDescription,
        defaultUrl,
        author,
        defaultKeywords,
    } = site.siteMetadata
    const defaultImage = logo.childImageSharp.resize.src

    const metaDescription = description || defaultDescription
    const pageKeywords = [...defaultKeywords, keywords]
    const urlExt = linkResolver(docMeta)
    const canonical = defaultUrl + urlExt
    const image = docImage || `${defaultUrl}${defaultImage}`
    const pageType =
        docMeta["type"] === "post" || docMeta["type"] === "recipe"
            ? "article"
            : "website"
    const locale = lang === "de-de" ? "de_DE" : "en_US"

    return (
        <>
            <title>{title}</title>
            <meta name="title" content={title} />
            <meta name="description" content={metaDescription} />
            <meta name="keywords" content={pageKeywords} />
            <meta name="image" content={image} />
            <meta name="thumbnail" content={image} />
            <meta name="robots" content="index, follow" />
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:site" content={canonical} />
            <meta name="twitter:creator" content={author} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:image" content={image} />
            <meta name="twitter:description" content={metaDescription} />
            <meta property="og:site_name" content={defaultTitle} />
            <meta property="og:title" content={title} />
            <meta property="og:locale" content={locale} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:type" content={pageType} />
            <meta property="og:image" content={image} />
            <meta property="og:url" content={canonical} />
            <script type="application/ld+json">{structuredData}</script>
        </>
    )
}

Seo.defaultProps = {
    description: "Welcome to the world of edible insects!",
    lang: "en",
    meta: [],
    keywords: [],
    title: "Allsect",
    docMeta: { id: "", uid: "", url: "", type: "", lang: "en-au" },
}

Seo.propTypes = {
    description: PropTypes.string,
    lang: PropTypes.string,
    meta: PropTypes.arrayOf(PropTypes.object),
    keywords: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string.isRequired,
    docMeta: PropTypes.exact({
        id: PropTypes.string,
        uid: PropTypes.string,
        url: PropTypes.string,
        type: PropTypes.oneOf(["", "post", "recipe"]),
        lang: PropTypes.oneOf(["", "en-au", "de-de"]),
    }),
    structuredData: PropTypes.string,
}

export default Seo