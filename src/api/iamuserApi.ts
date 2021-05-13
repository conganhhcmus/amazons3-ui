import { user } from 'app/userlist/userliststore';
import axiosClient from './axiosClient';

const iamUserApi = {
  getBuckets: (): Promise<{ data: user[] }> => {
    const url = 'api/v1/buckets';
    return axiosClient.get(url);
  },
  createBucket: (userName: string, passWord: string,permisstion: number ): Promise<{ newIamuser: user }> => {
    const url = 'api/v1/buckets';
    const body = {
      userName,
      passWord,
      permisstion
    };

    return axiosClient.post(url, body);
  },

  deleteBucket: (id: string): Promise<{ success: boolean }> => {
    const url = `api/v1/buckets/${id}`;
    return axiosClient.delete(url);
  },
};

export default iamUserApi;
