import React from "react"
import { graphql } from "gatsby"
import { Text, ImageCaption } from "../components/slices"
import styled from "styled-components";

import variables from "../styles/variables"
import SEO from "../components/layout/seo"

const AboutSlices = styled.div`
    display: flex;
    flex-wrap: wrap;

    @media (min-width: ${variables.muiLGwidth}) {
        .about-text:nth-of-type(1) {
            width: 45%;
            margin-right: 5%;
        }

        .about-image {
            display: flex;

            div {
                margin: auto;
            }

            &:nth-of-type(2) {
                width: 50%;
            }

            .post-image .block-img img {
                width: 100%;
                margin: 0;
            }
        }
    }
`

export const query = graphql`
    query AboutQuery {
        prismicAbout(uid: { eq: "about-us" }) {
            data {
                body {
                    ... on PrismicAboutDataBodyText {
                        id
                        slice_type
                        slice_label
                        primary {
                            text {
                                richText
                            }
                        }
                    }
                    ... on PrismicAboutDataBodyImage {
                        id
                        primary {
                            image {
                                alt
                                url
                            }
                        }
                        slice_label
                        slice_type
                    }
                }
                introduction {
                    richText
                }
                title {
                    richText
                }
            }
        }
    }
`

// Sort and display the different slice options
const AboutBody = ({ slices }) => {
    return slices.map((slice, index) => {
        const res = (() => {
            switch (slice.slice_type) {
                case "text":
                    return (
                        <div key={index} className="about-text">
                            {<Text slice={slice} />}
                        </div>
                    )

                case "image":
                    return (
                        <div key={index} className="about-image">
                            {<ImageCaption slice={slice} />}
                        </div>
                    )

                default:
                    return
            }
        })()
        return res
    })
}

const AboutPage = ({ data }) => {
    if (!data) return null
    const about = data.prismicAbout.data

    return (
        <section>
            <AboutSlices>
                <AboutBody slices={about.body} />
            </AboutSlices>
        </section>
    )
}

export default AboutPage

export const Head = () => (
    <SEO
        title="About"
        description="Get to know more about who and what are behind Allsect."
    />
)