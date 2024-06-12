import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { fetchProduct } from '../../api/productApi'
import { Box, Button, Divider, Link, Typography, Rating, useMediaQuery } from '@mui/material'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
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
  const isSmallScreen = useMediaQuery('(max-width:1200px)')

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
      <Box className='product-details-left'>
        <Box className='product-details-image'>
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
          <div className='image-overlay'>
            {largeImageIndex + 1} / {product.images.length}
          </div>
          <Button className='next-button' onClick={handleNext}>
            ›
          </Button>
        </Box>
        {!isSmallScreen ? (
          <Typography>{product.description}</Typography>
        ) : (
          <Box className='product-details-title'>
            <Typography variant='h6'>{product.title}</Typography>

            <Typography variant='h6'>${product.price}</Typography>
            <Box className='contact-buttons'>
              <Button
                variant='contained'
                startIcon={<EmailIcon />}
                href={`mailto:${product.seller.email}`}
              >
                {product.seller.email}
              </Button>
              <Button
                variant='contained'
                startIcon={<PhoneIcon />}
                href={`tel:${product.seller.phone_number}`}
              >
                {product.seller.phone_number}
              </Button>
            </Box>
          </Box>
        )}
      </Box>
      <Box className='product-details-right'>
        {!isSmallScreen ? (
          <Box className='product-details-title'>
            <Typography variant='h6'>{product.title}</Typography>

            <Typography variant='h6'>${product.price}</Typography>
            <Box className='contact-buttons'>
              <Button
                variant='contained'
                startIcon={<EmailIcon />}
                href={`mailto:${product.seller.email}`}
              >
                {product.seller.email}
              </Button>
              <Button
                variant='contained'
                startIcon={<PhoneIcon />}
                href={`tel:${product.seller.phone_number}`}
              >
                {product.seller.phone_number}
              </Button>
            </Box>
          </Box>
        ) : (
          <Typography>{product.description}</Typography>
        )}
        <Box>
          <Box className='seller-image'>
            <ImageDisplay
              imageURL={product.seller.image ? `${baseURL}/${product.seller.image}` : null}
            />
          </Box>
          <Box>
            <Box className='seller-name'>
              <Typography variant='h6'>{product.seller.name}</Typography>
            </Box>
            <Box className='seller-rating'>
              <Rating
                name='seller-rating'
                value={product.seller.average_rating}
                precision={0.5}
                readOnly
                size='large'
              />
            </Box>
            <Link className='seller-link' href='#' color='inherit'>
              More from this seller
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default ProductDetails
