import axiosClient from './axiosClient';

const authApi = {
  loginRootUser: (username: string, password: string) => {
    const url = '/auth/login-root';
    const body = {
      username,
      password,
      role: '0',
    };

    return axiosClient.post(url, body);
  },
  loginUser: (rootUsername: string, username: string, password: string) => {
    const url = '/auth/login-iam';
    const body = {
      rootUsername,
      username,
      password,
      role: '1',
    };

    return axiosClient.post(url, body);
  },
};

export default authApi;
