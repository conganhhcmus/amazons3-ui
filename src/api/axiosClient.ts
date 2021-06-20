import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import queryString from 'query-string';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: (params: Record<string, unknown>) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config: AxiosRequestConfig) => {
  const token = cookies.get('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error: AxiosError) => {
    throw error;
  },
);
export default axiosClient;
