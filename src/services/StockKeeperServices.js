import axios from 'axios';

// Access the VITE_API_BASE_URL from the environment variable
const API_URL = import.meta.env.VITE_API_BASE_URL + '/api/v1/stokkeeper/';

// Function to add an item
const addItem = async (itemData) => {
  try {
    // Get the token from localStorage (or wherever you're storing it)
    const token = localStorage.getItem("auth_token");

    const response = await axios.post(`${API_URL}add-item`, itemData, {
      headers: {
        Authorization: `Bearer ${token}`, // Add the JWT token to the header
      }
    });
    return response.data; // Return the response data if successful
  } catch (error) {
    console.error('Error adding item:', error);
    throw new Error('Failed to add item');
  }
};

export { addItem };
