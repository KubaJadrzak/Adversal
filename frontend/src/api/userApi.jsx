import api from './apiClient'

export async function fetchAllUsers() {
    try {
      const response = await api.get('/users');
      return response.data;
    } catch (error) {
      throw new Error('Error fetching all users');
    }
  }

  export async function createUser(data) {
    try {
      const response = await api.post('/users', data);
      return response.data;
    } catch (error) {
      throw new Error('Error creating user');
    }
  }

  export async function deleteUser(id) {
    try {
      const response = await api.delete(`/users/${id}`);
      if (response.status === 204) {
        return null;
      } else {
        return response.data;
      }
    } catch (error) {
      throw new Error('Error deleting user');
    }
  }

  export async function updateUser(id, data) {
    try {
      const response = await api.put(`/users/${id}`, data);
      return response.data;
    } catch (error) {
      throw new Error('Error updating user');
    }
  }

  export async function fetchUser(id, params) {
    try {
      const response = await api.get(`/users/${id}?${params}`);
      return response.data;
    } catch (error) {
      throw new Error('Error fetching user');
    }
  }

  export async function deleteUserImage(id) {
    try {
      await api.delete(`/users/${id}/delete_image`);
    } catch (error) {
      throw new Error('Error deleting user image');
    }
  }