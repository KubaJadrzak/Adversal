import api from './apiClient';

export async function fetchCartProducts(params) {
  try {
    const response = await api.get(`/cart_products?${params}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching cart products');
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
    throw new Error('Error creating cart product');
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
    throw new Error('Error deleting cart product');
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
    throw new Error('Error updating cart product');
  }
}

export async function fetchCartProduct(id, params) {
  try {
    const response = await api.get(`/cart_products/${id}?${params}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching cart product');
  }
}