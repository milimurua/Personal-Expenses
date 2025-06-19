import axios from 'axios';

const API = 'http://localhost:3002/api'; // Puerto de expenses-service

export const getExpenses = async (token) => {
  return axios.get(`${API}/expenses`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};
