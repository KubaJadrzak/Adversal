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
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import './Review.css'

function Review({ review, reviewType, onDelete }) {
  const [open, setOpen] = useState(false)
  const baseURL = import.meta.env.VITE_API_BASE_URL
  const isSmallScreen = useMediaQuery('(max-width: 700px)')

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
          {reviewType === 'written' && (
            <>
              <IconButton onClick={handleClickOpen} aria-label='delete' color='error'>
                <FontAwesomeIcon icon={faTrash} size={isSmallScreen ? 'sm' : undefined} />
              </IconButton>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
              >
                <DialogTitle id='alert-dialog-title'>{'Delete Review'}</DialogTitle>
                <DialogContent>
                  <DialogContentText id='alert-dialog-description'>
                    Are you sure you want to delete this review?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color='primary' variant='contained'>
                    Cancel
                  </Button>
                  <Button onClick={handleDelete} color='error' variant='outlined' autoFocus>
                    Delete
                  </Button>
                </DialogActions>
              </Dialog>
            </>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default Review
