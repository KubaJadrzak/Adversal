import React from "react"
import {Box, Container, Typography} from '@mui/material'

import "./ProductsListElement.css"

function ProductsListElement(product) {


    if (!product || product.length === 0) return (
        <div></div>
    )

    return (
        <Container className='product-conteiner'>
            <Box className='product-header'>
                <Typography variant='h6'>{product.title}</Typography>
                <Typography>${product.price}</Typography>
            </Box>
            <Typography className='product-description'>{product.description}</Typography>
            {product.user &&
            <Box className='product-user'>
                <Typography>{product.user.name}</Typography>
            </Box>
            }
        </Container>
    )
}

export default ProductsListElement