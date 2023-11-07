import React from "react"
import { useState, useEffect } from "react"
import { fetchUser } from "../api/userApi"
import ProductsListElement from "../components/ProductsListElement"
import { useNavigate } from "react-router-dom"
import {Box, Card} from '@mui/material'

function Catalog() {
    const [user, setUser] = useState([])
    const [, setLoading] = useState(true)
    const [, setError] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
      async function loadData(){
        try {
            const data = await fetchUser(1)
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