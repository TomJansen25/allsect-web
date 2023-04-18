import React from "react"
import { PrismicRichText } from "@prismicio/react";
import { SmallHeader } from "../styled"
import { AddCircle, RemoveCircle } from "styled-icons/material-outlined";
import styled from "styled-components"
import { HeaderButton } from "../styled"

const ReferenceDiv = styled.div`
    font-size: 0.8rem;
    display: ${(props) => (props.show ? "flex" : "none")};
`

const References = ({ references }) => {
    const [show, setShow] = React.useState(false)

    const toggleShow = () => {
        setShow(!show)
    }

    return (
        <div>
            <SmallHeader>
                <HeaderButton
                    onClick={toggleShow}
                    startIcon={
                        show ? (
                            <HeaderButton as={RemoveCircle} />
                        ) : (
                            <HeaderButton as={AddCircle} />
                        )
                    }
                >
                    {show ? "Hide references" : "Show references"}
                </HeaderButton>
            </SmallHeader>
            <ReferenceDiv show={show}>
                <PrismicRichText field={references.richText || []} />
            </ReferenceDiv>
        </div>
    )
}

export default References
