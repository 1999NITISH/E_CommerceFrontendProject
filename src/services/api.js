import axios from 'axios';

const API_BASE_URL = 'https://dummyjson.com';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getProducts = async (limit = 20, skip = 0) => {
  const response = await apiClient.get(`/products?limit=${limit}&skip=${skip}`);
  return response.data;
};

export const getProductById = async (id) => {
  const response = await apiClient.get(`/products/${id}`);
  return response.data;
};

export const searchProducts = async (query) => {
  const response = await apiClient.get(`/products/search?q=${query}`);
  return response.data;
};

export const getCategories = async () => {
  const response = await apiClient.get('/products/categories');
  return response.data;
};

export const getProductsByCategory = async (category) => {
  const response = await apiClient.get(`/products/category/${category}`);
  return response.data;
};

export default apiClient;
