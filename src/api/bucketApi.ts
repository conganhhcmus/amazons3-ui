import { IBucket } from './../features/Bucket/pages/BucketList/index';
import axiosClient from './axiosClient';

const baseUrl = 'https://storage-service-s3.herokuapp.com/';

const bucketApi = {
  getBuckets: (): Promise<{ data: IBucket[] }> => {
    const url = `${baseUrl}api/v1/buckets`;
    return axiosClient.get(url);
  },
  createBucket: (bucketName: string, region: string, user_id: string): any => {
    const url = `${baseUrl}api/v1/buckets`;
    const body = {
      name: bucketName,
      region,
      user_id,
    };

    return axiosClient.post(url, body);
  },
  deleteBucket: (id: string): Promise<{ message: string }> => {
    const url = `${baseUrl}api/v1/buckets/${id}`;
    return axiosClient.delete(url);
  },
  getBucketDetail: (id: string): any => {
    const url = `${baseUrl}api/v1/buckets/${id}/detail`;
    return axiosClient.get(url);
  }
};

export default bucketApi;
