import React, { useState } from 'react'
import { Box, Typography, Button, IconButton, useMediaQuery, useTheme } from '@mui/material'
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons'
import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons'
import ImageDisplay from '../../components/ImageDisplay'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useLocation } from 'react-router-dom'
import useAlert from '../../components/alerts/useAlert'
import { addFavoriteProduct, deleteFavoriteProduct } from '../../api/userApi'

import './Product.css'

function Product({ product, navigate, isFavorite: initialIsFavorite }) {
  const baseURL = import.meta.env.VITE_API_BASE_URL
  const location = useLocation()
  const isFromAccount = location.pathname.includes('/account')
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite)
  const theme = useTheme() // Access MUI theme

  const isSmallScreen = useMediaQuery('(max-width: 700px)')

  const handleFavoriteClick = async (e) => {
    e.stopPropagation()
    try {
      if (isFavorite) {
        console.log(product.id)
        await deleteFavoriteProduct(product.id)
        console.log(product.id)
        setIsFavorite(false)
      } else {
        await addFavoriteProduct(product.id)
        console.log(product.id)
        setIsFavorite(true)
      }
    } catch (error) {
      console.error('Failed to update favorite status:', error)
    }
  }

  if (!product || product.length === 0) return <div></div>

  return (
    <Box
      className='product-container'
      onClick={() => {
        navigate(`/product/${product.id}`)
      }}
    >
      <Box className='product-image'>
        <ImageDisplay
          imageURL={
            product.images && product.images.length > 0 ? baseURL + product.images[0] : null
          }
        />
      </Box>
      <Box className='product-details'>
        <Typography variant='caption'>
          {product.seller.street}, {product.seller.city}, {product.seller.zip_code},{' '}
          {product.seller.country}
        </Typography>
        <Box className='product-title'>
          <Typography variant={isSmallScreen ? 'subtitle1' : 'h6'}>{product.title}</Typography>
        </Box>
        {console.log(isFavorite)}
        {!isFromAccount ? (
          <Box className='product-footer'>
            <Typography>${product.price}</Typography>
            <IconButton className='products-footer-icon' onClick={handleFavoriteClick}>
              <FontAwesomeIcon
                icon={isFavorite ? faSolidHeart : faRegularHeart}
                style={{
                  color: isFavorite ? theme.palette.primary.main : undefined,
                }}
              />
            </IconButton>
          </Box>
        ) : (
          <Box className='product-footer'>
            <Typography>${product.price}</Typography>
            <Button
              variant='contained'
              size='small'
              className='product-footer-button'
              onClick={(e) => {
                e.stopPropagation()
                navigate(`/account?view=editProduct&productId=${product.id}`)
              }}
            >
              Edit
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default Product
