import React, { useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
// import { useStaticQuery, graphql } from "gatsby";

import { InputDiv, FilterHeader, AutocompleteWrapper } from "../styled"

const insects = [
    { label: "Buffaloworm", value: "buffaloworm" },
    { label: "Cricket", value: "cricket" },
    { label: "Grasshopper", value: "grasshopper" },
    { label: "Mealworm", value: "mealworm" },
]

const ProductHeader = ({
    allProducers,
    producerStateSetter,
    allInsects,
    insectStateSetter,
    allProductTypes,
    productTypeStateSetter,
}) => {
    const [insect, setInsect] = useState(allInsects)
    const [producer, setProducer] = useState(allProducers)
    const [productType, setProductType] = useState(allProductTypes)

    const producers = []
    allProducers.forEach((e) => {
        producers.push({ label: e, value: e })
    })

    const productTypes = []
    allProductTypes.forEach((e) => {
        const name = e[0].toUpperCase() + e.slice(1)
        productTypes.push({ label: name, value: e })
    })

    useEffect(() => {
        insectStateSetter(insect)
    }, [insectStateSetter, insect])

    useEffect(() => {
        producerStateSetter(producer)
    }, [producerStateSetter, producer])

    useEffect(() => {
        productTypeStateSetter(productType)
    }, [productTypeStateSetter, productType])

    const updateInsect = (i) => {
        if (i.length > 0) {
            setInsect(i.map((e) => e.value))
        } else {
            setInsect(allInsects)
        }
    }

    const updateProducer = (p) => {
        if (p.length > 0) {
            setProducer(p.map((e) => e.value))
        } else {
            setProducer(allProducers)
        }
    }

    const updateProductType = (p) => {
        if (p.length > 0) {
            setProductType(p.map((e) => e.value))
        } else {
            setProductType(allProductTypes)
        }
    }

    return (
        <FilterHeader view="grid">
            <InputDiv>
                <AutocompleteWrapper>
                    <Autocomplete
                        multiple
                        size="small"
                        options={producers}
                        getOptionLabel={(option) => option.label}
                        getOptionSelected={(option, value) => option.value === value.value}
                        id="product-producer"
                        onChange={(e, value) => updateProducer(value)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Producer"
                                variant="standard"
                            />
                        )}
                    />
                </AutocompleteWrapper>
                <AutocompleteWrapper>
                    <Autocomplete
                        multiple
                        size="small"
                        options={insects}
                        getOptionLabel={(option) => option.label}
                        getOptionSelected={(option, value) => option.value === value.value}
                        id="product-insect"
                        onChange={(e, value) => updateInsect(value)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Insect of choice"
                                variant="standard"
                            />
                        )}
                    />
                </AutocompleteWrapper>
                <AutocompleteWrapper>
                    <Autocomplete
                        multiple
                        size="small"
                        options={productTypes}
                        getOptionLabel={(option) => option.label}
                        getOptionSelected={(option, value) => option.value === value.value}
                        id="product-type"
                        onChange={(e, value) => updateProductType(value)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Product type"
                                variant="standard"
                            />
                        )}
                    />
                </AutocompleteWrapper>
            </InputDiv>
        </FilterHeader>
    )
}

export default ProductHeader
