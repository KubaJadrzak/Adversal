import React from "react"
import {Box, Card, Typography, Button} from '@mui/material'

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

        const response = await fetch('http://localhost:3000/api/v1/cart_products', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

        if (response.ok) {
            navigate(`/cart`)
        } else {
            console.log("An error occurred.")
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