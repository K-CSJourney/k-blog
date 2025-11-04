import axios from 'axios';

export const blogApi = axios.create({
  baseURL: 'https://blog-api.kbws.xyz/api/v1'
})