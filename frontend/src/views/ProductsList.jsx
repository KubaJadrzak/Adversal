import React, { useEffect, useState } from "react"
import { fetchAllProducts } from "../api/productApi"
import ProductsListElement from "../components/ProductsListElement"
import { useNavigate } from "react-router-dom"
import { Box } from '@mui/material'
import "./ProductsList.css"

function ProductsList() {
    const [products, setProducts] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
      async function loadData(){
        try {
            const params = new URLSearchParams({
                with_seller: "true",
            })
            const data = await fetchAllProducts(params)
            setProducts(data)
        } catch (e) {
            console.error("Failed to load products: ", e)
        }
      }
      loadData()
    }, [])

    const onAddToCart = (id) => {
        const index = products.findIndex(product => {
            return product.id === id
        })
        products.splice(index, 1)
        setProducts([...products])
    }

    return (
        <Box className='products-list-container'>
            {products.map((product) => (
                <Box key={product.id}>
                    <ProductsListElement product={product} navigate={navigate} onAddToCart={onAddToCart}/>
                </Box>

            ))}
        </Box>
    )
}

export default ProductsList