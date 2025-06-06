import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const usersApi = axios.create({
  baseURL: `${API_BASE_URL}/users`,
});

/**
 * Fetch drafts for a specific user.
 * @param {string} token   
 * @param {string} id  
 * @returns {Promise<Object>}                 
 */

export const getDraftsByUser = async (token, id) => {
  const res = await usersApi.get(`/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
