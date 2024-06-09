import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { fetchProduct } from '../../api/productApi'
import { Box, ImageList, ImageListItem, Button, Typography } from '@mui/material'
import useAlert from '../../components/alerts/useAlert'
import ImageDisplay from '../../components/ImageDisplay'
import './ProductDetails.css'

function ProductDetails() {
  const baseURL = import.meta.env.VITE_API_BASE_URL
  const { setAlert } = useAlert()
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [largeImageIndex, setLargeImageIndex] = useState(0)
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

  const handleNext = () => {
    setLargeImageIndex((prevIndex) => (prevIndex + 1) % product.images.length)
  }

  const handlePrev = () => {
    setLargeImageIndex(
      (prevIndex) => (prevIndex - 1 + product.images.length) % product.images.length
    )
  }

  const handleImageClick = (index) => {
    setLargeImageIndex(index)
  }

  if (!product || product.length === 0) return <div></div>

  return (
    <Box className='product-details-container'>
      <Box className='product-details-images'>
        <Box className='large-image-container'>
          <Button className='prev-button' onClick={handlePrev}>
            ‹
          </Button>
          <ImageDisplay
            imageURL={
              product.images && product.images.length > 0
                ? `${baseURL}/${product.images[largeImageIndex]}`
                : null
            }
          />
          <Button className='next-button' onClick={handleNext}>
            ›
          </Button>
        </Box>
        {product.images && product.images.length > 0 && (
          <ImageList className='small-images-list' cols={3}>
            {product.images.map((image, index) => (
              <ImageListItem
                key={index}
                onClick={() => handleImageClick(index)}
                className='small-image'
              >
                <ImageDisplay imageURL={`${baseURL}/${image}`} />
              </ImageListItem>
            ))}
          </ImageList>
        )}
      </Box>

      <Box className='product-details-content'>
        <Box className='product-details-product'>
          <Typography variant='h4' className='product-title'>
            {product.title}
          </Typography>
          <Typography className='product-description'>{product.description}</Typography>
          <Typography className='product-price'>${product.price}</Typography>
          <Typography variant='body2' className='product-status'>
            Status: {product.status}
          </Typography>
          <Typography variant='body2' className='product-category'>
            Category: {product.category.name}
          </Typography>
        </Box>
        <Box className='product-details-seller'>
          <Typography variant='h6'>Seller Information:</Typography>
          <Typography variant='body2'>Name: {product.seller.name}</Typography>
          <Typography variant='body2'>Email: {product.seller.email}</Typography>
          <Typography variant='body2'>Phone: {product.seller.phone_number}</Typography>
          <Typography variant='body2'>
            Address: {product.seller.street}, {product.seller.city}, {product.seller.zip_code},{' '}
            {product.seller.country}
          </Typography>
        </Box>
        <Button variant='contained' color='primary' onClick={() => alert('Contact Seller')}>
          Contact Seller
        </Button>
      </Box>
    </Box>
  )
}

export default ProductDetails
