

import { API_BASE_URL } from './api';
import axios from 'axios';


export const fetchRecords = async (searchTerm) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/data/records`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch records');
  }
};


export const saveRecords = async (records) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/records`, records);
    return response.data;
  } catch (error) {
    throw new Error('Failed to save records');
  }
};


export const updateRecords = async (record) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/records/${record.id}`, record);
    return response.data;
  } catch (error) {
    throw new Error('Failed to update record');
  }
};


export const addRecord = async (newRecord) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/records`, newRecord);
    return response.data;
  } catch (error) {
    throw new Error('Failed to add new record');
  }
};
