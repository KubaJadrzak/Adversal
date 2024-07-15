import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { fetchProduct } from '../../api/productApi'
import { Box, Button, Typography, Rating, Link, useMediaQuery } from '@mui/material'
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
    if (product && product.images && product.images.length > 0) {
      setLargeImageIndex((prevIndex) => (prevIndex + 1) % product.images.length)
    }
  }

  const handlePrev = () => {
    if (product && product.images && product.images.length > 0) {
      setLargeImageIndex(
        (prevIndex) => (prevIndex - 1 + product.images.length) % product.images.length
      )
    }
  }

  const handleImageClick = (index) => {
    if (product && product.images && product.images.length > 0) {
      setLargeImageIndex(index)
    }
  }

  const handleMoreFromSellerClick = () => {
    navigate(`/seller/${product.seller.id}?view=reviews`)
  }

  if (!product) return <div></div>

  return (
    <Box className='product-details-container'>
      <Box className='product-details-left'>
        <Box className='product-details-image'>
          <Button
            className='prev-button'
            onClick={handlePrev}
            disabled={!(product.images && product.images.length > 1)}
          >
            ‹
          </Button>
          <ImageDisplay
            imageURL={
              product.images && product.images.length > 0
                ? `${baseURL}/${product.images[largeImageIndex]}`
                : null
            }
          />
          {product.images && product.images.length > 0 && (
            <div className='image-overlay'>
              {largeImageIndex + 1} / {product.images.length}
            </div>
          )}
          <Button
            className='next-button'
            onClick={handleNext}
            disabled={!(product.images && product.images.length > 1)}
          >
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
        <Box className='product-details-seller'>
          <Box>
            <Box className='product-details-seller-image'>
              <ImageDisplay
                imageURL={product.seller.image ? `${baseURL}/${product.seller.image}` : null}
              />
            </Box>
            <Box>
              <Box className='product-details-seller-name'>
                <Typography variant='h6'>{product.seller.name}</Typography>
              </Box>
              <Box className='product-details-seller-rating'>
                <Rating
                  name='seller-rating'
                  value={product.seller.average_rating}
                  precision={0.5}
                  readOnly
                  size='large'
                />
              </Box>
              <Link
                className='product-details-seller-link'
                color='inherit'
                onClick={handleMoreFromSellerClick}
                component='button'
              >
                More from this seller
              </Link>
            </Box>
          </Box>
          <Box>
            <Typography>{product.seller.full_address}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default ProductDetails
