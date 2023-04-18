// import React from "react"
// import { linkResolver } from "./linkResolver"
import { asText } from "@prismicio/richtext"

export const structuredRecipe = (data) => {
    const recipe = data.prismicRecipe.data

    const ingredientArray = []
    recipe.ingredients.richText.forEach((ingr) => {
        ingredientArray.push(ingr.text)
    })

    const instructionArray = []
    recipe.prep.richText.forEach((step) => {
        instructionArray.push({
            "@type": "HowToStep",
            text: step.text,
        })
    })

    const res = {
        "@context": "http://schema.org/",
        "@type": "Recipe",
        name: asText(recipe.title.richText),
        image: recipe.main_image.url,
        description: asText(recipe.subtitle.richText),
        url: "https://www.allsect.com" + data.prismicRecipe.url,
        author: {
            "@type": "Person",
            name: "Tom Jansen",
        },
        publisher: structuredOrganization(),
        datePublished: recipe.date,
        /*
        nutrition: {
            "@type": "NutritionInformation",
            calories: "270 calories",
        },
        */
        totalTime: `PT${recipe.prep_time}M`,
        recipeCategory: recipe.recipe_type,
        recipeCuisine: recipe.recipe_cuisine,
        recipeYield: recipe.servings,
        keywords: recipe.keywords_seo,
        recipeIngredient: ingredientArray,
        recipeInstructions: instructionArray,
    }

    return res
}

export const structuredBlogPost = (data) => {
    const post = data.prismicPost.data

    const res = {
        "@context": "http://schema.org",
        "@type": "BlogPosting",
        author: {
            "@type": "Person",
            name: "Tom Jansen",
        },
        publisher: structuredOrganization(),
        datePublished: post.date,
        dateModified: data.last_publication_date,
        image: post.main_image.url,
        headline: asText(post.title.richText),
        alternativeHeadline: asText(post.subtitle.richText),
        description: asText(post.subtitle.richText),
        url: "https://www.allsect.com" + data.prismicPost.url,
        keywords: post.keywords_seo,
        wordcount: post.word_count,
    }

    return res
}

export const structuredOrganization = () => {
    const res = {
        "@context": "http://schema.org",
        "@type": "Organization",
        name: "Allsect",
        url: "https://www.allsect.com/",
        logo: {
            "@type": "ImageObject",
            url: "https://www.allsect.com/allsect-logo-black.png",
        },
        foundingDate: "2020",
        founders: [
            {
                "@type": "Person",
                name: "Tom Jansen",
            },
            {
                "@type": "Person",
                name: "Johanna Kreiser",
            },
        ],
    }
    return res
}
