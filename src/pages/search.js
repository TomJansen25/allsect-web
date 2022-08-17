import React from "react"
import { useQueryParam, StringParam } from "use-query-params"
import styled from "styled-components"

import SEO from "../components/layout/seo"
import SearchApp from "../components/search/search"
import { SearchPageBox } from "../components/search/searchPageBox"
import { PoweredBy } from "../components/search/poweredByAlgolia"

const PoweredByDiv = styled.div`
    text-align: center;
    margin-bottom: 20px;
`

const SearchPage = () => {
    // const [query, setQuery] = useQueryParam("q", StringParam)
    const query = useQueryParam("q", StringParam)[0]

    return (
        <section>
            <SEO title="Search" />
            <div>
                <div style={{ textAlign: "center" }}>
                    <h5>Showing results for:</h5>
                    <h3>
                        <q>{query}</q>
                    </h3>
                </div>
                <SearchPageBox />
                <PoweredByDiv>
                    <PoweredBy />
                </PoweredByDiv>
                <SearchApp query={query} />
            </div>
        </section>
    )
}

export default SearchPage
