import React, { useState, useEffect, useCallback } from "react"
import NewsArticleCard from "./newsArticleCard"
import { Masonry } from "@mui/lab"

const NewsMasonryGrid = ({ newsArticles }) => {
    const [latestArticleIndex, setLatestArticleIndex] = useState(12)
    const [isBottom, setIsBottom] = useState(false)
    const maxIndex = newsArticles.length

    const loadMore = useCallback(() => {
        setLatestArticleIndex(latestArticleIndex + 12)
        setIsBottom(false)
    }, [latestArticleIndex])

    function handleScroll() {
        const scrollTop =
            (document.documentElement && document.documentElement.scrollTop) ||
            document.body.scrollTop
        const scrollHeight =
            (document.documentElement &&
                document.documentElement.scrollHeight) ||
            document.body.scrollHeight
        if (scrollTop + window.innerHeight + 50 >= scrollHeight) {
            setIsBottom(true)
        }
    }

    useEffect(() => {
        if (isBottom && maxIndex >= latestArticleIndex) {
            loadMore()
        }
    }, [isBottom, loadMore, maxIndex, latestArticleIndex])

    useEffect(() => {
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    })

    return (
        <Masonry columns={4}>
            {newsArticles.slice(0, latestArticleIndex).map((newsArticle) => {
                return (
                    <div key={newsArticle.node.id}>
                        <NewsArticleCard
                            article={newsArticle.node}
                            key={newsArticle.node.id}
                            intro={true}
                        />
                    </div>
                )
            })}
        </Masonry>
    )
}

export default NewsMasonryGrid
