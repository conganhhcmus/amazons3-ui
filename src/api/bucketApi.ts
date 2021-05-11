import { IBucket } from './../features/Bucket/pages/BucketList/index';
import axiosClient from './axiosClient';

const bucketApi = {
  getBuckets: (): Promise<{ data: IBucket[] }> => {
    const url = 'api/v1/buckets';
    return axiosClient.get(url);
  },
  createBucket: (bucketName: string, region: string): Promise<{ newBucket: IBucket }> => {
    const url = 'api/v1/buckets';
    const body = {
      bucketName,
      region,
    };

    return axiosClient.post(url, body);
  },

  deleteBucket: (id: string): Promise<{ success: boolean }> => {
    const url = `api/v1/buckets/${id}`;
    return axiosClient.delete(url);
  },
};

export default bucketApi;
