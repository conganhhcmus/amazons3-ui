import axiosClient from './axiosClient';

const authApi = {
  loginRootUser: (username: string, password: string): Promise<{ accessToken: string; msg: string }> => {
    const url = 'api/v1/auth/login-root';
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
    const url = 'api/v1/auth/login-iam';
    const body = {
      rootUsername,
      username,
      password,
    };

    return axiosClient.post(url, body);
  },

  registerRootUser: (username: string, password: string, email: string): Promise<{ success: boolean }> => {
    const url = 'api/v1/auth/root-users';

    const body = {
      username,
      password,
      email,
    };

    return axiosClient.post(url, body);
  },
};

export default authApi;
