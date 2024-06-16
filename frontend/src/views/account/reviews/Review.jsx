import React from 'react'
import ImageDisplay from '../../../components/ImageDisplay'
import { Box, Typography, Rating, useMediaQuery } from '@mui/material'
import './Review.css'

function Review({ review, reviewType }) {
  const baseURL = import.meta.env.VITE_API_BASE_URL
  const isSmallScreen = useMediaQuery('(max-width: 700px)')
  return (
    <Box className='review-container'>
      <Box className='review-image'>
        <ImageDisplay imageURL={review.reviewer.image ? baseURL + review.reviewer.image : null} />
      </Box>
      <Box className='review-details'>
        <Typography variant='caption'>{review.created_at}</Typography>
        <Box className='seller-rating'>
          <Rating
            name='rating'
            value={review.rating}
            precision={0.5}
            readOnly
            size={isSmallScreen ? undefined : 'large'}
          />
        </Box>
        <Box className='review-title'>
          <Typography variant={isSmallScreen ? 'subtitle1' : 'h6'}>{review.text}</Typography>
        </Box>

        <Box className='review-footer'>
          {reviewType === 'received' ? (
            <Typography variant={isSmallScreen ? 'subtitle1' : undefined}>
              By: {review.reviewer.name}
            </Typography>
          ) : (
            <Typography variant={isSmallScreen ? 'subtitle1' : undefined}>
              For: {review.subject.name}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  )
}
export default Review
