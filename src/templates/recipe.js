import React from "react"
import { graphql } from "gatsby"
import { RichText } from "prismic-reactjs"
import {
    ImageCaption,
    MainImage,
    Text,
    Ingredients,
    Preparation,
} from "../components/slices/index"
import Grid from "@material-ui/core/Grid"
import ScheduleIcon from "@material-ui/icons/Schedule"
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord"
import PeopleIcon from "@material-ui/icons/People"
import styled from "styled-components"

import SEO from "../components/layout/seo"
import Comments from "../components/other/comments"

import {
    ContentDiv,
    PostHeader,
    PostHeaderTitle,
    PostHeaderWrapper,
    InfoRow,
} from "../components/styled"

// import { FirebaseContext } from "../components/firebase"
import { structuredRecipe } from "../utils/structuredData"

// Query for the Blog Post content in Prismic
export const recipeQuery = graphql`
    query RecipeAltQuery($uid: String) {
        prismicRecipe(uid: { eq: $uid }) {
            id
            prismicId
            uid
            lang
            type
            url
            last_publication_date(formatString: "YYYY-MM-DD")
            data {
                title {
                    richText
                }
                subtitle {
                    richText
                }
                date
                prep_time
                recipe_type
                recipe_cuisine
                keywords_seo
                servings
                introduction {
                    richText
                }
                prep {
                    richText
                }
                ingredients {
                    richText
                }
                main_image {
                    alt
                    url
                    copyright
                }
                body {
                    ... on PrismicRecipeDataBodyImage {
                        id
                        slice_label
                        slice_type
                        primary {
                            image {
                                alt
                                url
                            }
                        }
                    }
                    ... on PrismicRecipeDataBodyText {
                        id
                        primary {
                            text {
                                richText
                            }
                        }
                        slice_label
                        slice_type
                    }
                }
            }
        }
    }
`

const RecipeImageDiv = styled.div`
    margin-top: 10px;
    margin-bottom: 1rem;
    max-height: 500px;
`

const GridItemWrapper = styled(Grid)`
    padding: 10px;
`

// Sort and display the different slice options
const RecipeSlices = ({ slices }) => {
    return slices.map((slice, index) => {
        const res = (() => {
            switch (slice.slice_type) {
                case "text":
                    return <div key={index}>{<Text slice={slice} />}</div>

                case "image":
                    return (
                        <div key={index}>{<ImageCaption slice={slice} />}</div>
                    )

                default:
                    return
            }
        })()
        return res
    })
}

const Recipe = ({ recipe }) => (
    <ContentDiv>
        <div>{RichText.asText(recipe.introduction.richText)}</div>

        <RecipeImageDiv>
            {<MainImage image={recipe.main_image} />}
        </RecipeImageDiv>

        <Grid container>
            <GridItemWrapper item sm={12} md={5}>
                {<Ingredients ingredients={recipe.ingredients} />}
            </GridItemWrapper>
            <GridItemWrapper item sm={12} md={7}>
                {<Preparation prep={recipe.prep} />}
            </GridItemWrapper>
        </Grid>

        <RecipeSlices slices={recipe.body} />
    </ContentDiv>
)

const RecipeTemplate = ({ data }) => {
    // const firebase = useContext(FirebaseContext)

    if (!data) return null
    // Define the Post content returned from Prismic
    const recipe = data.prismicRecipe.data
    const meta = {
        id: data.prismicRecipe.id,
        uid: data.prismicRecipe.uid,
        type: data.prismicRecipe.type,
        lang: data.prismicRecipe.lang,
    }

    const structuredData = structuredRecipe(data)

    return (
        <section>
            <SEO
                title={RichText.asText(recipe.title.richText)}
                description={RichText.asText(recipe.introduction.richText)}
                keywords={recipe.keywords_seo}
                docMeta={meta}
                docImage={recipe.main_image.url}
                structuredData={JSON.stringify(structuredData)}
            />
            <PostHeaderWrapper>
                <PostHeader>
                    <PostHeaderTitle>
                        {RichText.asText(recipe.title.richText)}
                    </PostHeaderTitle>
                    <InfoRow>
                        <ScheduleIcon className={"first-icon"} />
                        <p className={"icon-info-row-text"}>
                            {recipe.prep_time + " minutes"}
                        </p>
                        <FiberManualRecordIcon
                            className={"icon-separator-dot"}
                        />
                        <p className={"icon-info-row-text"}>
                            {recipe.servings + " servings"}
                        </p>
                        <PeopleIcon className={"last-icon"} />
                    </InfoRow>
                </PostHeader>
            </PostHeaderWrapper>
            <Recipe recipe={recipe} />
            <Comments
                postType="recipe"
                postId={data.prismicRecipe.prismicId}
            />
        </section>
    )
}

export default RecipeTemplate
