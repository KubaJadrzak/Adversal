import api from './apiClient';

export async function fetchCartProducts(params) {
  try {
    const response = await api.get(`/cart_products?${params}`);
    return response.data;
  } catch (error) {
    throw error
  }
}

export async function createCartProduct(data) {
  try {
    const response = await api.post('/cart_products', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw error
  }
}

export async function deleteCartProduct(id, params) {
  try {
    const response = await api.delete(`/cart_products/${id}?${params}`);
    if (response.status === 204) {
      return null;
    }
    return response.data;
  } catch (error) {
    throw error
  }
}

export async function updateCartProduct(id, data) {
  try {
    const response = await api.put(`/cart_products/${id}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw error
  }
}

export async function fetchCartProduct(id, params) {
  try {
    const response = await api.get(`/cart_products/${id}?${params}`);
    return response.data;
  } catch (error) {
    throw error
  }
}