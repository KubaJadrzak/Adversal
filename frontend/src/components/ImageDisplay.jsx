import React from 'react'
import { Box } from '@mui/material'
import placeholderImage from '../assets/placeholder-image.jpg'

const ImageDisplay = ({ imageURL }) => {
  return (
    <Box style={{ width: '100%', height: '100%' }}>
      <img
        src={imageURL || placeholderImage}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        alt={imageURL ? 'Product Image' : 'No image available'}
      />
    </Box>
  )
}

export default ImageDisplay
