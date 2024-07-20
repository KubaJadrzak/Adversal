import api from './apiClient'

export async function fetchAddresses(type, query, id, country_code) {
  try {
    const response = await api.get('/addresses/search', {
      params: { type, query, id, country_code },
    })
    return response.data
  } catch (error) {
    throw error
  }
}
