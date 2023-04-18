const queries = require("./src/utils/algolia")

require('dotenv').config({
	path: `.env.${process.env.NODE_ENV}`,
})

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
	siteMetadata: {
		title: "Allsect",
		description:
			"The best and most comprehensive source of everything related to entomophagy and edible insects.",
		author: "Johanna Kreiser & Tom Jansen",
		url: "https://allsect.com/",
		siteUrl: "https://allsect.com",
		image: "/allsect-bee-logo.png",
		year: 2023,
		keywords: [
			"allsect",
			"edible insects",
			"insects as food",
			"edible bugs",
			"food insects",
			"speiseinsekten",
			"entomophagy",
		],
	},
	plugins: [
		"gatsby-plugin-styled-components",
		"gatsby-plugin-sharp",
		"gatsby-transformer-sharp",
		"gatsby-plugin-image",
		{
			resolve: "gatsby-plugin-google-gtag",
			options: {
				trackingIds: [process.env.GOOGLE_ANALYTICS_TRACKING_ID],
				gtagConfig: {
					cookine_name: "gaCookie",
					anonymize_ip: true,
					cookie_expires: 0,
				},
				pluginConfig: {
					head: true,
				},
			},
		},
		{
			resolve: "gatsby-plugin-sitemap",
			options: {
				excludes: [`/preview`, `/preview/*`, `/search`],
			},
		},
		{
			resolve: "gatsby-plugin-manifest",
			options: {
				name: "Allsect website",
				short_name: "Allsect",
				start_url: "/",
				background_color: "#ffffff",
				theme_color: "#663399",
				display: "minimal-ui",
				icon: "src/images/allsect-bee-logo.png", // This path is relative to the root of the site.
			},
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				"name": "images",
				"path": "./src/images/"
			},
			__key: "images"
		},
		{
			resolve: 'gatsby-source-prismic',
			options: {
				repositoryName: process.env.GATSBY_PRISMIC_REPO_NAME,
				accessToken: process.env.PRISMIC_ACCESS_TOKEN,
				customTypesApiToken: process.env.PRISMIC_CUSTOM_TYPES_API_TOKEN,
				linkResolver: require('./src/utils/linkResolver').linkResolver,
				schemas: {
					about: require('./custom_types/about.json'),
					post: require('./custom_types/post.json'),
					recipe: require('./custom_types/recipe.json'),
				},
			},
		},
		{
			resolve: "gatsby-firesource",
			options: {
				credential: require("./allsect-firebase-adminsdk.json"),
				appConfig: {
					databaseURL: process.env.FIREBASE_DATABASE_URL,
				},
				types: [
					{
						type: "NewsArticles",
						collection: "news_articles",
						map: (article) => ({
							authors: article.authors,
							content: article.content,
							description: article.description,
							imageUrl: article.urlToImage,
							publishedAt: article.publishedAt.toDate(),
							source: article.source,
							title: article.title,
							url: article.url,
						}),
					},
					{
						type: "Products",
						collection: "products",
						map: (product) => ({
							name: product.name,
							producer___NODE: product.producer.id,
							insect: product.insect,
							type: product.type,
							imageUrl: product.imageUrl,
							reviewUrl: product.reviewUrl,
							recommended: product.recommended,
							valid: product.valid,
						}),
					},
					{
						type: "Producers",
						collection: "producers",
						map: (producer) => ({
							name: producer.name,
							website: producer.website,
							country: producer.country,
							valid: producer.valid,
						}),
					},
				],
			},
		},
		{
			resolve: "gatsby-plugin-remote-images",
			options: {
				nodeType: "Products",
				imagePath: "imageUrl",
			},
		},
		{
			resolve: "gatsby-plugin-google-fonts",
			options: {
				fonts: [
					"Raleway:400,500,600,700",
					"Roboto:400,500,700",
					"Roboto Condensed",
				],
			},
			display: "swap",
		},
		/*
		{
			resolve: "gatsby-plugin-algolia",
			options: {
				appId: process.env.GATSBY_ALGOLIA_APP_ID,
				apiKey: process.env.GATSBY_ALGOLIA_API_KEY,
				queries,
				chunkSize: 10000, // default: 1000
				enablePartialUpdates: true,
				matchFields: ["title", "content", "description"],
			},
		},
		*/
		{
			resolve: "gatsby-plugin-robots-txt",
			options: {
				host: "https://www.allsect.com",
				sitemap: "https://www.allsect.com/sitemap.xml",
				policy: [
					{
						userAgent: "*",
						allow: "/",
					},
				],
			},
		},
	]
};