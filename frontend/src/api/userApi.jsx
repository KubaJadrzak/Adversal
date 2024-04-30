import api from './apiClient'

export async function fetchAllUsers() {
  try {
    const response = await api.get('/users')
    return response.data
  } catch (error) {
    throw error
  }
}

export async function createUser(data) {
  try {
    const response = await api.post('/users', data)
    return response.data
  } catch (error) {
    throw error
  }
}

export async function deleteUser(id) {
  try {
    const response = await api.delete(`/users/${id}`)
    if (response.status === 204) {
      return null
    } else {
      return response.data
    }
  } catch (error) {
    throw error
  }
}

export async function updateUser(id, data) {
  try {
    const formData = new FormData()

    Object.entries(data).forEach(([key, value]) => {
      if (key !== 'image') {
        formData.append(`user[${key}]`, value)
      }
    })

    if (data.image) {
      formData.append('user[image]', data.image)
    }

    const response = await api.put(`/users/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return response.data
  } catch (error) {
    throw error
  }
}

export async function fetchUser(id, params) {
  try {
    const response = await api.get(`/users/${id}?${params}`)
    return response.data
  } catch (error) {
    throw error
  }
}

export async function deleteUserImage(id) {
  try {
    await api.delete(`/users/${id}/delete_image`)
  } catch (error) {
    throw error
  }
}
