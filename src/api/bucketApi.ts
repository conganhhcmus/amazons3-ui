import { IBucket } from './../features/Bucket/pages/BucketList/index';
import axiosClient from './axiosClient';

const bucketApi = {
  getBuckets: (): Promise<{ data: IBucket[] }> => {
    const url = 'https://storage-api-app.herokuapp.com/api/v1/buckets';
    return axiosClient.get(url);
  },
  createBucket: (bucketName: string, region: string, user_id: string): any => {
    const url = 'https://storage-api-app.herokuapp.com/api/v1/buckets';
    const body = {
      name: bucketName,
      region,
      user_id,
    };

    return axiosClient.post(url, body);
  },
  deleteBucket: (id: string): Promise<{ message: string }> => {
    const url = `https://storage-api-app.herokuapp.com/api/v1/buckets/${id}`;
    return axiosClient.delete(url);
  },
};

export default bucketApi;
