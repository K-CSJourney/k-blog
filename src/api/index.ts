import axios from 'axios';

export const blogApi = axios.create({
  baseURL: 'http://localhost:3000/api/v1'
})