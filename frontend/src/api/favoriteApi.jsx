import api from './apiClient'

export async function addFavoriteProduct(id) {
  try {
    const response = await api.post('/favorites', { product_id: id })
    return response.data
  } catch (error) {
    throw error
  }
}

export async function deleteFavoriteProduct(id) {
  try {
    const response = await api.delete(`/favorites/${id}`)
    return response.data
  } catch (error) {
    throw error
  }
}

export async function fetchCurrentUserFavorites() {
  try {
    const response = await api.get('/favorites/current_user_favorites')
    return response.data
  } catch (error) {
    throw error
  }
}
