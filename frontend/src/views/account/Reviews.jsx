import React, { useState, useEffect } from 'react'
import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { fetchCurrentUserReviews } from '../../api/reviewApi'
import { useNavigate } from 'react-router-dom'
import Review from '../../components/Review'
import './Reviews.css'

function Reviews() {
  const [userReviews, setUserReviews] = useState(null)
  const [reviewType, setReviewType] = useState('written')

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviews = await fetchCurrentUserReviews()
        setUserReviews(reviews)
      } catch (error) {
        console.error('Error fetching user reviews:', error)
      }
    }

    fetchReviews()
  }, [])

  const currentUserId = localStorage.getItem('id')

  const filteredReviews = userReviews
    ? userReviews.filter((review) => {
        if (reviewType === 'received') {
          return review.subject.id == currentUserId
        } else if (reviewType === 'written') {
          return review.reviewer.id == currentUserId
        }
        return false
      })
    : []

  const handleReviewTypeChange = (event, newReviewType) => {
    if (newReviewType !== null) {
      setReviewType(newReviewType)
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
        <ToggleButton value='written' aria-label='written reviews'>
          Written Reviews
        </ToggleButton>
        <ToggleButton value='received' aria-label='received reviews'>
          Received Reviews
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
              currentUserId={currentUserId}
            />
          ))}
        </Box>
      )}
    </Box>
  )
}

export default Reviews
