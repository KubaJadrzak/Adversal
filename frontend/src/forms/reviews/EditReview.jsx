import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Box } from '@mui/material'
import { fetchReview, updateReview } from '../../api/reviewApi'
import ReviewForm from './ReviewForm'
import useAlert from '../../components/alerts/useAlert'

function EditReview() {
  const [review, setReview] = useState(null)
  const navigate = useNavigate()
  const { setAlert } = useAlert()
  const { reviewId } = useParams()

  useEffect(() => {
    const loadData = async () => {
      try {
        const reviewData = await fetchReview(reviewId)
        console
        setReview(reviewData)
      } catch (error) {
        console.error('Failed to load review: ', error)
      }
    }

    loadData()
  }, [reviewId])

  const handleSubmit = async ({ text, rating }) => {
    const updatedData = { text, rating, subject_id: review.subject.id }

    try {
      await updateReview(reviewId, updatedData)
      navigate(`/seller/${review.subject.id}?view=reviews`)
      setAlert('Review was successfully updated', 'success')
    } catch (error) {
      console.error('Failed to update review: ', error)
      setAlert('Failed to update review', 'error')
    }
  }

  // If review.id is not defined or falsy, render nothing until data is loaded
  if (!review || !review.id) return null

  const data = {
    id: review.id,
    text: review.text,
    rating: review.rating,
    subject_id: review.subject.id,
  }

  return (
    <Box>
      <ReviewForm buttonMessage={'Edit Review'} data={data} handleSubmit={handleSubmit} />
    </Box>
  )
}

export default EditReview
