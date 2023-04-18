import React from "react"

import {
    NewsCard,
    NewsCardContent,
    NewsCardMedia,
    NewsCardAvatar,
    NewsCardTitle,
    NewsCardSource,
    NewsCardIntro,
    UnstyledGatsbyLink,
} from "../styled"

const NewsArticleCard = ({ article, intro }) => {
    let introText = ""

    if (intro) {
        if (article.description.length >= 100) {
            introText = article.description.substring(0, 100)

            if (
                !introText.endsWith(".") &&
                !introText.endsWith("?") &&
                !introText.endsWith("!") &&
                !introText.endsWith(",")
            ) {
                introText = introText + "..."
            } else if (introText.endsWith(",")) {
                introText = introText.slice(0, -1) + "..."
            }
        } else {
            introText = article.description
        }
    }

    return (
        <NewsCard variant="outlined">
            <UnstyledGatsbyLink
                as="a"
                href={article.url}
                target="_blank"
                variant="contained"
                rel="external noopener noreferrer"
                style={{ marginRight: 0 }}
            >
                <NewsCardMedia image={article.imageUrl}>
                    <NewsCardAvatar>
                        {article.publishedAt.split(".")[0]}
                    </NewsCardAvatar>
                </NewsCardMedia>

                <NewsCardContent>
                    <NewsCardSource>{article.source}</NewsCardSource>
                    <NewsCardTitle>{article.title}</NewsCardTitle>
                    {!!intro && <NewsCardIntro>{introText}</NewsCardIntro>}
                </NewsCardContent>
            </UnstyledGatsbyLink>
        </NewsCard>
    )
}

export default NewsArticleCard
