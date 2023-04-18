import React from "react"
import { PrismicRichText } from "@prismicio/react"
import { Button, Chip } from "@mui/material"
import { Timer, People } from "styled-icons/material"
import styled from "styled-components"

import {
    UnstyledGatsbyLink,
    CardItem,
    GeneralCard,
    CardContentWrapper,
    CardTitle,
    CardMediaWrapper,
    CardRead,
    CardShadow,
} from "../styled"
import { brandColors } from "../../styles/brandColors"
import variables from "../../styles/variables"

const RecipeCardWrapper = styled(GeneralCard)`
    transition: transform 0.25s ease-in-out;
    &:hover {
        transform: scale(1.1);
    }
`

const ChipWrapper = styled(Chip)`
    padding: 5px;
    color: ${brandColors.green};
    border-color: ${brandColors.green};

    svg {
        color: ${brandColors.green};
    }

    &.first-left {
        @media (max-width: 1350px) {
            margin-bottom: 5px;
        }
    }

    &.first-right {
        margin-left: auto;
        margin-right: 0px;

        @media (max-width: 1350px) {
            margin-bottom: 5px;
        }
    }

    &.second-right {
        margin-right: 0;

        @media (max-width: ${variables.muiSMwidth}) {
            margin-left: auto;
        }
    }
`

const ChipRow = styled.div`
    margin: 0px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: ${(props) => (props.view === "grid" ? "column" : "row")};

    ${ChipWrapper}.first-left,
    ${ChipWrapper}.second-left {
        margin-right: ${(props) => (props.view === "grid" ? "auto" : "10px")};
    }
    ${ChipWrapper}.second-right {
        margin-left: ${(props) => (props.view === "grid" ? "auto" : "10px")};
    }
`

// https://codepen.io/travisw/pen/mOeLpP
const RecipeCard = ({ recipe, i, view }) => {
    let direction = ""
    let mediaReadDirection = ""

    if (i % 2 === 0) {
        direction = "left"
        mediaReadDirection = "right"
    } else {
        direction = "right"
        mediaReadDirection = "left"
    }

    return (
        <CardItem className={direction}>
            <RecipeCardWrapper>
                <UnstyledGatsbyLink to={recipe.url}>
                    <CardContentWrapper className={direction}>
                        <CardTitle view={view}>
                            <PrismicRichText
                                field={recipe.data.title.richText}
                                components={{ heading2: ({ children }) => <span>{children}</span>, }}
                            />
                        </CardTitle>
                        <span>
                            <PrismicRichText field={recipe.data.subtitle.richText} />
                        </span>
                        <CardRead className={mediaReadDirection}>
                            <Button className={"card-read-button"}>
                                Get recipe!
                            </Button>
                        </CardRead>
                        <ChipRow view={view}>
                            <ChipWrapper
                                className={"first-" + direction}
                                size="small"
                                variant="outlined"
                                icon={<Timer />}
                                label={recipe.data.prep_time + " min"}
                            />
                            <ChipWrapper
                                className={"second-" + direction}
                                size="small"
                                variant="outlined"
                                icon={<People />}
                                label={recipe.data.servings + " servings"}
                            />
                        </ChipRow>
                    </CardContentWrapper>
                    <CardMediaWrapper
                        src={recipe.data.main_image.thumbnails.thumbnail.url}
                        alt={recipe.data.main_image.thumbnails.thumbnail.alt}
                        className={mediaReadDirection}
                    />
                </UnstyledGatsbyLink>
            </RecipeCardWrapper>
            <CardShadow />
        </CardItem>
    )
}

export default RecipeCard
