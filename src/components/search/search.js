import React from "react"
import {
    InstantSearch,
    connectHits,
    connectSearchBox,
    Configure,
    Index,
} from "react-instantsearch-dom"
import algoliasearch from "algoliasearch/lite"
import styled from "styled-components"

import { BlogPostHits, RecipeHits } from "./hitComps"

/*

const Results = connectStateResults(
    ({ searchState: state, searchResults: res, children }) =>
        res && res.nbHits > 0 ? children : `No results for '${state.query}'`
)

const Stats = connectStateResults(
    ({ searchResults: res }) =>
        res &&
        res.nbHits > 0 &&
        `${res.nbHits} result${res.nbHits > 1 ? `s` : ``}`
)
*/

const TitleDiv = styled.div`
    max-width: 900px;
    margin: auto;
`

const searchClient = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID,
    process.env.GATSBY_ALGOLIA_SEARCH_KEY
)

const searchIndices = [
    { name: "BlogPosts", title: "Blog Posts", hitComp: BlogPostHits },
    { name: "Recipes", title: "Recipes", hitComp: RecipeHits },
    // { name: "NewsArticles", title: "News", hitComp: "NewsHit" },
]

const HiddenSearchBox = ({ currentRefinement, refine }) => {
    return (
        <form noValidate action="" role="search" style={{ display: "none" }}>
            <input
                type="search"
                value={currentRefinement}
                onChange={(event) => refine(event.currentTarget.value)}
            />
            <button onClick={() => refine("")}>Reset query</button>
        </form>
    )
}

const CustomHiddenSearchBox = connectSearchBox(HiddenSearchBox)

const SearchApp = (query) => {
    return (
        <InstantSearch
            indexName={searchIndices[0].name}
            searchClient={searchClient}
            searchState={{ query: query["query"] }}
        >
            <CustomHiddenSearchBox searchAsYouType={false} />
            <Configure
                hitsPerPage={5}
                attributesToSnippet={["title", "subtitle", "text"]}
                facetFilters={["lang:en"]}
            />
            {searchIndices.map(({ name, title, hitComp }) => {
                const CustomHits = connectHits(hitComp)
                return (
                    <Index key={name} indexName={name}>
                        <TitleDiv>
                            <h3>{title}</h3>
                        </TitleDiv>
                        <CustomHits />
                    </Index>
                )
            })}
        </InstantSearch>
    )
}

export default SearchApp
