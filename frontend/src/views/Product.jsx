import React from "react"
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { fetchProduct } from "../api/productApi"
import {Container, Typography, Card, Box, ImageList, ImageListItem} from '@mui/material'
import './Product.css'

function Product() {
    const { id } = useParams()
    const [product, setProduct] = useState([])

    useEffect(() => {
      async function loadData(){
        try {
            const params = new URLSearchParams({
                with_seller: "true",
            })
            const data = await fetchProduct(id, params)
            setProduct(data)
        } catch (e) {
            console.error("Failed to load product: ", e)
        }
      }
      loadData()
    }, [])

    if (!product || product.length === 0) return (
        <div></div>
    )

    return (
        <Container className="product-container">
            <Card className="product-card">
                <Typography variant='h4' className="product-title">{product.title}</Typography>
                <Container className='product-price-seller'>
                    <Typography variant='h6' className="product-price">${product.price}</Typography>
                    <Typography variant='h6' className='product-seller'>{product.seller.name}</Typography>
                </Container>
                <Box className="product-image-container">
                    {product.images ?
                        <ImageList cols={2} className="product-image-list">
                            {product.images.map((image, index) => (
                                <ImageListItem key={index} className='product-image'>
                                    <img
                                    src={"http://localhost:3000" + image}
                                    loading="lazy"
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>:
                        <Box>
                            <Typography variant='overline'>no image available</Typography>
                        </Box>

                    }
                </Box>
                <Typography className="product-description">{product.description}</Typography>
            </Card>
        </Container>
    )
}

export default Product