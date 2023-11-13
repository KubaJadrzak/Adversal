import React from "react"
import {Box, Container, Typography, Button} from '@mui/material'

import "./ProductsListElement.css"

function ProductsListElement(product, navigate) {


    if (!product || product.length === 0) return (
        <div></div>
    )

    const handleAddToCart = (e) => {
        e.stopPropagation();
        navigate(`/cart`)
      }

    return (
        <Container className='product-container' onClick={() => {navigate(`/product/${product.id}`)}}>
            <Box className='product-header'>
                <Typography variant='h6'>{product.title}</Typography>
                <Typography>${product.price}</Typography>
            </Box>
            <Typography className='product-description'>{product.description}</Typography>
            {product.user &&
            <Box className='product-footer'>
                <Button variant='contained' onClick={handleAddToCart}>Add to cart</Button>
                <Box>
                    <Typography>{product.user.name}</Typography>
                </Box>
             </Box>
            }
        </Container>
    )
}

export default ProductsListElement