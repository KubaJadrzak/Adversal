import React from 'react'
import { Box, Typography, Button, IconButton } from '@mui/material'
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons'
import ImageDisplay from '../../components/ImageDisplay'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useLocation } from 'react-router-dom'
import useAlert from '../../components/alerts/useAlert'

import './Product.css'

function Product({ product, navigate }) {
  const baseURL = import.meta.env.VITE_API_BASE_URL
  const location = useLocation()

  const isFromAccount = location.pathname.includes('/account')
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
          <Typography>{product.title}</Typography>
        </Box>

        {!isFromAccount ? (
          <Box className='product-footer'>
            <Typography>${product.price}</Typography>
            <IconButton className='products-footer-icon'>
              <FontAwesomeIcon icon={faRegularHeart} />
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
