import React, { useEffect, useState, useCallback } from "react"
import BlogPostCard from "./blogCard"
import { MasonryWrapper } from "../styled"

const BlogGrid = ({ blogPosts, view }) => {
    const [latestArticleIndex, setlatestArticleIndex] = useState(6)
    const [isBottom, setIsBottom] = useState(false)
    const maxIndex = blogPosts.length

    const breakpointColumnsObj = {
        default: 2,
        1100: 1,
    }

    function handleScroll() {
        const scrollTop =
            (document.documentElement && document.documentElement.scrollTop) ||
            document.body.scrollTop
        const scrollHeight =
            (document.documentElement &&
                document.documentElement.scrollHeight) ||
            document.body.scrollHeight
        if (scrollTop + window.innerHeight + 100 >= scrollHeight) {
            setIsBottom(true)
        }
    }

    const loadMore = useCallback(() => {
        setlatestArticleIndex(latestArticleIndex + 4)
        setIsBottom(false)
    }, [latestArticleIndex])

    useEffect(() => {
        // if (isBottom && latestArticleIndex < 20) {
        if (isBottom && latestArticleIndex < maxIndex) {
            loadMore()
        }
    }, [isBottom, loadMore, latestArticleIndex, maxIndex])

    useEffect(() => {
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    })

    return (
        <div>
            {view === "grid" ? (
                <MasonryWrapper
                    breakpointCols={breakpointColumnsObj}
                    columnClassName="masonry-col"
                >
                    {blogPosts
                        .slice(0, latestArticleIndex)
                        .map((post, index) => {
                            return (
                                <BlogPostCard
                                    blogPost={post}
                                    i={index}
                                    view={view}
                                    key={index}
                                />
                            )
                        })}
                </MasonryWrapper>
            ) : (
                blogPosts.slice(0, latestArticleIndex).map((post, index) => {
                    return (
                        <BlogPostCard
                            blogPost={post}
                            i={index}
                            view={view}
                            key={index}
                        />
                    )
                })
            )}
        </div>
    )
}

export default BlogGrid
