import React from "react"
import { RichText } from "prismic-reactjs"
import { SmallHeader } from "../styled"

const Ingredients = ({ ingredients }) => (
    <div>
        <SmallHeader>INGREDIENTS</SmallHeader>
        <div>
            <RichText render={ingredients.richText || []} />
        </div>
    </div>
)

export default Ingredients
