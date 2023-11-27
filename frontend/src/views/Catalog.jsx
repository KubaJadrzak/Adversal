import React from "react"
import { useState, useEffect } from "react"
import { fetchUser } from "../api/userApi"
import ProductsListElement from "../components/ProductsListElement"
import { useNavigate } from "react-router-dom"
import {Box, Button} from '@mui/material'
import "./Catalog.css"

function Catalog() {
    const [user, setUser] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
      async function loadData(){
        try {
            const params = new URLSearchParams({
                with_listed_products: "true",
              })
            const data = await fetchUser(localStorage.getItem('id'), params)
            setUser(data)
        } catch (e) {
            console.error("Failed to load user: ", e)
        }
      }
      loadData()
    }, [])

    if (!user || user.length === 0) return (
        <div></div>
    )

    const onDeleteProduct = (id) => {
        const index = user.listed_products.findIndex(listed_product => {
            return listed_product.id === id
        })
        user.listed_products.splice(index, 1)
        setUser({...user})
    }


    return (
        <Box>
            <Box className='catalog-new-product-button'>
                <Button variant="contained" onClick={() => {navigate(`/product/add`)}} >Create new product</Button>
            </Box>
            <Box className='catalog-products-container'>
                {user.listed_products.map((listed_product) => (
                    <Box key={listed_product.id}>
                        <ProductsListElement product={listed_product} navigate={navigate} onDeleteProduct={onDeleteProduct}/>
                    </Box>

                ))}
            </Box>
        </Box>
    )
}

export default Catalog