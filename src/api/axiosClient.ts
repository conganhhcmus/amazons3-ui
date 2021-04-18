import axios from 'axios';
import queryString from 'query-string';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: (params: any) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config: any) => {
  const token = cookies.get('token', { path: '/' } as any);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosClient.interceptors.response.use(
  (response: any) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error: any) => {
    throw error;
  }
);
export default axiosClient;
