import React from 'react'
import { Box, Typography, Button, IconButton } from '@mui/material'
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons'
import ImageDisplay from '../../components/ImageDisplay'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { deleteProduct } from '../../api/productApi'
import { useLocation } from 'react-router-dom'
import useAlert from '../../components/alerts/useAlert'

import './Product.css'

function Product({ product, navigate, onAddToCart, onDeleteProduct }) {
  const baseURL = import.meta.env.VITE_API_BASE_URL
  const location = useLocation()
  const { setAlert } = useAlert()

  const isFromAccount = location.pathname.includes('/account')
  if (!product || product.length === 0) return <div></div>

  const handleDeleteProduct = async (e) => {
    e.stopPropagation()
    e.preventDefault()
    try {
      deleteProduct(product.id)
      onDeleteProduct(product.id)
      setAlert('Product was successfully deleted!', 'success')
    } catch (e) {
      console.error('Failed to delete the product:', e)
      setAlert('Failed to delete the product!', 'error')
    }
  }

  return (
    <Box
      className='products-element-container'
      onClick={() => {
        navigate(`product/${product.id}`)
      }}
    >
      <Box className='products-element-image'>
        <ImageDisplay
          imageURL={
            product.images && product.images.length > 0 ? baseURL + product.images[0] : null
          }
        />
      </Box>
      <Box className='product-element-title'>
        <Typography>{product.title}</Typography>
      </Box>

      {!isFromAccount ? (
        <Box className='products-element-footer'>
          <Typography>${product.price}</Typography>
          <IconButton className='products-element-footer-icon'>
            <FontAwesomeIcon icon={faRegularHeart} />
          </IconButton>
        </Box>
      ) : (
        <Box className='products-element-footer'>
          <Button
            variant='contained'
            className='products-element-footer-button'
            onClick={(e) => {
              e.stopPropagation()
              navigate(`/product/${product.id}/edit`)
            }}
          >
            Edit
          </Button>
          <Button
            variant='contained'
            className='products-element-footer-button'
            onClick={handleDeleteProduct}
          >
            Delete
          </Button>
          <Typography className='products-element-footer-button'>
            STATUS: {product.status}
          </Typography>
        </Box>
      )}
    </Box>
  )
}

export default Product
