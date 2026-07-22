const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Helper to get token
const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
};

export const apiCall = async (endpoint, method = 'GET', body = null) => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method,
      headers: getHeaders(),
      ...(body ? { body: JSON.stringify(body) } : {})
    });
    
    const data = await response.json();
    if (!response.ok) {
      const err = new Error(data.message || 'Server request failed');
      err.isServerError = true;
      throw err;
    }
    return data;
  } catch (error) {
    console.error(`API Call failed to ${endpoint}:`, error.message);
    throw error;
  }
};
