// -- The Link Resolver
// This function will be used to generate links to Prismic documents
// As your project grows, you should update this function according to your routes

exports.linkResolver = (doc) => {
	// Route for blog posts
	if (doc.type === 'post') {
		return `/blog/${doc.uid}`
	}

	// Route for recipes
	if (doc.type === 'recipe') {
		return `/recipe/${doc.uid}`
	}

	// Homepage route fallback
	return '/';
}
