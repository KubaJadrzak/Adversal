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

export async function deleteUserReview(id) {
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
