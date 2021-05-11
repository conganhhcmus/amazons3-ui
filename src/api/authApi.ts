import axios from 'axios';
// import axiosClient from './axiosClient';

const authApi = {
  loginRootUser: (username: string, password: string): Promise<{ data: { accessToken: string; msg: string } }> => {
    const url = 'https://authorization-service-s3.herokuapp.com/api/v1/auth/login-root';
    const body = {
      username,
      password,
    };

    return axios.post(url, body);
  },
  loginUser: (
    rootUsername: string,
    username: string,
    password: string,
  ): Promise<{ data: { accessToken: string; msg: string } }> => {
    const url = 'https://authorization-service-s3.herokuapp.com/api/v1/auth/login-iam';
    const body = {
      rootUsername,
      username,
      password,
    };

    return axios.post(url, body);
  },

  registerRootUser: (
    username: string,
    password: string,
    email: string,
  ): Promise<{ statusCode: number; user: { username: string; email: string } }> => {
    const url = 'https://user-service-s3.herokuapp.com/api/v1/users/register-root';

    const body = {
      username,
      password,
      email,
    };

    return axios.post(url, body);
  },
};

export default authApi;
