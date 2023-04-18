// const { RichText } = require("prismic-reactjs");
const { asText } = require("@prismicio/richtext");

const NewsArticleQuery = `
    {
        allNewsArticles {
            nodes {
                objectID: id
                authors
                content
                description
                source
                title
            }
        }
    }
`

const BlogPostQuery = `
    {
        allPrismicPost {
            nodes {
                prismicId
                uid
                lang
                dataRaw
            }
        }
    }
`

const RecipeQuery = `
    {
        allPrismicRecipe {
            nodes {
                prismicId
                uid
                lang
                dataRaw
            }
        }
    }
`

const flattenBody = (body) => {
    let textArray = []
    let imageArray = []

    body.forEach((slice) => {
        switch (slice.slice_type) {
            case "text":
            case "quote": {
                textArray.push(asText(slice.primary.text))
                break
            }
            case "image_with_caption":
            case "image": {
                imageArray.push(slice.primary.image)
                break
            }
            default: {
                break
            }
        }
    })

    return { texts: textArray.join(" "), images: imageArray }
}

const processLanguage = (lang) => {
    switch (lang) {
        case "en-au":
        case "en-us": {
            return "en"
        }
        case "de-de": {
            return "de"
        }
        default: {
            return "en"
        }
    }
}

const processPost = (post) => {
    const title = asText(post.dataRaw.title)
    const subtitle = asText(post.dataRaw.subtitle)
    const { texts } = flattenBody(post.dataRaw.body)

    const algoliaIndex = {
        objectID: post.prismicId,
        uid: post.uid,
        lang: processLanguage(post.lang),
        title: title,
        subtitle: subtitle,
        tl_dr: post.dataRaw.tl_dr,
        date: post.dataRaw.date,
        tag: post.dataRaw.tags,
        main_image: post.dataRaw.main_image,
        text: texts,
    }

    return algoliaIndex
}

function processRecipe(recipe) {
    const title = asText(recipe.dataRaw.title)
    const subtitle = asText(recipe.dataRaw.subtitle)
    const intro = asText(recipe.dataRaw.introduction)
    const ingredients = asText(recipe.dataRaw.ingredients)
    const prep = asText(recipe.dataRaw.prep)
    const { texts } = flattenBody(recipe.dataRaw.body)

    const algoliaIndex = {
        objectID: recipe.prismicId,
        uid: recipe.uid,
        lang: processLanguage(recipe.lang),
        title: title,
        subtitle: subtitle,
        date: recipe.dataRaw.date,
        introduction: intro,
        recipe_type: recipe.dataRaw.recipe_type,
        insect_of_choice: recipe.dataRaw.insect_of_choice,
        ingredients: ingredients,
        main_image: recipe.dataRaw.main_image,
        prep: prep,
        text: texts,
    }

    return algoliaIndex
}

const settings = { attributesToSnippet: [`excerpt:20`] }

const queries = [
    /*
    {
        query: NewsArticleQuery,
        transformer: ({ data }) => data.allNewsArticles.nodes,
        indexName: "NewsArticles",
        settings,
        matchFields: [
            "title", 
            "content", 
            "description", 
            "source", 
            "url"
        ],
    },
    */
    {
        query: BlogPostQuery,
        transformer: ({ data }) => data.allPrismicPost.nodes.map(processPost),
        indexName: "BlogPosts",
        settings,
        matchFields: [
            "uid",
            "lang",
            "title",
            "subtitle",
            "tl_dr",
            "tag",
            "main_image",
            "text",
        ],
    },
    {
        query: RecipeQuery,
        transformer: ({ data }) =>
            data.allPrismicRecipe.nodes.map(processRecipe),
        indexName: "Recipes",
        settings,
        matchFields: [
            "uid",
            "lang",
            "title",
            "subtitle",
            "date",
            "introduction",
            "recipe_type",
            "insect_of_choice",
            "ingredients",
            "main_image",
            "prep",
            "text",
        ],
    },
]

module.exports = queries
