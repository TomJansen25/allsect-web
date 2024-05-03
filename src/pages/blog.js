import React, { useEffect, useCallback, useState } from "react"
import { graphql } from "gatsby"
import { ArrowLeftCircle, ArrowRightCircle } from "styled-icons/bootstrap"

import Seo from "../components/layout/seo"
import BlogHeader from "../components/blog/blogHeader"
import BlogGrid from "../components/blog/blogGrid"

import {
    ReadMoreWrapper,
    VerticalDividerWrapper,
    RegularButton,
    PaginationNumber,
} from "../components/styled"

// Query for the Blog Home content in Prismic
export const query = graphql`
    query BlogPosts($tag: String) {
        allPrismicPost(
            sort: { data: {date : DESC } }
            filter: { lang: { eq: "en-au" }, data: { tags: { eq: $tag } } }
        ) {
            pageInfo {
                hasNextPage
                hasPreviousPage
                totalCount
                perPage
            }
            nodes {
                url
                prismicId
                data {
                    title {
                        richText
                    }
                    subtitle {
                        richText
                    }
                    date
                    tags
                    word_count
                    main_image {
                        alt
                        url
                        thumbnails {
                            thumbnail {
                                alt
                                url
                            }
                        }
                    }
                }
            }
        }
    }
`

const BlogPage = ({ data }) => {
    const [page, setPage] = useState(1)
    const [posts, setPosts] = useState(data.allPrismicPost.nodes)
    // const [perPage, setPerPage] = useState(10)
    const perPage = 10
    const [pageCount, setPageCount] = useState(
        Math.ceil(posts.length / perPage)
    )
    const [pages, setPages] = useState(
        Array.from({ length: pageCount }, (_, i) => i + 1)
    )
    const [pagePosts, setPagePosts] = useState({ start: 0, end: perPage })
    const [tagState, setTagState] = useState("")
    const [viewState, setViewState] = useState("")

    const wrapperSetTagState = useCallback(
        (val) => {
            setTagState(val)
        },
        [setTagState]
    )

    const wrapperSetViewState = useCallback(
        (val) => {
            setViewState(val)
        },
        [setViewState]
    )

    const filterBlogPosts = useCallback(
        (post) => {
            if (tagState !== "") {
                return post.data.tags === tagState
            } else {
                return post
            }
        },
        [tagState]
    )

    useEffect(() => {
        const newPosts = data.allPrismicPost.nodes.filter(filterBlogPosts)
        setPosts(newPosts)
        setPage(1)
        const pageCount = Math.ceil(newPosts.length / perPage)
        setPageCount(pageCount)
        setPages(Array.from({ length: pageCount }, (_, i) => i + 1))
    }, [
        tagState,
        viewState,
        data.allPrismicPost.nodes,
        filterBlogPosts,
        perPage,
    ])

    useEffect(() => {
        window.scrollTo(0, 0)
        setPagePosts({
            start: page === 1 ? 0 : (page - 1) * perPage,
            end: (page - 1) * perPage + perPage,
        })
    }, [page, perPage])

    const onPreviousClick = () => setPage(page - 1)
    const onNextClick = () => setPage(page + 1)
    const onPageClick = (p) => setPage(p)

    return (
        <section>
            <BlogHeader
                tagState={tagState}
                tagStateSetter={wrapperSetTagState}
                viewState={viewState}
                viewStateSetter={wrapperSetViewState}
            />

            <BlogGrid
                blogPosts={posts.slice(pagePosts.start, pagePosts.end)}
                view={viewState}
            />

            <ReadMoreWrapper style={{ display: "flex" }}>
                <RegularButton
                    disabled={page === 1}
                    onClick={onPreviousClick}
                    startIcon={<ArrowLeftCircle size={20} />}
                    style={{ margin: "auto 2px auto auto" }}
                >
                    Newer posts
                </RegularButton>
                <VerticalDividerWrapper orientation="vertical" />
                {pages.map((pg, index) => (
                    <div key={index} style={{ display: "flex" }}>
                        <PaginationNumber
                            onClick={() => onPageClick(pg)}
                            active={pg === page ? 1 : 0}
                        >
                            {pg}
                        </PaginationNumber>
                        <VerticalDividerWrapper orientation="vertical" />
                    </div>
                ))}
                <RegularButton
                    disabled={page === pageCount}
                    onClick={onNextClick}
                    endIcon={<ArrowRightCircle size={20} />}
                    style={{ margin: "auto auto auto 2px" }}
                >
                    Older posts
                </RegularButton>
            </ReadMoreWrapper>
        </section>
    )
}

export default BlogPage

export const Head = () => (
    <Seo
        title="Edible Insect and Entomophagy Blog"
        description="Fun facts, interesting information about entomophagy and edible insects, product tests and reviews, and the latest and coolest brands in the industry can be found here!"
    />
)