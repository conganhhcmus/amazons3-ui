import { user } from 'app/userlist/userliststore';
import axiosClient from './axiosClient';

const baseUrl = 'https://user-service-s3.herokuapp.com/';

const iamUserApi = {
  getBuckets: (): Promise<{ data: user[] }> => {
    const url = `${baseUrl}api/v1/buckets`;
    return axiosClient.get(url);
  },
  createBucket: (userName: string, passWord: string, permission: number): Promise<{ newIamuser: user }> => {
    const url = `${baseUrl}api/v1/buckets`;
    const body = {
      userName,
      passWord,
      permission,
    };
    return axiosClient.post(url, body);
  },

  deleteBucket: (id: string): Promise<{ success: boolean }> => {
    const url = `${baseUrl}api/v1/buckets/${id}`;
    return axiosClient.delete(url);
  },
};

export default iamUserApi;
