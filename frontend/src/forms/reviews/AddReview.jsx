import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { createReview } from '../../api/reviewApi'
import ReviewForm from './ReviewForm'
import { Box } from '@mui/material'
import useAlert from '../../components/alerts/useAlert'

function AddReview() {
  const { setAlert } = useAlert()
  const navigate = useNavigate()
  const { sellerId } = useParams()

  const handleSubmit = async ({ text, rating }) => {
    const data = { text, rating, subject_id: sellerId }
    try {
      await createReview(data)
      navigate(`/account?view=reviews`)
      setAlert('Review was successfully created', 'success')
    } catch (e) {
      console.error('Failed to create a review: ', e)
      setAlert('Failed to create a review', 'error')
    }
  }

  const data = {
    text: '',
    rating: '',
    subject_id: sellerId,
  }

  return (
    <Box>
      <ReviewForm buttonMessage={'Create New Review'} data={data} handleSubmit={handleSubmit} />
    </Box>
  )
}

export default AddReview
