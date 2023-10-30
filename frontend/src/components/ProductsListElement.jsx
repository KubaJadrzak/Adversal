import React from "react"
import {Container, Typography} from '@mui/material'

function ProductsListElement(product) {

    if (!product || product.length === 0) return (
        <div></div>
    )

    return (
        <Container>
            <Typography>{product.title}</Typography>
            <Typography>price: {product.price}</Typography>
            <Typography>description: {product.description}</Typography>
            <Typography>category: {product.category.name}</Typography>
        </Container>
    )
}

export default ProductsListElement