import React, { useState, useCallback, useEffect } from "react";
import { Avatar, Grid, Dialog, DialogTitle } from "@mui/material";
import { GatsbyImage } from "gatsby-plugin-image"
import styled from "styled-components"
import { ThumbsUp } from "styled-icons/entypo"

import { UnstyledGatsbyLink } from "../styled"
import { brandColors } from "../../styles/brandColors"

const GridItemWrapper = styled(Grid)`
    padding: 10px 15px;
    margin-bottom: 15px;
`

const RecommendAvatar = styled(Avatar)`
    font-size: 0.85rem;
    text-align: center;
    background-color: ${brandColors.green};
    width: 30px;
    height: 30px;
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 2px;
    transition: all 1s ease-in-out;

    svg {
        width: 1rem;
        height: 1rem;
    }
`

const ReviewAvatar = styled(Avatar)`
    bottom: 10px;
    left: 10px;
    width: 130px;
    height: 35px;
    border: ${brandColors.green} 2px solid;
    background-color: rgba(255, 255, 255, 0.6);
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.85rem;
    color: ${brandColors.darkgreen};

    &:hover {
        border: ${brandColors.darkgreen} 2px solid;
    }
`

const AllsectRecommends = styled.div`
    visibility: hidden;
    height: 30px;
    position: absolute;
    vertical-align: middle;
    display: flex;
    background-color: ${brandColors.green};
    width: 170px;
    top: 10px;
    right: -140px;
    padding: 0px 15px;
    border-radius: 15px 0px 0px 15px;
    transition: right 2s ease;
    z-index: 10;

    span {
        margin: auto;
        font-size: 0.75rem;
        color: white;
    }

    svg {
        color: white;
        margin-top: 5px;
        width: 1rem;
        height: 1rem;
    }
`

const ImageDiv = styled.div`
    padding: 25px 40px;
    position: relative;
    cursor: pointer;
    display: grid;
    background-color: ${(props) =>
        props.imageType === "png" ? brandColors.ultralightgrey : "white"};
    margin-bottom: 5px;
    overflow: hidden;

    &:hover {
        ${RecommendAvatar} {
            display: none;
        }
        ${AllsectRecommends} {
            visibility: visible;
            right: 0px;
        }
    }
`

const TextDiv = styled.div`
    padding: 5px;
`

const ProductBrand = styled.a`
    font-size: 0.9rem;
    font-weight: 500;
    margin: 10px 0 0 0;
    text-decoration: none;
    cursor: pointer;
    color: ${brandColors.green};
    &:hover {
        color: ${brandColors.darkgreen};
    }
`

const ProductTitle = styled.p`
    margin-top: 5px;
    margin-bottom: 0px;
    font-size: 1rem;
`

const DialogWrapper = styled(Dialog)`
    .MuiDialog-paper {
        max-height: 70vh;
        max-width: 80vw;
        // min-width: 450px;
        width: ${(props) => `calc((70vh - 100px) * ${props.width})`};
        padding: 0px 15px 25px 15px;
    }

    ${ProductBrand} {
        font-size: 1.2rem;
    }
    ${ProductTitle} {
        font-size: 1.3rem;
    }
`

const ProductGrid = ({ products }) => {
    const [latestProductIndex, setLatestProductIndex] = useState(6)
    const [isBottom, setIsBottom] = useState(false)
    const [open, setOpen] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState("")
    const maxIndex = products.length

    const handleClickOpen = (product) => {
        setSelectedProduct(product.node)
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    function handleScroll() {
        const scrollTop =
            (document.documentElement && document.documentElement.scrollTop) ||
            document.body.scrollTop
        const scrollHeight =
            (document.documentElement &&
                document.documentElement.scrollHeight) ||
            document.body.scrollHeight
        if (scrollTop + window.innerHeight + 150 >= scrollHeight) {
            setIsBottom(true)
        }
    }

    const loadMore = useCallback(() => {
        setLatestProductIndex(latestProductIndex + 6)
        setIsBottom(false)
    }, [latestProductIndex])

    useEffect(() => {
        if (isBottom && maxIndex >= latestProductIndex) {
            loadMore()
        }
    }, [isBottom, loadMore, maxIndex, latestProductIndex])

    useEffect(() => {
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    })

    return (
        <Grid container>
            {selectedProduct && (
                <DialogWrapper
                    open={open}
                    onClose={handleClose}
                    width={
                        selectedProduct.localImage.childImageSharp
                            .gatsbyImageData.width /
                        selectedProduct.localImage.childImageSharp
                            .gatsbyImageData.height
                    }
                    aria-labelledby="dialog-title"
                    aria-describedby="dialog-description"
                >
                    <DialogTitle id="dialog-title">
                        <ProductBrand href={selectedProduct.producer.website}>
                            {selectedProduct.producer.name}
                        </ProductBrand>
                        <ProductTitle>{selectedProduct.name}</ProductTitle>
                    </DialogTitle>
                    <img
                        src={selectedProduct.imageUrl}
                        alt={selectedProduct.name}
                        width="100%"
                    />
                </DialogWrapper>
            )}
            {products.length === 0 && (
                <div>Oops, no results could be found for your selection...</div>
            )}
            {products.slice(0, latestProductIndex).map((product, index) => {
                const image =
                    product.node.localImage.childImageSharp.gatsbyImageData
                const aspectRatio = image.width / image.height
                let objectFit = ""
                if (aspectRatio < 1.01 || aspectRatio > 2) {
                    objectFit = "scale-down"
                } else {
                    objectFit = "cover"
                }
                const imageType = image.images.fallback.src.split(".").pop()

                return (
                    <GridItemWrapper item md={4} sm={6} xs={12} key={index}>
                        <ImageDiv
                            imageType={imageType}
                            onClick={() => handleClickOpen(product)}
                        >
                            {!!product.node.recommended && (
                                <>
                                    <RecommendAvatar alt="Allsect recommends">
                                        <ThumbsUp />
                                    </RecommendAvatar>
                                    <AllsectRecommends>
                                        <span>Allsect recommends!</span>{" "}
                                        <ThumbsUp />
                                    </AllsectRecommends>
                                </>
                            )}
                            <GatsbyImage
                                image={
                                    product.node.localImage.childImageSharp
                                        .gatsbyImageData
                                }
                                alt={product.node.name}
                                placeholder="blurred"
                                style={{ height: 250 }}
                                imgStyle={{ objectFit: objectFit }}
                            />
                            {!!product.node.reviewUrl.en && (
                                <ReviewAvatar
                                    variant="square"
                                    alt="Review"
                                    as={UnstyledGatsbyLink}
                                    to={product.node.reviewUrl.en}
                                >
                                    Read our review
                                </ReviewAvatar>
                            )}
                        </ImageDiv>
                        <TextDiv>
                            <ProductTitle>{product.node.name}</ProductTitle>
                            <ProductBrand href={product.node.producer.website}>
                                {product.node.producer.name}
                            </ProductBrand>
                        </TextDiv>
                    </GridItemWrapper>
                )
            })}
        </Grid>
    )
}

export default ProductGrid
