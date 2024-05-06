import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { fetchProduct } from '../../api/productApi'
import { Container, Typography, Box, ImageList, ImageListItem, Button, Avatar } from '@mui/material'
import useAlert from '../../components/alerts/useAlert'
import './ProductDetails.css'

function ProductDetails() {
  const baseURL = import.meta.env.VITE_API_BASE_URL
  const { setAlert } = useAlert()
  const { id } = useParams()
  const [product, setProduct] = useState([])
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchProduct(id)
        setProduct(data)
      } catch (e) {
        console.error('Failed to load product: ', e)
      }
    }
    loadData()
  }, [id])
  const isFromCart = location.pathname.includes('/cart')
  const isFromAccount = location.pathname.includes('account')

  if (!product || product.length === 0) return <div></div>

  return (
    <Container className='product-container'>
      <Box className='product-card'>
        <Typography variant='h4' className='product-title'>
          {product.title}
        </Typography>
        <Container className='product-price-seller'>
          <Typography variant='h6' className='product-price'>
            ${product.price}
          </Typography>
          <Box className='product-element-seller'>
            <Avatar
              className='product-list-element-seller-avatar'
              src={baseURL + product.seller.image}
            />
            <Typography variant='h6' className='product-seller'>
              {product.seller.name}
            </Typography>
          </Box>
        </Container>
        <Box className='product-image-container'>
          {product.images ? (
            <ImageList cols={2} className='product-image-list'>
              {product.images.map((image, index) => (
                <ImageListItem key={index} className='product-image'>
                  <img src={baseURL + image} loading='lazy' />
                </ImageListItem>
              ))}
            </ImageList>
          ) : (
            <Box>
              <Typography variant='overline'>no image available</Typography>
            </Box>
          )}
        </Box>
        <Typography className='product-description'>{product.description}</Typography>
        {!isFromCart && !isFromAccount && (
          <Button className='product-button' variant='contained' onClick={handleAddToCart}>
            Add to cart
          </Button>
        )}
      </Box>
    </Container>
  )
}

export default ProductDetails
