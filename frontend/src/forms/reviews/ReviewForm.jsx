import React, { useState, useEffect } from 'react'
import {
  Box,
  Button,
  TextField,
  Rating,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import useAlert from '../../components/alerts/useAlert'
import { useLocation, useNavigate } from 'react-router-dom'
import './ReviewForm.css'
import { deleteReview } from '../../api/reviewApi' // Import the deleteReview function

function ReviewForm({ buttonMessage, data, handleSubmit }) {
  const [text, setText] = useState(data.text || '')
  const [rating, setRating] = useState(Number(data.rating) || 0)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const location = useLocation()
  const { setAlert } = useAlert()
  const navigate = useNavigate()

  useEffect(() => {
    setText(data.text || '')
    setRating(Number(data.rating) || 0)
  }, [data])

  const handleDelete = async () => {
    try {
      await deleteReview(data.id)
      navigate(`/account?view=reviews`)
      setAlert('Review was successfully deleted', 'success')
    } catch (e) {
      console.error('Failed to delete a review: ', e)
      setAlert('Failed to delete a review', 'error')
    }
    setOpenDeleteDialog(false)
  }

  const isEdit = location.pathname.includes('edit')

  return (
    <Box>
      <form
        className='review-form'
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit({
            text,
            rating,
            subject_id: data.subject_id,
          })
        }}
      >
        <TextField
          required
          id='text'
          label='Review'
          value={text}
          multiline
          minRows={4}
          onChange={(e) => setText(e.target.value)}
        />
        <Rating
          name='rating'
          value={rating}
          onChange={(e, newValue) => setRating(newValue)}
          sx={{ fontSize: '3rem' }}
        />
        <Button variant='contained' type='submit'>
          {buttonMessage}
        </Button>
        {isEdit && (
          <Button variant='outlined' color='error' onClick={() => setOpenDeleteDialog(true)}>
            Delete Review
          </Button>
        )}
      </form>
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this review?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color='primary' variant='contained'>
            Cancel
          </Button>
          <Button onClick={handleDelete} color='error' variant='outlined'>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default ReviewForm
