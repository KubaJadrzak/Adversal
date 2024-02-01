import React from "react"
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { fetchProduct } from "../api/productApi"
import { createCartProduct } from "../api/cartProductApi";
import {Container, Typography, Card, Box, ImageList, ImageListItem, Button, Avatar} from '@mui/material'
import useAlert from "../components/alerts/useAlert"
import './Product.css'

function Product() {
    const {setAlert} = useAlert()
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
        if (!localStorage.getItem('token')) {
            navigate("/login");
            return
        }
        try {
            await createCartProduct(data)
            navigate('/cart')
            setAlert('Product was added to cart!', 'success')
        } catch (e) {
            console.error("Failed to add product to cart: ", e)
            setAlert('Failed to add product to cart!', 'error')
        }
    }

    const isFromCart = location.pathname.includes('/cart')
    const isFromAccount = location.pathname.includes('account')

    if (!product || product.length === 0) return (
        <div></div>
    )

    return (
        <Container className="product-container">
            <Card className="product-card">
                <Typography variant='h4' className="product-title">{product.title}</Typography>
                <Container className='product-price-seller'>
                    <Typography variant='h6' className="product-price">${product.price}</Typography>
                    <Box className='product-element-seller'>
                        <Avatar className='product-list-element-seller-avatar' src={"http://localhost:3000" + product.seller.image}/>
                        <Typography variant='h6' className='product-seller'>{product.seller.name}</Typography>
                    </Box>
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
                {!isFromCart && !isFromAccount &&
                    <Button className='product-button' variant='contained' onClick={handleAddToCart}>
                        Add to cart
                    </Button>
                }
            </Card>
        </Container>
    )
}

export default Product