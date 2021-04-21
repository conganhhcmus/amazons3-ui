import axiosClient from './axiosClient';

const authApi = {
  loginRootUser: (username: string, password: string) => {
    const url = '/auth/login-root';
    const body = {
      username,
      password,
    };

    return axiosClient.post(url, body);
  },
  loginUser: (rootUsername: string, username: string, password: string) => {
    const url = '/auth/login-iam';
    const body = {
      rootUsername,
      username,
      password,
    };

    return axiosClient.post(url, body);
  },
};

export default authApi;
