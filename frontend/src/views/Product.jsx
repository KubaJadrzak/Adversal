import React from "react"
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { fetchProduct } from "../api/productApi"
import {Container, Typography} from '@mui/material'

function Product() {
    const { id } = useParams()
    const [product, setProduct] = useState([])
    const [, setLoading] = useState(true)
    const [, setError] = useState(null)

    useEffect(() => {
      async function loadData(){
        try {
            const data = await fetchProduct(id)
            setProduct(data)
            setLoading(false)
        } catch (e) {
            setError(e)
            setLoading(false)
        }
      }
      loadData()
    }, [])

    if (!product || product.length === 0) return (
        <div></div>
    )

    return (
        <Container>
            <Typography>{product.title}</Typography>
            <Typography>price: {product.price}</Typography>
            <Typography>description: {product.description}</Typography>
            <Typography>category: {product.category.name}</Typography>
        </Container>
    )
}

export default Product