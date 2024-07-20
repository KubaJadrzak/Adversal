import React, { useState } from 'react'
import ImageDisplay from './ImageDisplay'
import {
  Box,
  Typography,
  Rating,
  useMediaQuery,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import './Review.css'

function Review({ review, reviewType, onDelete, currentUserId }) {
  const [open, setOpen] = useState(false)
  const baseURL = import.meta.env.VITE_API_BASE_URL
  const isSmallScreen = useMediaQuery('(max-width: 700px)')
  const navigate = useNavigate()

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleDelete = async () => {
    try {
      await onDelete(review.id)
      handleClose()
    } catch (error) {
      // Handle error (e.g., show error message)
    }
  }

  return (
    <Box className='review-container'>
      <Box className='review-image'>
        {reviewType === 'received' ? (
          <ImageDisplay imageURL={review.reviewer.image ? baseURL + review.reviewer.image : null} />
        ) : (
          <ImageDisplay imageURL={review.subject.image ? baseURL + review.reviewer.image : null} />
        )}
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
          <Typography>{review.text}</Typography>
        </Box>

        <Box className='review-footer'>
          {reviewType === 'received' ? (
            <Typography variant={isSmallScreen ? 'caption' : undefined}>
              {review.reviewer.id == currentUserId ? <>By: You</> : <>By: {review.reviewer.name}</>}
            </Typography>
          ) : (
            <Typography variant={isSmallScreen ? 'caption' : undefined}>
              For: {review.subject.name}
            </Typography>
          )}

          {review.reviewer.id == currentUserId && (
            <Button
              className='review-footer-button'
              variant='contained'
              color='primary'
              onClick={() => {
                navigate(`/review/${review.id}/edit`)
              }}
            >
              Edit
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default Review
