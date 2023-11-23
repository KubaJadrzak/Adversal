import React from "react"
import {Box, Card, Typography, Button} from '@mui/material'
import { createCartProduct } from "../api/cartProductApi"

import "./ProductsListElement.css"

function ProductsListElement(product, navigate) {


    if (!product || product.length === 0) return (
        <div></div>
    )

    const handleAddToCart = async (e) => {
        e.stopPropagation()
        e.preventDefault()
        const carted_product_id = product.id
        const data = { carted_product_id }
        try {
            const response = await createCartProduct(data)
            navigate(`/cart`)
        } catch (e) {
            console.error("Failed to create a post: ", e)
        }
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