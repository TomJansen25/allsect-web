import React from "react"
import { RichText } from "prismic-reactjs"
import { SmallHeader } from "../styled"

const Preparation = ({ prep }) => (
    <div>
        <SmallHeader>PREPARATION</SmallHeader>
        <div>
            <RichText render={prep.richText || []} />
        </div>
    </div>
)

export default Preparation
