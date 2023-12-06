import React from "react"
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { fetchProduct } from "../api/productApi"
import { createCartProduct } from "../api/cartProductApi";
import {Container, Typography, Card, Box, ImageList, ImageListItem, Button} from '@mui/material'
import './Product.css'

function Product() {
    const { id } = useParams()
    const [product, setProduct] = useState([])
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
      async function loadData(){
        try {
            const data = await fetchProduct(id)
            setProduct(data)
        } catch (e) {
            console.error("Failed to load product: ", e)
        }
      }
      loadData()
    }, [id])

    const handleAddToCart = async (e) => {
        const carted_product_id = product.id
        const data = { carted_product_id }
        try {
            await createCartProduct(data)
            navigate('/cart')
        } catch (e) {
            console.error("Failed to create a post: ", e)
        }
    }

    const isFromCart = location.pathname.includes('/cart')
    const isFromCatalog = location.pathname.includes('/account/catalog')

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
                {!isFromCatalog && !isFromCart &&
                    <Button className='product-button' variant='contained' onClick={handleAddToCart}>
                        Add to cart
                    </Button>
                }
            </Card>
        </Container>
    )
}

export default Product