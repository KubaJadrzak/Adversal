import api from './apiClient'

export async function fetchAllCategories() {
  try {
    const response = await api.get('/categories')
    return response.data
  } catch (error) {
    throw error
  }
}

export async function createCategory(data) {
  try {
    const response = await api.post('/categories', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response.data
  } catch (error) {
    throw error
  }
}

export async function deleteCategory(id) {
  try {
    const response = await api.delete(`/categories/${id}`)
    return response.data
  } catch (error) {
    throw error
  }
}

export async function updateCategory(id, data) {
  try {
    const response = await api.put(`/categories/${id}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response.data
  } catch (error) {
    throw error
  }
}

export async function fetchCategory(id) {
  try {
    const response = await api.get(`/categories/${id}`)
    return response.data
  } catch (error) {
    throw error
  }
}
