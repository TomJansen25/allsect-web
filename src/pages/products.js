import React, { useState, useCallback } from "react"
import { graphql } from "gatsby"

import Seo from "../components/layout/seo"
import ProductHeader from "../components/product/productHeader"
import ProductGrid from "../components/product/productGrid"

export const query = graphql`
    query Products {
        allProducts(
            sort: { producer: { name: ASC } },
            filter: { valid: { eq: true } }
        ) {
            edges {
                node {
                    name
                    producer {
                        name
                        website
                    }
                    localImage {
                        childImageSharp {
                            gatsbyImageData(
                                layout: CONSTRAINED
                                height: 300
                                placeholder: BLURRED
                            )
                        }
                    }
                    insect
                    type
                    imageUrl
                    reviewUrl {
                        en
                    }
                    recommended
                }
            }
        }
        allProducers(
            sort: { name: ASC },
            filter: { valid: { eq: true } }
        ) {
            nodes {
                name
            }
        }
        productTypes: allProducts(
            sort: { producer: { name: ASC } },
            filter: { valid: { eq: true } }
        ) {
            distinct(field: { type: SELECT } )
        }
    }
`

const ProductPage = ({ data }) => {
    const products = data.allProducts.edges
    const allProducers = data.allProducers.nodes.map((e) => e.name)
    const allProductTypes = data.productTypes.distinct
    const allInsects = ["buffaloworm", "cricket", "grasshopper", "mealworm"]

    const [producerState, setProducerState] = useState(allProducers)
    const wrapperSetProducerState = useCallback(
        (val) => {
            setProducerState(val)
        },
        [setProducerState]
    )

    const [insectState, setInsectState] = useState(allInsects)
    const wrapperSetInsectState = useCallback(
        (val) => {
            setInsectState(val)
        },
        [setInsectState]
    )

    const [productTypeState, setProductTypeState] = useState(allProductTypes)
    const wrapperSetProductTypeState = useCallback(
        (val) => {
            setProductTypeState(val)
        },
        [setProductTypeState]
    )

    const filterProducts = (product) => {
        return (
            producerState.includes(product.node.producer.name) &&
            insectState.includes(product.node.insect) &&
            productTypeState.includes(product.node.type)
        )
    }

    return (
        <section>
            <ProductHeader
                allProducers={allProducers}
                producerState={producerState}
                producerStateSetter={wrapperSetProducerState}
                allInsects={allInsects}
                insectState={insectState}
                insectStateSetter={wrapperSetInsectState}
                allProductTypes={allProductTypes}
                productTypeState={productTypeState}
                productTypeStateSetter={wrapperSetProductTypeState}
            />
            <ProductGrid products={products.filter(filterProducts)} />
        </section>
    )
}

export default ProductPage

export const Head = () => (
    <Seo
        title="Edible Insect Products"
        description="Looking for the best edible insect products? Find everything we have tried and recommend here in our products overview."
    />
)