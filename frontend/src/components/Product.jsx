import React, { useState } from 'react'
import { Box, Typography, Button, IconButton, useMediaQuery, useTheme } from '@mui/material'
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons'
import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons'
import ImageDisplay from './ImageDisplay'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useLocation } from 'react-router-dom'
import { addFavoriteProduct, deleteFavoriteProduct } from '../api/favoriteApi'
import './Product.css'

function Product({ product, navigate, isFavorite: initialIsFavorite, onRemoveFavorite }) {
  const baseURL = import.meta.env.VITE_API_BASE_URL
  const location = useLocation()
  const isFromAccount = location.pathname.includes('/account')
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite)
  const theme = useTheme()

  const isSmallScreen = useMediaQuery('(max-width: 700px)')

  const handleFavoriteClick = async (e) => {
    e.stopPropagation()
    try {
      if (isFavorite) {
        await deleteFavoriteProduct(product.id)
        setIsFavorite(false)
        if (onRemoveFavorite) {
          onRemoveFavorite(product.id)
        }
      } else {
        await addFavoriteProduct(product.id)
        setIsFavorite(true)
      }
    } catch (error) {
      console.error('Failed to update favorite status:', error)
    }
  }

  if (!product || !product.seller) return <div></div>

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
        <Box>
          <Typography variant='caption'>
            {isSmallScreen ? product.seller.short_address : product.seller.full_address}
          </Typography>
        </Box>
        <Box className='product-title'>
          <Typography variant={isSmallScreen ? 'subtitle1' : 'h6'}>{product.title}</Typography>
        </Box>
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
              className='product-footer-button'
              onClick={(e) => {
                e.stopPropagation()
                navigate(`/product/${product.id}/edit`)
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
