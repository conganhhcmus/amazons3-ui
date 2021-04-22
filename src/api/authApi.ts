import { AxiosRequestConfig } from 'axios';
import axiosClient from './axiosClient';

const authApi = {
  loginRootUser: (username: string, password: string): Promise<{ accessToken: string; msg: string }> => {
    const url = '/auth/login-root';
    const body = {
      username,
      password,
    };

    return axiosClient.post(url, body);
  },
  loginUser: (
    rootUsername: string,
    username: string,
    password: string,
  ): Promise<{ accessToken: string; msg: string }> => {
    const url = '/auth/login-iam';
    const body = {
      rootUsername,
      username,
      password,
    };

    return axiosClient.post(url, body);
  },

  registerRootUser: (username: string, password: string, confirmPassword: string): Promise<AxiosRequestConfig> => {
    const url = 'auth/register-root';

    const body = {
      username,
      password,
      confirmPassword,
    };

    return axiosClient.post(url, body);
  },
};

export default authApi;
