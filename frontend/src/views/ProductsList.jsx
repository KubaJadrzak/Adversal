import React, { useEffect, useState } from "react"
import { fetchAllProducts } from "../api/productApi"
import ProductsListElement from "../components/ProductsListElement"
import { useNavigate } from "react-router-dom"
import {Box, Card, Button} from '@mui/material'
import "./ProductsList.css"

function ProductsList() {
    const [products, setProducts] = useState([])
    const [, setLoading] = useState(true)
    const [, setError] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
      async function loadData(){
        try {
            const params = new URLSearchParams({
                with_user: "true",
            })
            const data = await fetchAllProducts(params)
            setProducts(data)
            setLoading(false)
        } catch (e) {
            setError(e)
            setLoading(false)
        }
      }
      loadData()
    }, [])

    return (
        <Box className='products-container'>
            {products.map((product) => (
                <Box key={product.id}>
                    <Card  className='product-container' onClick={() => {navigate(`/product/${product.id}`)}}>
                        {ProductsListElement(product)}
                    </Card>
                    <Button variant='contained' className='product-button' onClick={() => {navigate(`/cart`)}}>Add to cart</Button>
                </Box>

            ))}
        </Box>
    )
}

export default ProductsList