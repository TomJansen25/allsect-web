import React from "react"
import { Highlight, Snippet } from "react-instantsearch-hooks-web"
import { Link } from "gatsby"
import { Paper } from "@mui/material"
import styled from "styled-components"
import { brandColors } from "../../styles/brandColors"
import variables from "../../styles/variables"

const HitImageDiv = styled.div`
    display: flex;
`

const HitImage = styled.img`
    position: absolute;
    width: 25%;
    height: calc(100% - 40px);
    object-fit: cover;
    margin: auto;
`

const HitPaper = styled(Paper)`
    display: flex;
    margin-bottom: 20px;
    text-decoration: none;
    padding: 20px;
    border-radius: 0px;
    position: relative;
    color: initial;
    &:hover {
        text-decoration: none;
        color: initial;
    },
`

const HitSnippet = styled.div`
    font-size: 0.8em;
`

const HitTitle = styled(Highlight)`
    font-weight: 600;
`

const HitSubtitle = styled(Highlight)`
    font-weight: 500;
    color: ${brandColors.darkgrey};
    display: block;
    margin-bottom: 10px;
`

const HitTextDiv = styled.div`
    @media (max-width: ${variables.muiMDwidth}) {
        margin-left: calc(30% + 10px);

        ${HitTitle} {
            font-size: 1.1em;
        }
        ${HitSubtitle} {
            font-size: 0.9em;
        }
    }
    @media (min-width: ${variables.muiMDwidth}) {
        margin-left: 30%;

        ${HitTitle} {
            font-size: 1.25em;
        }
        ${HitSubtitle} {
            font-size: 1em;
        }
    }
`

export const NewsHit = ({ hit }) => {

    const clickHandler = () => {
        console.log("clicked")
    }

    return (
        <div>
            <a href={hit.objectID} onClick={clickHandler}>
                <h4>
                    <Highlight attribute="title" hit={hit} tagName="mark" />
                </h4>
            </a>
            <div>
                <p>{hit.description}</p>
            </div>
            <Snippet attribute="excerpt" hit={hit} tagName="mark" />
        </div>
    )
}

export const BlogPostHit = ({ hit }) => (
    <HitPaper
        elevation={2}
        key={hit.uid}
        component={Link}
        to={"/blog/" + hit.uid}
        className="search-hit"
    >
        <HitImageDiv>
            <HitImage
                src={hit.main_image.thumbnail.url}
                alt={hit.main_image.thumbnail.alt}
            />
        </HitImageDiv>
        <HitTextDiv>
            <HitTitle
                attribute="title"
                hit={hit}
                tagName="mark"
            />
            <HitSubtitle
                attribute="subtitle"
                hit={hit}
                tagName="mark"
            />
            <HitSnippet>
                <span>...</span>
                <Snippet
                    attribute="text"
                    hit={hit}
                    tagName="mark"
                />
                <span>...</span>
            </HitSnippet>
        </HitTextDiv>
    </HitPaper>
)

export const RecipeHit = ({ hit }) => (
    <HitPaper
        elevation={2}
        key={hit.uid}
        component={Link}
        to={"/recipe/" + hit.uid}
        className="search-hit"
    >
        <HitImageDiv>
            <HitImage
                src={hit.main_image.thumbnail.url}
                alt={hit.main_image.thumbnail.alt}
            />
        </HitImageDiv>
        <HitTextDiv>
            <HitTitle attribute="title" hit={hit} tagName="mark" />
            <HitSubtitle
                attribute="subtitle"
                hit={hit}
                tagName="mark"
            />
            <HitSnippet>
                <span>...</span>
                <Snippet
                    attribute="text"
                    hit={hit}
                    tagName="mark"
                />
                <span>...</span>
            </HitSnippet>
        </HitTextDiv>
    </HitPaper>
)
