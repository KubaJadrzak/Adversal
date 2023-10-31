import React from "react"
import {Box, Container, Typography, Button} from '@mui/material'

import "./ProductsListElement.css"

function ProductsListElement(product) {


    if (!product || product.length === 0) return (
        <div></div>
    )

    return (
        <Container>
            <Box className='product-header'>
                <Typography variant='h6'>{product.title}</Typography>
                <Typography>${product.price}</Typography>
            </Box>
            <Typography className='product-description'>{product.description}</Typography>
        </Container>
    )
}

export default ProductsListElement