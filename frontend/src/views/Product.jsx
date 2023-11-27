import React from "react"
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { fetchProduct } from "../api/productApi"
import {Container, Typography} from '@mui/material'

function Product() {
    const { id } = useParams()
    const [product, setProduct] = useState([])

    useEffect(() => {
      async function loadData(){
        try {
            const data = await fetchProduct(id)
            setProduct(data)
        } catch (e) {
            console.error("Failed to load: ", e)
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