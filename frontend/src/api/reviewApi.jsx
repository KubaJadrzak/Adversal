import api from './apiClient'

export async function fetchCurrentUserReviews() {
  try {
    const response = await api.get('/reviews/current_user_reviews')
    return response.data
  } catch (error) {
    throw error
  }
}

export async function fetchUserReviews(userId) {
  try {
    const response = await api.get(`/reviews/user_reviews/${userId}`)
    return response.data
  } catch (error) {
    throw error
  }
}

export async function deleteReview(id) {
  try {
    const response = await api.delete(`/reviews/${id}`)
    if (response.status === 204) {
      return null
    } else {
      return response.data
    }
  } catch (error) {
    throw error
  }
}

export async function createReview(data) {
  try {
    const response = await api.post('/reviews', data)
    return response.data
  } catch (error) {
    throw error
  }
}

export async function fetchReview(reviewId) {
  try {
    const response = await api.get(`/reviews/${reviewId}`)
    return response.data
  } catch (error) {
    throw error
  }
}

export async function updateReview(reviewId, data) {
  try {
    const response = await api.put(`/reviews/${reviewId}`, data)
    return response.data
  } catch (error) {
    throw error
  }
}
