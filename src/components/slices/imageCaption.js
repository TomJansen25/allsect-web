import React, { Fragment } from "react"
import parse, { domToReact } from "html-react-parser"
import styled from "styled-components"
import { brandColors } from "../../styles/brandColors"
import variables from "../../styles/variables";
const { asText } = require("@prismicio/richtext");

const ImageDiv = styled.div`
    margin-bottom: 2rem;
    display: flex;
    flex-direction: column;
`

const CopyrightTag = styled.div`
    float: right;
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 10;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    font-size: 0.6em;
    padding: 2px 7px;

    a {
        color: ${brandColors.lightgreen};

        &:hover {
            text-decoration: none;
            color: ${brandColors.green};
        }
    }
`

const ImgWrapper = styled.img`
    height: auto;
    max-height: 400px;
    object-fit: cover;
    width: 100%;
    margin: 0;
`

const ImageLabel = styled.figcaption`
    display: block;
    text-align: center;
    font-style: italic;
    font-size: 14px;
    color: ${brandColors.darkgrey};
`

const ImgDiv = styled.div`
    position: relative;
    display: flex;
`

const EmphasizedFigcaption = styled.figcaption`
    position: relative;
    @media screen and (min-width: ${variables.minWidthEmph}) {
        width: 130%;
        margin: 0 -15% 2rem -15%;
    }
`

const FullWidthImageDiv = styled(ImageDiv)`
    height: 400px;
    position: relative;
    font-weight: 400;
    background-color: white;
    background-size: cover;
    color: white;
    margin-bottom: 3rem;

    @media (max-width: ${variables.maxWidthSM}) {
        padding: 20px;
        height: 200px;
    }

    &::before {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.2);
    }
`

const FullWidthImageWrapper = styled.div`
    text-align: center;
    position: absolute;
    left: 50%;
    top: 50%;
    -ms-transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);

    @media (max-width: ${variables.maxWidthSM}) {
        width: 80%;
    }
`

const FullWidthImageLabel = styled.span`
    font-size: 40px;
    font-weight: 900;
    color: #white;

    @media (max-width: ${variables.maxWidthSM}) {
        font-size: 25px;
    }
`

const options = {
    replace: ({ attribs, children }) => {
        if (!attribs) return

        if (attribs.href) {
            return (
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={attribs.href}
                >
                    {domToReact(children, options)}
                </a>
            )
        }
    },
}

// Default Image
const DefaultImage = ({ slice }) => {
    return (
        <ImageDiv>
            <ImgDiv>
                {slice.primary.image.copyright ? (
                    <CopyrightTag>
                        {parse(slice.primary.image.copyright, options)}
                    </CopyrightTag>
                ) : null}
                <ImgWrapper
                    src={slice.primary.image.url}
                    alt={slice.primary.image.alt}
                />
            </ImgDiv>
            {slice.primary.caption ? (
                <ImageLabel>
                    {asText(slice.primary.caption.richText)}
                </ImageLabel>
            ) : null}
        </ImageDiv>
    )
}

// Emphasized Image
const EmphasizedImage = ({ slice }) => (
    <ImageDiv>
        <EmphasizedFigcaption>
            <ImgWrapper
                src={slice.primary.image.url}
                alt={slice.primary.image.alt}
            />
            {slice.primary.caption ? (
                <ImageLabel>
                    {asText(slice.primary.caption)}
                </ImageLabel>
            ) : null}
        </EmphasizedFigcaption>
    </ImageDiv>
)

// Full Width Image
const FullWidthImage = ({ slice }) => (
    <FullWidthImageDiv
        style={{ backgroundImage: "url(" + slice.primary.image.url + ")" }}
    >
        <FullWidthImageWrapper>
            {slice.primary.caption ? (
                <FullWidthImageLabel>
                    {asText(slice.primary.caption)}
                </FullWidthImageLabel>
            ) : null}
        </FullWidthImageWrapper>
    </FullWidthImageDiv>
)

// Function to determine the image type
const renderSwitch = function (slice) {
    switch (slice.slice_label) {
        case "image-full-width":
            return <FullWidthImage slice={slice} />
        case "emphasized":
            return <EmphasizedImage slice={slice} />
        default:
            return <DefaultImage slice={slice} />
    }
}

// Default Image
export const MainImage = ({ image, caption }) => {
    let imageCaption = ""
    if (caption) {
        imageCaption = caption.richText
    }
    if (image.caption) {
        imageCaption = image.caption.richText
    }
    return (
        <ImageDiv>
            <ImgDiv>
                {image.copyright ? (
                    <CopyrightTag>
                        {parse(image.copyright, options)}
                    </CopyrightTag>
                ) : null}
                <ImgWrapper src={image.url} alt={image.alt} />
            </ImgDiv>
            {imageCaption !== "" ? (
                <ImageLabel>
                    {asText(imageCaption)}
                </ImageLabel>
            ) : null}
        </ImageDiv>
    )
}

export const ImageCaption = ({ slice }) => {
    return <Fragment>{renderSwitch(slice)}</Fragment>
}
