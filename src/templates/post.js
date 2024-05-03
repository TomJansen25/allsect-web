import React from "react";
import { graphql } from "gatsby";
import { PrismicRichText } from "@prismicio/react";
import { asText } from "@prismicio/richtext";
import {
    MainImage,
    ImageCaption,
    Quote,
    Text,
    References,
} from "../components/slices";
import { Today, Schedule, FiberManualRecord } from "styled-icons/material"
import styled from "styled-components"
import { parseDate, readingTime } from "../utils/functions"
import { structuredBlogPost } from "../utils/structuredData"

import Seo from "../components/layout/seo"
// import Comments from "../components/other/comments"

import {
    ContentDiv,
    PostHeader,
    PostHeaderTitle,
    PostHeaderWrapper,
    InfoRow,
} from "../components/styled"

// import { FirebaseContext } from "../components/firebase"
import { brandColors } from "../styles/brandColors"
import variables from "../styles/variables"

export const query = graphql`
    query BlogPostAltQuery($uid: String) {
        prismicPost(uid: { eq: $uid }) {
            id
            prismicId
            uid
            lang
            type
            url
            last_publication_date(formatString: "YYYY-MM-DD")
            data {
                date
                word_count
                title {
                    richText
                }
                subtitle {
                    richText
                }
                tl_dr
                keywords_seo
                references {
                    richText
                }
                main_image {
                    alt
                    url
                    copyright
                }
                main_image_caption {
                    richText
                }
                body {
                    ... on PrismicPostDataBodyText {
                        slice_label
                        slice_type
                        primary {
                            text {
                                richText
                            }
                        }
                    }
                    ... on PrismicPostDataBodyQuote {
                        slice_label
                        slice_type
                        primary {
                            quote {
                                richText
                            }
                        }
                    }
                    ... on PrismicPostDataBodyImageWithCaption {
                        slice_label
                        slice_type
                        primary {
                            image {
                                alt
                                url
                            }
                            caption {
                                richText
                            }
                        }
                    }
                }
            }
        }
    }
`

const Tldr = styled.div`
    background-color: ${brandColors.brown};
    font-style: italic;
    font-weight: 500;
    text-align: center;
    color: white;
    padding: 10px;
    margin: 0px auto 20px auto;

    @media (max-width: ${variables.minWidthSM}) {
        font-size: 1rem;
        max-width: 90%;
    }

    @media (min-width: ${variables.minWidthSM}) {
        font-size: 1.2rem;
        max-width: 75%;
    }
`

const PostImageDiv = styled.div`
    margin-top: 10px;
    margin-bottom: 1rem;
    max-height: 500px;
`

// Sort and display the different slice options
const PostSlices = ({ slices }) => {
    return slices.map((slice, index) => {
        const res = (() => {
            switch (slice.slice_type) {
                case "text":
                    return <div key={index}>{<Text slice={slice} />}</div>

                case "quote":
                    return <div key={index}>{<Quote slice={slice} />}</div>

                case "image_with_caption":
                    return (
                        <div key={index}>{<ImageCaption slice={slice} />}</div>
                    )

                default:
                    return
            }
        })()
        return res
    })
}

// Display the title, date, and content of the Post
const PostBody = ({ blogPost }) => {
    return (
        <ContentDiv>
            <Tldr>
                <span>TL;DR: </span>
                <span>{blogPost.tl_dr}</span>
            </Tldr>
            <PostImageDiv>
                {
                    <MainImage
                        image={blogPost.main_image}
                        caption={blogPost.main_image_caption}
                    />
                }
            </PostImageDiv>
            <PostSlices slices={blogPost.body} />
            {blogPost.references.richText.length > 0 ? (
                <References references={blogPost.references} />
            ) : (
                ""
            )}
        </ContentDiv>
    )
}

const PostTemplate = ({ data }) => {
    // const firebase = useContext(FirebaseContext)
    // const target = useRef()

    if (!data) return null
    // Define the Post content returned from Prismic
    const post = data.prismicPost.data

    /**
    <Comments
        postType="blogPost"
        postId={data.prismicPost.prismicId}
    />
     */

    return (
        <>
            <PostHeaderWrapper>
                <PostHeader>
                    <PostHeaderTitle>
                        <PrismicRichText field={post.title.richText} components={{
                            heading1: ({ children }) => <span>{children}</span>,
                        }} />
                    </PostHeaderTitle>
                    <InfoRow>
                        <Today size={20} className={"first-icon"} />
                        <p className={"icon-info-row-text"}>
                            {parseDate(post.date, "long")}
                        </p>
                        <FiberManualRecord size={20} className={"icon-separator-dot"} />
                        <p className={"icon-info-row-text"}>
                            {readingTime(post.word_count) + " min read"}
                        </p>
                        <Schedule size={20} className={"last-icon"} />
                    </InfoRow>
                </PostHeader>
            </PostHeaderWrapper>
            <PostBody blogPost={post} />
        </>
    )
}

export default PostTemplate

export const Head = ({ data }) => {
    const post = data.prismicPost.data

    const meta = {
        id: data.prismicPost.id,
        uid: data.prismicPost.uid,
        type: data.prismicPost.type,
        lang: data.prismicPost.lang,
    }

    const structuredData = structuredBlogPost(data)

    return (
        <Seo
            title={asText(post.title.richText)}
            description={post.tl_dr}
            keywords={post.keywords_seo}
            docMeta={meta}
            docImage={post.main_image.url}
            structuredData={JSON.stringify(structuredData)}
        />
    )
}
