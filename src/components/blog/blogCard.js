import React from "react"
import { PrismicRichText } from "@prismicio/react"
import { Button } from "@mui/material";
import { parseDate, readingTime } from "../../utils/functions"
import { Today, Schedule, FiberManualRecord } from "styled-icons/material";
import styled from "styled-components";

import {
    UnstyledGatsbyLink,
    CardItem,
    GeneralCard,
    CardContentWrapper,
    CardTitle,
    CardMediaWrapper,
    CardRead,
    CardShadow,
} from "../styled"
import { brandColors } from "../../styles/brandColors"

const BlogPostTag = styled.span`
    color: ${brandColors.green};
    font-size: 0.9rem;
    text-transform: uppercase;
    font-weight: 600;
    margin-bottom: 5px;
`

const BlogInfoDateIcon = styled(Today)`
    margin: auto 5px auto 0px;
    font-size: 1rem;
    color: ${brandColors.green};
`

const BlogInfoDotIcon = styled(FiberManualRecord)`
    margin: auto 5px 5px 5px;
    font-size: 0.4rem;
    color: ${brandColors.green};

    @media (max-width: 1000px) {
        display: none;
    }
`

const BlogInfoTimeIcon = styled(Schedule)`
    margin: auto 5px auto 0px;

    font-size: 1rem;
    color: ${brandColors.green};

    @media (min-width: 1000px) {
        margin: auto 0px auto 5px;
    }
`

const BlogInfoText = styled.span`
    font-size: 0.75rem;
    color: ${brandColors.grey};

    @media (min-width: 1000px) {
        margin: 0;
    }
`

const BlogInfoDiv = styled.div`
    display: flex;
    flex-direction: row;

    .date-div,
    .time-div {
        line-height: initial;
    }

    @media (max-width: 1000px) {
        flex-direction: column;

        .time-div {
            display: flex;
            flex-direction: row-reverse;
        }
    }
`

const BlogCardContent = styled(CardContentWrapper)`
    &.right {
        ${BlogInfoDiv} {
            justify-content: flex-end;
        }
        ${BlogInfoDateIcon} {
            margin-left: auto;
        }
        @media (max-width: 1600px) {
            ${BlogInfoDateIcon} {
                margin: auto 5px auto auto;
            }
        }
    }

    &.left {
        @media (max-width: 1600px) {
            ${BlogInfoTimeIcon} {
                margin: auto 5px;
            }

            .time-text {
                margin-right: auto;
            }
        }
    }
`

const BlogCardItem = styled(CardItem)`
    &:hover {
        ${CardContentWrapper}.left {
            left: 5%;
        }

        ${CardMediaWrapper} {
            opacity: 0.7;
        }

        ${CardContentWrapper}.right {
            right: 5%;
        }
    }
`

const BlogPostCard = ({ blogPost, i, view }) => {
    let direction = ""
    let mediaReadDirection = ""

    if (i % 2 === 0) {
        direction = "left"
        mediaReadDirection = "right"
    } else {
        direction = "right"
        mediaReadDirection = "left"
    }

    return (
        <BlogCardItem className={direction}>
            <GeneralCard>
                <UnstyledGatsbyLink to={blogPost.url}>
                    <BlogCardContent className={direction}>
                        <BlogPostTag>{blogPost.data.tags}</BlogPostTag>
                        <CardTitle view={view}>
                            <PrismicRichText
                                field={blogPost.data.title.richText}
                                components={{ heading1: ({ children }) => <span>{children}</span>, }}
                            />
                        </CardTitle>
                        <PrismicRichText
                            field={blogPost.data.subtitle.richText}
                            components={{ heading2: ({ children }) => <span>{children}</span>, }}
                        />
                        <CardRead className={mediaReadDirection}>
                            <Button className="card-read-button">
                                Read more
                            </Button>
                        </CardRead>
                        <BlogInfoDiv>
                            <div className="date-div">
                                <BlogInfoDateIcon size={10} />
                                <BlogInfoText>
                                    {parseDate(blogPost.data.date, "long")}
                                </BlogInfoText>
                            </div>
                            <BlogInfoDotIcon size={10} />
                            <div className="time-div">
                                <BlogInfoText className="time-text">
                                    {readingTime(blogPost.data.word_count) +
                                        " minute read"}
                                </BlogInfoText>
                                <BlogInfoTimeIcon size={10} />
                            </div>
                        </BlogInfoDiv>
                    </BlogCardContent>
                    <CardMediaWrapper
                        src={blogPost.data.main_image.thumbnails.thumbnail.url}
                        alt={blogPost.data.main_image.thumbnails.thumbnail.alt}
                        className={mediaReadDirection}
                    />
                </UnstyledGatsbyLink>
            </GeneralCard>
            <CardShadow />
        </BlogCardItem>
    )
}

export default BlogPostCard
