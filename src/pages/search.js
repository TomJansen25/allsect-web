import React, { useState } from "react";
import styled from "styled-components";
import algoliasearch from "algoliasearch/lite";
import {
    InstantSearch,
    Hits,
    Configure,
    Index
} from "react-instantsearch-hooks-web";

import SEO from "../components/layout/seo"
import SearchPageBox from "../components/search/searchPageBox"
import { PoweredBy } from "../components/search/poweredByAlgolia";
import { BlogPostHit, RecipeHit } from "../components/search/hitComps";


const searchClient = algoliasearch(
    process.env.GATSBY_ALGOLIA_APPID,
    process.env.GATSBY_ALGOLIA_APIKEY
)

const TitleDiv = styled.div`
    max-width: 900px;
    margin: auto;
`

const PoweredByDiv = styled.div`
    text-align: center;
    margin-bottom: 20px;
`

const searchIndices = [
    { name: "BlogPosts", title: "Blog Posts", hitComp: BlogPostHit },
    { name: "Recipes", title: "Recipes", hitComp: RecipeHit },
    // { name: "NewsArticles", title: "News", hitComp: "NewsHit" },
]


const SearchPage = (props) => {
    const [currQuery, setCurrQuery] = useState(props.location.state?.query || "");
    const onStateChange = ({ uiState, setUiState }) => {
        setCurrQuery(uiState.BlogPosts.query)
        setUiState(uiState)
    };

    return (
        <section>
            <div>
                <div style={{ textAlign: "center" }}>
                    <h5>Showing results for:</h5>
                    <h3>
                        <q>{currQuery}</q>
                    </h3>
                </div>
                <InstantSearch
                    indexName={searchIndices[0].name}
                    searchClient={searchClient}
                    initialUiState={{
                        BlogPosts: {
                            query: currQuery,
                        },
                    }}
                    onStateChange={onStateChange}
                // routing={true}
                >
                    <Configure
                        hitsPerPage={5}
                        attributesToHighlight={["title", "subtitle", "text"]}
                        attributesToSnippet={["title", "subtitle", "text"]}
                        facetFilters={["lang:en"]}
                    />

                    <SearchPageBox />

                    <PoweredByDiv>
                        <PoweredBy />
                    </PoweredByDiv>

                    <Index indexName="BlogPosts">
                        <TitleDiv>
                            <h3>Blog Posts</h3>
                            <Hits hitComponent={BlogPostHit} />
                        </TitleDiv>
                    </Index>
                    <Index indexName="Recipes">
                        <TitleDiv>
                            <h3>Recipes</h3>
                            <Hits hitComponent={RecipeHit} />
                        </TitleDiv>
                    </Index>

                </InstantSearch>
            </div>
        </section>
    )
}

export default SearchPage

export const Head = () => (
    <SEO title="Search" />
)