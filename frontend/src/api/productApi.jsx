import api from './apiClient'

// Fetch all products with optional query parameters
export async function fetchAllProducts(params) {
  try {
    const response = await api.get(`/products?${params}`)
    return response.data
  } catch (error) {
    throw error
  }
}

// Fetch products for a specific user
export async function fetchUserProducts(userId, params) {
  try {
    const response = await api.get(`/products/user_products/${userId}?${params}`)
    return response.data
  } catch (error) {
    throw error
  }
}

// Fetch products for the current user
export async function fetchCurrentUserProducts(params) {
  try {
    const response = await api.get(`/products/current_user_products?${params}`)
    return response.data
  } catch (error) {
    throw error
  }
}

// Create a new product
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

// Update an existing product
export async function updateProduct(id, data) {
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

    // Log FormData entries for debugging
    for (let [key, value] of formData.entries()) {
      console.log(key, value)
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

// Delete an existing product
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

// Fetch a single product by ID
export async function fetchProduct(id, params) {
  try {
    const response = await api.get(`/products/${id}?${params}`)
    return response.data
  } catch (error) {
    throw error
  }
}

// Delete an image from a product
export async function deleteProductImage(id, imageIndex) {
  try {
    await api.delete(`/products/${id}/delete_image/${imageIndex}`)
  } catch (error) {
    throw error
  }
}
