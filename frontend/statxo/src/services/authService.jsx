

import { API_BASE_URL } from './api'; 
import axios from 'axios';


export const login = async (role) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, { role });
    if (!response.data.token) {
      throw new Error('Login failed. No token received.');
    }
    return response.data.token;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getUserDetails = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch user details');
  }
};
