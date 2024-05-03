import * as React from "react";
import { graphql, Link } from "gatsby";
import styled from "styled-components";

import Seo from "../components/layout/seo";
import IndexBanner from "../components/other/homeBanner";

import LatestItems from "../components/other/latestItems";
import TrendingBlogPosts from "../components/blog/latestBlogPosts";
import LatestRecipes from "../components/recipes/latestRecipes";
import NewsSlider from "../components/news/latestNews";

import { ReadMoreWrapper, FilledButton, BigHeader } from "../components/styled"


// Query for the Blog Home content in Prismic
export const query = graphql`
    {
        allPrismicPost(
            sort: { data: { date: DESC } }
            filter: { lang: { eq: "en-au" } }
            limit: 5
        ) {
            nodes {
                url
                uid
                id
                prismicId
                lang
                type
                data {
                    title {
                        richText
                    }
                    subtitle {
                        richText
                    }
                    date
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
        allPrismicRecipe(
            sort: { data: { date: DESC } }
            filter: { lang: { eq: "en-au" } }
            limit: 5
        ) {
            nodes {
                url
                uid
                id
                prismicId
                lang
                type
                data {
                    title {
                        richText
                    }
                    date
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
        allNewsArticles(sort: { publishedAt: DESC }, limit: 5) {
            edges {
                node {
                    id
                    authors
                    description
                    publishedAt(formatString: "DD MMM. YYYY")
                    source
                    title
                    url
                    imageUrl
                }
            }
        }
    }
`

const Button = styled(FilledButton).attrs((props) => ({
    variant: "contained",
    disableElevation: true,
    component: Link,
}))`
    font-size: 0.875rem;
`


const IndexPage = ({ data }) => {
    const latestPosts = data.allPrismicPost.nodes
    const latestRecipes = data.allPrismicRecipe.nodes
    const latestNewsArticles = data.allNewsArticles.edges

    if (!latestPosts || !latestRecipes || !latestNewsArticles) return null

    return (
        <section>
            <IndexBanner />

            <BigHeader>Latest</BigHeader>

            <LatestItems
                latestPost={latestPosts[0]}
                latestRecipe={latestRecipes[0]}
                latestNewsArticle={latestNewsArticles[0]}
            />

            <TrendingBlogPosts posts={latestPosts.slice(1, 5)} />
            <ReadMoreWrapper>
                <Button to="/blog/">See all our blog posts</Button>
            </ReadMoreWrapper>

            <LatestRecipes recipes={latestRecipes.slice(1, 5)} />
            <ReadMoreWrapper>
                <Button to="/recipes/">Get more recipes</Button>
            </ReadMoreWrapper>

            <NewsSlider newsArticles={latestNewsArticles.slice(1, 5)} />
            <ReadMoreWrapper style={{ marginBottom: "10px" }}>
                <Button to="/news/">Read more latest news</Button>
            </ReadMoreWrapper>

        </section>
    )
}

export default IndexPage

export const Head = () => (
    <Seo
        title="The Home of Edible Insects"
        description="Interesting blog posts, delicious recipes, the latest news and more about edible insects, entomophopagy and/or insects as food is right here."
    />
)
