import React from "react"
import PropTypes from "prop-types"
// import { PrismicRichText } from "@prismicio/react"
import { asText } from "@prismicio/richtext"
import { StaticImage } from "gatsby-plugin-image"
import styled from "styled-components"

// import styled from "styled-components"
import { UnstyledGatsbyLink } from "../styled"
import variables from "../../styles/variables"

const LatestItemsDiv = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 50px;
`

const LatestItemsCard = styled.div`
    border: 0;
    position: relative;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
    background: white;
    width: 22vw;
    height: 325px;
    margin: auto;

    @media (max-width: ${variables.muiMDwidth}) {
        &.blog {
            width: 100%;
            margin: 0px auto 20px auto;
        }

        &.recipe {
            width: 48%;
            margin-left: 0;
            margin-right: auto;
        }

        &.news {
            width: 48%;
            margin-right: 0;
            margin-left: auto;
        }
    }
`

const CardImgDiv = styled.div`
    overflow: hidden;
    height: 200px;
`

const CardImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`

const CardAvatar = styled.div`
    margin: -40px auto 0 auto;
    width: 70px;
    height: 70px;
    z-index: 10;
    border-radius: 100px;
    position: relative;
    border: 7px solid #fff;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    background-color: white;
    display: inline-block;
    overflow: hidden;
`

const CardTitle = styled.span`
    margin-top: 25px;
    padding: 0px 30px 30px;
    text-overflow: ellipsis;
    word-wrap: break-word;
    overflow: hidden;
    font-size: 1.2rem;
    max-height: 2.6rem;
    line-height: 1.3rem;
    text-align: center;

    @media (max-width: ${variables.muiMDwidth}) {
        font-size: 1rem;
        line-height: 1rem;
        max-height: 3rem;
    }
`

const LinkWrapper = styled(UnstyledGatsbyLink)`
    &:hover {
        ${CardImg} {
            opacity: 0.7;
        }
    }
`

const LatestItems = ({ latestPost, latestRecipe, latestNewsArticle }) => {
    return (
        <LatestItemsDiv>
            <LinkWrapper
                to={latestPost.url}
                style={{ marginLeft: 0, display: "contents" }}
            >
                <LatestItemsCard className="blog">
                    <CardImgDiv>
                        <CardImg
                            src={latestPost.data.main_image.url}
                            alt={latestPost.data.main_image.alt}
                        />
                    </CardImgDiv>
                    <CardAvatar>
                        <StaticImage
                            src="../../images/blog-icon.jpg"
                            alt="Blog post image"
                            placeholder="blurred"
                            layout="fixed"
                            height={64}
                            width={64}
                        />
                    </CardAvatar>
                    <CardTitle>
                        {asText(latestPost.data.title.richText)}
                    </CardTitle>
                </LatestItemsCard>
            </LinkWrapper>
            <LinkWrapper
                to={latestRecipe.url}
                style={{ margin: "auto", display: "contents" }}
            >
                <LatestItemsCard className="recipe">
                    <CardImgDiv>
                        <CardImg
                            src={latestRecipe.data.main_image.url}
                            alt={latestRecipe.data.main_image.alt}
                        />
                    </CardImgDiv>
                    <CardAvatar>
                        <StaticImage
                            src="../../images/recipe-icon.jpg"
                            alt="Recipe post image"
                            placeholder="blurred"
                            layout="fixed"
                            height={64}
                            width={64}
                        />
                    </CardAvatar>
                    <CardTitle className="latest-items-card-title">
                        {asText(latestRecipe.data.title.richText)}
                    </CardTitle>
                </LatestItemsCard>
            </LinkWrapper>
            <LinkWrapper
                as="a"
                href={latestNewsArticle.node.url}
                target="_blank"
                variant="contained"
                rel="external noopener noreferrer"
                style={{ marginRight: 0, display: "contents" }}
            >
                <LatestItemsCard className="news">
                    <CardImgDiv>
                        <CardImg
                            src={latestNewsArticle.node.imageUrl}
                            alt={latestNewsArticle.node.title}
                        />
                    </CardImgDiv>
                    <CardAvatar>
                        <StaticImage
                            src="../../images/news-icon.jpg"
                            alt="News item image"
                            placeholder="blurred"
                            layout="fixed"
                            height={64}
                            width={64}
                        />
                    </CardAvatar>
                    <CardTitle className="latest-items-card-title">
                        {latestNewsArticle.node.title}
                    </CardTitle>
                </LatestItemsCard>
            </LinkWrapper>
        </LatestItemsDiv>
    )
}

LatestItems.propTypes = {
    latestPost: PropTypes.object.isRequired,
    latestRecipe: PropTypes.object.isRequired,
    latestNewsArticle: PropTypes.object.isRequired,
}

export default LatestItems
