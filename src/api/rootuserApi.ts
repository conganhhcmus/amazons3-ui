import axiosClient from './axiosClient';

const baseUrl = 'https://user-service-s3.herokuapp.com/';

const rootUserApi = {
  getListIamUser: (): Promise<{ statusCode: number; user: any }> => {
    const url = `${baseUrl}api/v1/users/root-users/childs`;
    return axiosClient.get(url);
  },
  createIamUser: (
    username: string,
    password: string,
    permisstion: number,
  ): Promise<{ statusCode: number; user: any }> => {
    const url = `${baseUrl}api/v1/users/register-iam`;
    const body = {
      username,
      password,
      permisstion,
    };
    return axiosClient.post(url, body);
  },
  deleteIamUser: (id: string): Promise<{ data: any }> => {
    const url = `${baseUrl}api/v1/root-users/${id}`;
    return axiosClient.delete(url);
  },
  getUserById: (id: string): any => {
    const url = `${baseUrl}api/v1/users/${id}`;
    return axiosClient.get(url);
  },
};

export default rootUserApi;
