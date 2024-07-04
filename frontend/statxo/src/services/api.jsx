

export const API_BASE_URL = 'http://localhost:5000/api'; 

export const fetchRecords = async (searchTerm) => {
  try {
    const response = await fetch(`${API_BASE_URL}/records?search=${searchTerm}`);
    if (!response.ok) {
      throw new Error('Failed to fetch records');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};


export const saveRecords = async (records) => {
  try {
    const response = await fetch(`${API_BASE_URL}/records`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(records),
    });
    if (!response.ok) {
      throw new Error('Failed to save records');
    }
    
  } catch (error) {
    throw new Error(error.message);
  }
};
