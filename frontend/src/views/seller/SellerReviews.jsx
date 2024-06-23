import React, { useState, useEffect } from 'react'
import { Box, Button } from '@mui/material'
import { fetchUserReviews } from '../../api/reviewApi'
import { useNavigate } from 'react-router-dom'
import Review from '../../components/Review'

function SellerReviews({ sellerId }) {
  const [userReviews, setUserReviews] = useState(null)
  const [canWriteReview, setCanWriteReview] = useState(false)
  const navigate = useNavigate()
  const currentUserId = localStorage.getItem('id')

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviews = await fetchUserReviews(sellerId)

        // Sort reviews to show current user's review on top, if exists
        const sortedReviews = [...reviews].sort((a, b) => {
          if (a.reviewer.id == currentUserId) return -1
          if (b.reviewer.id == currentUserId) return 1
          return 0
        })

        // Update state with sorted reviews
        setUserReviews(sortedReviews)

        // Check if the current user is the seller or has already written a review
        const hasReviewed = reviews.some((review) => review.reviewer.id == currentUserId)
        setCanWriteReview(currentUserId != sellerId && !hasReviewed)
      } catch (error) {
        console.error('Error fetching user reviews:', error)
      }
    }

    fetchReviews()
  }, [sellerId, currentUserId])

  if (userReviews === null) {
    return <Box></Box>
  }

  return (
    <Box>
      {canWriteReview && (
        <Button
          variant='contained'
          onClick={() => {
            navigate(`review/add`)
          }}
        >
          Write a review
        </Button>
      )}
      {userReviews.length === 0 ? (
        <Box>No reviews yet.</Box>
      ) : (
        <Box>
          {userReviews.map((review) => (
            <Review
              key={review.id}
              review={review}
              reviewType='received'
              currentUserId={currentUserId}
            />
          ))}
        </Box>
      )}
    </Box>
  )
}

export default SellerReviews
