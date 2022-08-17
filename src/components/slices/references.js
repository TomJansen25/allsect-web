import React from "react"
import { RichText } from "prismic-reactjs"
import { SmallHeader } from "../styled"
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline"
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline"
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
                            <HeaderButton as={RemoveCircleOutlineIcon} />
                        ) : (
                            <HeaderButton as={AddCircleOutlineIcon} />
                        )
                    }
                >
                    {show ? "Hide references" : "Show references"}
                </HeaderButton>
            </SmallHeader>
            <ReferenceDiv show={show}>
                <RichText render={references.richText || []} />
            </ReferenceDiv>
        </div>
    )
}

export default References
