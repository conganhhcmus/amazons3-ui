import axiosClient from './axiosClient';

const storage_service_api = 'https://storage-api-app.herokuapp.com';

const objectApi = {
  getObjectsIndex: (parentId: string): any => {
    const url = `${storage_service_api}/api/v1/buckets/${parentId}/index`;
    return axiosClient.get(url);
  },

  getObjectsInFolder: (parentId: string, folderId: string): any => {
    const url = `${storage_service_api}/api/v1/buckets/${parentId}/${folderId}`;
    return axiosClient.get(url);
  },

  uploadFile: (bucketId: any, file: any, parentId: any): any => {
    const url = `${storage_service_api}/api/v1/buckets/${bucketId}/upload`;
    const body: any = new FormData();
    body.append('file', file);
    if (parentId) {
      body.append('parent', parentId);
    }
    return axiosClient.post(url, body);
  },

  addFolder: (folderName: any, bucketId: any, parentId: any): any => {
    const url = `${storage_service_api}/api/v1/buckets/${bucketId}/addFolder`;
    const body = {
      name : folderName,
      parent: parentId,
    };

    return axiosClient.post(url, body);
  },
};

export default objectApi;
