import React from "react"
import useUser from "../api/useUser"
import ProductsListElement from "../components/ProductsListElement"
import { useNavigate } from "react-router-dom"
import {Box, Card} from '@mui/material'

function Catalog() {
    const user = useUser()
    const navigate = useNavigate()

    if (!user || user.length === 0) return (
        <div></div>
    )

    return (
        <Box className='products-container'>
            {user.products.map((product) => (
                <Box key={product.id}>
                    <Card  className='product-container' onClick={() => {navigate(`/product/${product.id}`)}}>
                        {ProductsListElement(product)}
                    </Card>
                </Box>

            ))}
        </Box>
    )
}

export default Catalog