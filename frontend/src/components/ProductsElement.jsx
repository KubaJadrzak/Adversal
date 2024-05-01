import React from 'react'
import {
  Box,
  Typography,
  Button,
  IconButton,
  ImageList,
  ImageListItem,
  Avatar,
  Card,
} from '@mui/material'
import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { createCartProduct } from '../api/cartProductApi'
import { deleteProduct } from '../api/productApi'
import { useLocation } from 'react-router-dom'
import useAlert from './alerts/useAlert'

import './ProductsElement.css'

function ProductsElement({ product, navigate, onAddToCart, onDeleteProduct }) {
  const baseURL = import.meta.env.VITE_API_BASE_URL
  const location = useLocation()
  const { setAlert } = useAlert()

  const isFromAccount = location.pathname.includes('/account')
  if (!product || product.length === 0) return <div></div>

  const handleAddToCart = async (e) => {
    e.stopPropagation()
    e.preventDefault()
    const carted_product_id = product.id
    const data = { carted_product_id }
    try {
      if (!localStorage.getItem('token')) {
        // Redirect to the login page if no token is found
        navigate('/login')
        return
      }
      await createCartProduct(data)
      onAddToCart(product.id)
      setAlert('Product was added to cart!', 'success')
    } catch (e) {
      console.error('Failed to add product to cart: ', e)
      setAlert('Failed to add product to cart!', 'error')
    }
  }

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
      className='products-element'
      onClick={() => {
        navigate(`product/${product.id}`)
      }}
    >
      <Box>
        {product.images && product.images.length > 0 ? (
          <img
            style={{
              height: 240,
              width: 320,
            }}
            src={baseURL + product.images[0]}
          />
        ) : (
          <Typography variant='overline'>No image available</Typography>
        )}
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

export default ProductsElement
