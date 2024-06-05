import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { fetchProduct } from '../../api/productApi'
import { Box, ImageList, ImageListItem, Button } from '@mui/material'
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

      <Box className='product-details-content'></Box>
    </Box>
  )
}

export default ProductDetails
