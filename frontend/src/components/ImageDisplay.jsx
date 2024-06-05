import React from 'react'
import { Box } from '@mui/material'
import placeholderImage from '../assets/placeholder-image.jpg'

const ImageDisplay = ({ imageURL }) => {
  return (
    <Box style={{ width: '100%', position: 'relative', paddingBottom: '75%' }}>
      <img
        src={imageURL || placeholderImage}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
        alt={imageURL ? 'Product Image' : 'No image available'}
      />
    </Box>
  )
}

export default ImageDisplay
