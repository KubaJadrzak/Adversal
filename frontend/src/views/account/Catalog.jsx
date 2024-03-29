import React from "react"
import { useState, useEffect } from "react"
import { fetchAllProducts } from "../../api/productApi"
import ProductsElement from "../../components/ProductsElement"
import { useNavigate } from "react-router-dom"
import {Box, Button} from '@mui/material'
import "./Catalog.css"

function Catalog() {
    const [products, setProducts] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
      async function loadData(){
        try {
            const params = new URLSearchParams({
                only_listed_products: "true",
                with_ordered_products: "true",
              })
            const data = await fetchAllProducts(params)
            setProducts(data)
        } catch (e) {
            console.error("Failed to load product: ", e)
        }
      }
      loadData()
    }, [])

    if (!products) return (
        <div></div>
    )

    const onDeleteProduct = (id) => {

        const updatedProducts = products.filter((product) => product.id !== id);
        setProducts(updatedProducts);

      }


    return (
        <Box>
            <Box className='catalog-sidebar'>
            </Box>
            <Box className='catalog-new-product-button'>
                <Button variant="contained" onClick={() => {navigate(`/product/add`)}} >Create new product</Button>
            </Box>
            <Box className='catalog-products-container'>
                {products.length > 0 &&
                    products.map((product) => (
                    <Box key={product.id}>
                        <ProductsElement product={product} navigate={navigate} onDeleteProduct={onDeleteProduct}/>
                    </Box>
                    ))
                    }
            </Box>
        </Box>
    )
}

export default Catalog