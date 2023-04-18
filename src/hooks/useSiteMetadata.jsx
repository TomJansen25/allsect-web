import { graphql, useStaticQuery } from "gatsby"

export const useSiteMetadata = () => {
    const { site, logo } = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    defaultTitle: title
                    defaultDescription: description
                    author
                    image
                    url
                    defaultUrl: siteUrl
                    defaultKeywords: keywords
                }
            }
            logo: file(relativePath: { eq: "heuschrecke.jpg" }) {
                childImageSharp {
                    resize(height: 400, quality: 100) {
                        src
                    }
                }
            }
        }
    `)

    return [site, logo]
}