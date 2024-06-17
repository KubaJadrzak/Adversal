import React, { useState, useEffect } from 'react'
import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { fetchUserReviews, deleteUserReview } from '../../../api/userApi'
import { useNavigate } from 'react-router-dom'
import Review from './Review'
import './Reviews.css'

function Reviews() {
  const [userReviews, setUserReviews] = useState(null)
  const [reviewType, setReviewType] = useState('received') // 'received' or 'written'
  const navigate = useNavigate()

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviews = await fetchUserReviews()
        setUserReviews(reviews)
      } catch (error) {
        console.error('Error fetching user reviews:', error)
      }
    }

    fetchReviews()
  }, [])

  const idFromLocalStorage = localStorage.getItem('id')

  const filteredReviews = userReviews
    ? userReviews.filter((review) => {
        if (reviewType === 'received') {
          return review.subject.id == idFromLocalStorage
        } else if (reviewType === 'written') {
          return review.reviewer.id == idFromLocalStorage
        }
        return false
      })
    : []

  const handleReviewTypeChange = (event, newReviewType) => {
    if (newReviewType !== null) {
      setReviewType(newReviewType)
    }
  }

  const handleDeleteReview = async (reviewId) => {
    try {
      await deleteUserReview(reviewId)
      setUserReviews(userReviews.filter((review) => review.id !== reviewId))
    } catch (error) {
      console.error('Error deleting review:', error)
    }
  }

  if (userReviews === null) {
    return <Box></Box>
  }

  return (
    <Box className='reviews-container'>
      <ToggleButtonGroup
        className='reviews-topbar'
        value={reviewType}
        exclusive
        onChange={handleReviewTypeChange}
        aria-label='review type'
      >
        <ToggleButton value='received' aria-label='received reviews'>
          Received Reviews
        </ToggleButton>
        <ToggleButton value='written' aria-label='written reviews'>
          Written Reviews
        </ToggleButton>
      </ToggleButtonGroup>
      {filteredReviews.length === 0 ? (
        <Box></Box>
      ) : (
        <Box>
          {filteredReviews.map((review) => (
            <Review
              key={review.id}
              review={review}
              reviewType={reviewType}
              onDelete={handleDeleteReview}
            />
          ))}
        </Box>
      )}
    </Box>
  )
}

export default Reviews
