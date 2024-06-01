import api from './apiClient'

export async function fetchAllProducts(params) {
  try {
    const response = await api.get(`/products?${params}`)
    return response.data
  } catch (error) {
    throw error
  }
}

export async function createProduct(data) {
  try {
    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
      if (key !== 'images') {
        formData.append(`product[${key}]`, value)
      }
    })
    for (let i = 0; i < data.images.length; i++) {
      formData.append(`product[images][]`, data.images[i])
    }

    const response = await api.post(`/products`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  } catch (error) {
    throw error
  }
}

export async function updateProduct(id, data) {
  try {
    const formData = new FormData()
    for (let [key, value] of formData.entries()) {
      console.log(key, value)
      console.log('xd')
    }
    Object.entries(data).forEach(([key, value]) => {
      if (key !== 'images') {
        formData.append(`product[${key}]`, value)
      }
    })
    for (let i = 0; i < data.images.length; i++) {
      formData.append(`product[images][]`, data.images[i])
    }

    const response = await api.put(`/products/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return response.data
  } catch (error) {
    throw error
  }
}

export async function deleteProduct(id, params) {
  try {
    const response = await api.delete(`/products/${id}?${params}`)
    if (response.status === 204) {
      return null
    } else {
      return response.data
    }
  } catch (error) {
    throw error
  }
}

export async function fetchProduct(id, params) {
  try {
    const response = await api.get(`/products/${id}?${params}`)
    return response.data
  } catch (error) {
    throw error
  }
}

export async function deleteProductImage(id, image_index) {
  try {
    await api.delete(`/products/${id}/delete_image/${image_index}`)
  } catch (error) {
    throw error
  }
}
