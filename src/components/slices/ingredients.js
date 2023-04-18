import React from "react"
import { PrismicRichText } from "@prismicio/react"
import { SmallHeader } from "../styled"

const Ingredients = ({ ingredients }) => (
    <div>
        <SmallHeader>INGREDIENTS</SmallHeader>
        <div>
            <PrismicRichText field={ingredients.richText || []} />
        </div>
    </div>
)

export default Ingredients
