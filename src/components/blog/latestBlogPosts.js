import React, { useState } from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types";
import { PrismicRichText } from "@prismicio/react";
import { Grid, Divider } from "@mui/material";
import { Today, Schedule, FiberManualRecord } from "styled-icons/material";
import styled from "styled-components"

import { UnstyledGatsbyLink, BigHeader, InfoRow } from "../styled"
import { brandColors } from "../../styles/brandColors"
import variables from "../../styles/variables"
import { parseDate, readingTime } from "../../utils/functions"

const BigPostImg = styled.img`
    width: 100%;
    object-fit: cover;
    margin: auto;

    @media (min-width: ${variables.minWidthSM}) {
        height: 350px;
    }

    @media (max-width: ${variables.maxWidthSM}) {
        height: 220px;
    }
`

const BigPostDiv = styled.div`
    margin: 0 auto;
    text-align: center;

    &:hover {
        ${BigPostImg} {
            opacity: 0.7;
        }
    }
`

const BigPostTitle = styled(Link)`
    text-decoration: none;
    font-size: 1.25rem;
    text-transform: uppercase;
    padding: 0px 10px;
    color: ${brandColors.brown};
    font-weight: 600;

    &:hover {
        text-decoration: underline;
        text-decoration-color: ${brandColors.brown};
    }
`

const BigPostSubtitle = styled.h3`
    font-weight: 600;
    text-align: center;
    margin: 0px auto 2rem;
    padding: 0px 10%;

    @media (max-width: ${variables.minWidthSM}) {
        font-size: 1rem;
        padding: 0px;
        margin-bottom: 1rem;
    }
`

const BigPostDivider = styled(Divider)`
    width: 25%;
    margin: auto auto 10px auto;
`

const BigPostInfoRow = styled(InfoRow)`
    color: ${brandColors.brown};

    .first-icon {
        margin: auto 5px auto auto;
    }

    .first-icon,
    .icon-separator-dot,
    .last-icon {
        color: inherit;
    }
`

// Display a big image, the title and a short summary of the Post for the left side of the slider
const PostImage = ({ post }) => {
    return (
        <BigPostDiv key={post.id}>
            <Link to={post.url}>
                <BigPostImg
                    src={post.data.main_image.url}
                    alt={post.data.main_image.alt}
                />
            </Link>
            <div style={{ paddingTop: "10px" }}>
                <BigPostSubtitle>
                    <PrismicRichText
                        field={post.data.subtitle.richText}
                        components={{ heading4: ({ children }) => <span>{children}</span>, }}
                    />
                    {" "}
                </BigPostSubtitle>
                <BigPostTitle to={post.url}>
                    <PrismicRichText
                        field={post.data.title.richText}
                        components={{ heading1: ({ children }) => <span>{children}</span>, }}
                    />
                </BigPostTitle>
                <BigPostDivider />
                <BigPostInfoRow>
                    <Today size={14} className="first-icon" />
                    <p className="icon-info-row-text">
                        {parseDate(post.data.date)}
                    </p>
                    <FiberManualRecord size={10} className="icon-separator-dot" />
                    <p className="icon-info-row-text">
                        {readingTime(post.data.word_count) + " minute read"}
                    </p>
                    <Schedule size={14} className="last-icon" />
                </BigPostInfoRow>
            </div>
        </BigPostDiv>
    )
}

const SmallPostItem = styled.div`
    @media (min-width: ${variables.muiMDwidth}) {
        position: relative;
        width: 100%;
        height: 110px;
        background-color: white;
        margin: 0 0 30px 0;
        cursor: pointer;

        &:last-of-type {
            margin: 0;
        }
    }
    @media (max-width: ${variables.muiMDwidth}) {
        width: 48%;
        &:nth-child(odd) {
            margin: 0px auto 0px 0px;
        }

        &:nth-child(even) {
            margin: 0px 0px 0px auto;
        }
    }
`

const SmallPostImg = styled.img`
    object-fit: cover;
    width: 100%;
    height: 100px;

    @media (min-width: ${variables.muiMDwidth}) {
        position: absolute;
        width: 110px;
        height: 100%;
        top: 0;
        right: 0;
    }
`

const SmallPostContent = styled.div`
    padding: 10px;
    display: flex;
    text-align: center;

    @media (min-width: ${variables.muiMDwidth}) {
        position: relative;
        width: calc(100% - 110px);
        height: 100%;
        top: 0;
        left: 0;
        text-align: right;
    }
`

const SmallPostTitle = styled.h3`
    width: 100%;
    margin: auto;
    font-size: 1.1rem;
    font-weight: 600;
    @media (max-width: ${variables.muiMDwidth}) {
        font-size: 1rem;
        font-weight: 500;
    }
`

const SmallPost = ({ post, selectBigPost, i }) => {
    const onClick = () => {
        selectBigPost(i)
    }

    return (
        <SmallPostItem
            onClick={onClick}
            onKeyPress={onClick}
            role="button"
            tabIndex="0"
            key={i}
        >
            <SmallPostImg
                src={post.data.main_image.thumbnails.thumbnail.url}
                alt={post.data.main_image.thumbnails.thumbnail.alt}
            />
            <SmallPostContent>
                <SmallPostTitle>
                    <PrismicRichText
                        field={post.data.title.richText}
                        components={{ heading1: ({ children }) => <span>{children}</span>, }}
                    />
                </SmallPostTitle>
            </SmallPostContent>
        </SmallPostItem>
    )
}

const TrendingPostsGrid = styled(Grid)`
    background-color: ${brandColors.lightgrey};
    position: relative;
    padding: 25px;
`

const TrendingPostsLeftGrid = styled(Grid)`
    @media (min-width: ${variables.minWidthSM}) {
        padding-right: 5px;
    }
    @media (max-width: ${variables.muiMDwidth}) {
        margin-bottom: 20px;
    }
`

const TrendingPostsRightGrid = styled(Grid)`
    @media (min-width: ${variables.minWidthSM}) {
        padding-left: 20px;
    }
`

const TrendingPostsMobileDivider = styled(Divider)`
    margin-top: 5px;
    @media (min-width: ${variables.minWidthSM}) {
        display: none;
    }
`

const TrendingPostsSmallDiv = styled.div`
    @media (max-width: ${variables.muiMDwidth}) {
        display: flex;
        flex-wrap: wrap;
    }
`
const TrendingBlogPosts = ({ posts }) => {
    const [currentIndex, setCurrentIndex] = useState(0)

    const onSmallPostClick = (newIndex) => {
        setCurrentIndex(newIndex)
    }

    return (
        <div>
            <BigHeader>
                <UnstyledGatsbyLink to="/blog">BLOG POSTS</UnstyledGatsbyLink>
            </BigHeader>
            <TrendingPostsGrid container>
                <TrendingPostsLeftGrid item md={7}>
                    <div>
                        <PostImage post={posts[currentIndex]} />
                    </div>
                    <TrendingPostsMobileDivider />
                </TrendingPostsLeftGrid>
                <TrendingPostsRightGrid item md={5}>
                    <TrendingPostsSmallDiv>
                        {posts.map((post, index) => {
                            return (
                                <SmallPost
                                    post={post}
                                    key={index}
                                    selectBigPost={onSmallPostClick}
                                    i={index}
                                />
                            )
                        })}
                    </TrendingPostsSmallDiv>
                </TrendingPostsRightGrid>
            </TrendingPostsGrid>
        </div>
    )
}

TrendingBlogPosts.propTypes = {
    posts: PropTypes.array.isRequired,
}

export default TrendingBlogPosts
