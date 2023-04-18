const path = require("path")

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions

    const pages = await graphql(`
        {
            allPrismicPost {
                nodes {
                    id
                    uid
                    lang
                    type
                    url
                }
            }
            allPrismicRecipe {
                nodes {
                    id
                    uid
                    lang
                    type
                    url
                }
            }
        }
    `)

    pages.data.allPrismicPost.nodes.forEach((page) => {
        if (page.lang === "en-au") {
            createPage({
                path: page.url,
                component: path.resolve(__dirname, "src/templates/post.js"),
                context: { ...page },
            })
        }
    })

    pages.data.allPrismicRecipe.nodes.forEach((page) => {
        if (page.lang === "en-au") {
            createPage({
                path: page.url,
                component: path.resolve(__dirname, "src/templates/recipe.js"),
                context: { ...page },
            })
        }
    })
}
