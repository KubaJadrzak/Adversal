import React from "react"
import { useState, useEffect } from "react"
import { fetchUser } from "../api/userApi"
import ProductsListElement from "../components/ProductsListElement"
import { useNavigate } from "react-router-dom"
import {Box, Button} from '@mui/material'
import "./Catalog.css"

function Catalog() {
    const [user, setUser] = useState([])
    const [, setLoading] = useState(true)
    const [, setError] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
      async function loadData(){
        try {
            const params = new URLSearchParams({
                with_listed_products: "true",
              })
            const data = await fetchUser(localStorage.getItem('id'), params)
            setUser(data)
            setLoading(false)
        } catch (e) {
            setError(e)
            setLoading(false)
        }
      }
      loadData()
    }, [])

    if (!user || user.length === 0) return (
        <div></div>
    )

    return (
        <Box>
            <Box className='catalog-new-product-button'>
                <Button variant="contained" onClick={() => {navigate(`/newproduct`)}} >Create new product</Button>
            </Box>
            <Box className='catalog-products-container'>
                {user.listed_products.map((listed_product) => (
                    <Box key={listed_product.id}>
                        <ProductsListElement product={listed_product} navigate={navigate}/>
                    </Box>

                ))}
            </Box>
        </Box>
    )
}

export default Catalog