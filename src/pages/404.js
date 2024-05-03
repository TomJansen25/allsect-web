import React from "react"
import Seo from "../components/layout/seo"

const NotFoundPage = () => (
    <section>
        <h1>NOT FOUND</h1>
        <p>You just hit a route that doesn&#39;t exist...</p>
    </section>
)

export default NotFoundPage

export const Head = () => (<Seo title="404: Not found" />)