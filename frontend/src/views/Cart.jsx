import React from "react"
import useCart from "../api/useCart"
import ProductsListElement from "../components/ProductsListElement"
import { useNavigate } from "react-router-dom"
import {Box, Card} from '@mui/material'

function Cart() {
    const cart = useCart()
    const navigate = useNavigate()

    if (!cart || cart.length === 0) return (
        <div></div>
    )

    return (
        <Box className='products-container'>
            {cart.products.map((product) => (
                <Box key={product.id}>
                    <Card  className='product-container' onClick={() => {navigate(`/product/${product.id}`)}}>
                        {ProductsListElement(product)}
                    </Card>
                </Box>

            ))}
        </Box>
    )
}

export default Cart