import axiosClient from './axiosClient';

const storage_service_api = 'https://storage-service-s3.herokuapp.com';

const objectApi = {
  getObjectsIndex: (bucketId: string): any => {
    const url = `${storage_service_api}/api/v1/buckets/${bucketId}/index`;
    return axiosClient.get(url);
  },

  getObjectsInFolder: (bucketId: string, folderId: string): any => {
    const url = `${storage_service_api}/api/v1/buckets/${bucketId}/${folderId}`;
    return axiosClient.get(url);
  },

  uploadFile: (bucketId: any, file: any, parentId: any, userId: any): any => {
    const url = `${storage_service_api}/api/v1/buckets/${bucketId}/upload`;
    const body: any = new FormData();
    body.append('file', file);
    body.append('file_type', file.type);
    body.append('user_id', userId);
    if (parentId) {
      body.append('parent', parentId);
    }
    return axiosClient.post(url, body);
  },

  addFolder: (folderName: any, bucketId: any, parentId: any): any => {
    const url = `${storage_service_api}/api/v1/buckets/${bucketId}/addFolder`;
    const body = {
      name: folderName,
      parent: parentId,
    };

    return axiosClient.post(url, body);
  },

  getDetailObject: (objectId: any): any => {
    const url =   `${storage_service_api}/api/v1/objects/${objectId}`;

    return axiosClient.get(url);
  },

  deleteObject: (objectId: any) => {
    const url =   `${storage_service_api}/api/v1/objects/${objectId}`;
    return axiosClient.delete(url);
  }
};

export default objectApi;
