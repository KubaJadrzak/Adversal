import api from './apiClient'

export async function fetchAllOrders(params) {
  try {
    const response = await api.get(`/orders?${params}`)
    return response.data
  } catch (error) {
    throw error
  }
}

export async function createOrder(data) {
  try {
    const response = await api.post('/orders', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response.data
  } catch (error) {
    throw error
  }
}

export async function deleteOrder(id, params) {
  try {
    const response = await api.delete(`/orders/${id}?${params}`)
    if (response.status === 204) {
      return null
    }
    return response.data
  } catch (error) {
    throw error
  }
}

export async function updateOrder(id, data) {
  try {
    const response = await api.put(`/orders/${id}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response.data
  } catch (error) {
    throw error
  }
}

export async function fetchOrder(id, params) {
  try {
    const response = await api.get(`/orders/${id}?${params}`)
    return response.data
  } catch (error) {
    throw error
  }
}
