import React from 'react'
import { Box } from '@mui/material'
import placeholderImage from '../assets/placeholder-image.jpg'

const ImageDisplay = ({ imageURL }) => {
  return (
    <Box style={{ width: '100%', height: '100%' }}>
      {imageURL ? (
        <img
          src={imageURL}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          alt='Product Image'
        />
      ) : (
        <img
          src={placeholderImage}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          alt='No image available'
        />
      )}
    </Box>
  )
}

export default ImageDisplay
