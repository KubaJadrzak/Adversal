import React from "react"
import {Box, Card, Typography, Button} from '@mui/material'

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
        <Card className='product-list-element-container' onClick={() => {navigate(`/product/${product.id}`)}}>
            <Box className='product-list-element-header'>
                <Typography variant='h6'>{product.title}</Typography>
                <Typography>${product.price}</Typography>
            </Box>
            <Typography className='product-list-element-description'>{product.description}</Typography>
            {product.seller &&
            <Box className='product-list-element-footer'>
                <Button variant='contained' onClick={handleAddToCart}>Add to cart</Button>
                <Box>
                    <Typography>{product.seller.name}</Typography>
                </Box>
             </Box>
            }
        </Card>
    )
}

export default ProductsListElement