import React, { useState, useEffect } from 'react'
import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { fetchUserReviews, deleteUserReview } from '../../api/reviewApi'
import { useNavigate } from 'react-router-dom'
import Review from '../../components/Review'

function SellerReviews({ sellerId }) {
  const [userReviews, setUserReviews] = useState(null)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviews = await fetchUserReviews(sellerId)
        setUserReviews(reviews)
      } catch (error) {
        console.error('Error fetching user reviews:', error)
      }
    }

    fetchReviews()
  }, [])

  if (userReviews === null) {
    return <Box></Box>
  }

  return (
    <Box className='reviews-container'>
      {userReviews.length === 0 ? (
        <Box></Box>
      ) : (
        <Box>
          {userReviews.map((review) => (
            <Review key={review.id} review={review} reviewType='received' />
          ))}
        </Box>
      )}
    </Box>
  )
}

export default SellerReviews
