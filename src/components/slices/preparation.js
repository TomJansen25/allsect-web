import React from "react"
import { PrismicRichText } from "@prismicio/react";
import { SmallHeader } from "../styled";

const Preparation = ({ prep }) => (
    <div>
        <SmallHeader>PREPARATION</SmallHeader>
        <div>
            <PrismicRichText field={prep.richText || []} />
        </div>
    </div>
)

export default Preparation
