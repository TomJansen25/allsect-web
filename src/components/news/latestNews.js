import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import {
    UnstyledGatsbyLink,
    BigHeader,
    NewsCard,
    NewsCardMedia,
    NewsCardAvatar,
    NewsCardTitle,
    NewsCardSource,
} from "../styled"
import variables from "../../styles/variables"

const NewsSliderDiv = styled.div`
    margin-top: 50px;
`

const NewsCardSourceWrapper = styled(NewsCardSource)`
    opacity: 1;
    height: unset;
`

const NewsArticleDiv = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    position: relative;
    width: 100%;

    ${NewsCard} {
        @media (min-width: ${variables.muiMDwidth}) {
            width: 23.5%;

            ${NewsCardTitle} {
                font-size: 1rem;
            }
        }

        @media (max-width: ${variables.muiMDwidth}) {
            width: 48%;

            ${NewsCardTitle} {
                margin: 0px;
                font-size: 0.85rem;
                font-weight: 500;
            }
        }

        @media (max-width: ${variables.maxWidthSM}) {
            ${NewsCardTitle} {
                font-size: 0.7rem;
            }
            ${NewsCardAvatar} {
                font-size: 0.65rem;
                width: 42px;
                height: 42px;
            }
        }
    }
`

const NewsCardMediaWrapper = styled(NewsCardMedia)`
    height: 300px;
    display: flex;
    flex-direction: column;

    @media (max-width: ${variables.muiMDwidth}) {
        height: 250px;
    }
`

const NewsCardContent = styled.div`
    background-color: white;
    width: 100%;
    margin-top: auto;
    padding: 10px;
`

const LatestNews = ({ newsArticles }) => {
    return (
        <NewsSliderDiv>
            <BigHeader>
                <UnstyledGatsbyLink to="/news">LATEST NEWS</UnstyledGatsbyLink>
            </BigHeader>
            <NewsArticleDiv>
                {newsArticles.map((article, index) => {
                    return (
                        <NewsCard variant="outlined" key={index}>
                            <UnstyledGatsbyLink
                                as="a"
                                href={article.node.url}
                                target="_blank"
                                variant="contained"
                                rel="external noopener noreferrer"
                            >
                                <NewsCardMediaWrapper
                                    image={article.node.imageUrl}
                                >
                                    <NewsCardAvatar>
                                        {article.node.publishedAt.split(".")[0]}
                                    </NewsCardAvatar>
                                    <NewsCardContent>
                                        <NewsCardSourceWrapper>
                                            {article.node.source}
                                        </NewsCardSourceWrapper>
                                        <NewsCardTitle>
                                            {article.node.title}
                                        </NewsCardTitle>
                                    </NewsCardContent>
                                </NewsCardMediaWrapper>
                            </UnstyledGatsbyLink>
                        </NewsCard>
                    )
                })}
            </NewsArticleDiv>
        </NewsSliderDiv>
    )
}

LatestNews.propTypes = {
    newsArticles: PropTypes.array.isRequired,
}

export default LatestNews
