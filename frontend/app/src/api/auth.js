import axios from 'axios';

const API_URL = 'http://localhost:8000/api/'; // Update with your Django URL

export const registerUser = async (email, password, name) => {
  try {
    const response = await axios.post(`${API_URL}register/`, {
      email,
      password,
      name
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}login/`, {
      email,
      password
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const logoutUser = () => {
  // Clear tokens from localStorage
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user');
};