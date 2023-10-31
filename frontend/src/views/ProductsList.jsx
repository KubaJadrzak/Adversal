import React from "react"
import useProducts from "../api/useProducts"
import ProductsListElement from "../components/ProductsListElement"
import { useNavigate } from "react-router-dom"
import {Box, Card, Button} from '@mui/material'
import "./ProductsList.css"

function ProductsList() {
    const products = useProducts()
    const navigate = useNavigate()

    if (!products || products.length === 0) return (
        <div></div>
    )

    return (
        <Box className='products-container'>
            {products.map((product) => (
                <Box key={product.id}>
                    <Card  className='product-container' onClick={() => {navigate(`/product/${product.id}`)}}>
                        {ProductsListElement(product)}
                    </Card>
                    <Button variant='contained' className='product-button' onClick={() => {navigate(`/cart`)}}>Add to card</Button>
                </Box>

            ))}
        </Box>
    )
}

export default ProductsList