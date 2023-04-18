import React, { useEffect, useState, useCallback } from "react"
import BlogPostCard from "./blogCard"
import { Masonry } from "@mui/lab"

const BlogGrid = ({ blogPosts, view }) => {
    const [latestArticleIndex, setlatestArticleIndex] = useState(6)
    const [isBottom, setIsBottom] = useState(false)
    const maxIndex = blogPosts.length

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
                <Masonry columns={2} spacing={2}>
                    {blogPosts
                        .slice(0, latestArticleIndex)
                        .map((post, index) => {
                            return (
                                <div key={post.data.uid}>
                                    <BlogPostCard
                                        blogPost={post}
                                        i={index}
                                        view={view}
                                        key={index}
                                    />
                                </div>
                            )
                        })}
                </Masonry>
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
