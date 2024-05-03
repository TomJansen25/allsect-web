import React, { useState } from "react"
import { graphql } from "gatsby"
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from "@mui/material";
import NewsMasonryGrid from "../components/news/newsMasonryGrid";
import Seo from "../components/layout/seo";

import { ReadMoreWrapper } from "../components/styled"

export const query = graphql`
    query {
        allNewsArticles(sort: {publishedAt: DESC}) {
            edges {
                node {
                    id
                    authors
                    description
                    publishedAt(formatString: "DD MMM. YYYY")
                    source
                    title
                    url
                    imageUrl
                }
            }
        }
    }
`

const NewsPage = ({ data }) => {
    const allNewsArticles = data.allNewsArticles.edges

    const [open, setOpen] = useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <section>
            <main>
                <ReadMoreWrapper style={{ marginBottom: "15px" }}>
                    <Button onClick={handleClickOpen}>News disclaimer</Button>
                </ReadMoreWrapper>
                <NewsMasonryGrid newsArticles={allNewsArticles} />
            </main>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle id="alert-dialog-title">
                    News articles disclaimer
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Unfortunately, copyright, GDPR and whatnot other
                        regulation (that we fully support btw!) does not allow
                        us to simply show full news articles here for you to
                        read. Therefore, we make sure we scrape the entire web
                        for the latest interesting and relevant news articles
                        and developments and aggregate them here so you don't
                        need to do that yourself - you're welcome! You can get a
                        sneak peek into all the articles on our website but if
                        you really want to read all we can do is redirect you to
                        the original source of the news article. Just make sure
                        you come back to our website after reading it
                        <span
                            role="img"
                            aria-label="happy-emoji"
                            style={{ color: "black" }}
                        >
                            &#128521;
                        </span>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Got it!</Button>
                </DialogActions>
            </Dialog>
        </section>
    )
}

export default NewsPage

export const Head = () => (
    <Seo
        title="The latest ento and edible insect news"
        description="All the latest news regarding edible insects and entomophagy collected in one place."
    />
)