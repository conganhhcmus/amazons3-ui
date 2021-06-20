import axiosClient from './axiosClient';
const baseUrl = 'https://user-service-s3.herokuapp.com/';
interface childResponse{
  privateToken: string,
  publicToken:string,
  owner:string,
  password:string,
  permission:number,
  username:string,
  __v?:number,
  _id?:string,
  lastLogged?:string,
}
const rootUserApi = {
  getListIamUser: (): Promise<{ statusCode: number; users: childResponse[] }> => {
    const url = `${baseUrl}api/v1/users/root-users/child`;
    return axiosClient.get(url);
  },
  createIamUser: (
    username: string,
    password: string,
    permission: number,
  ): Promise<{ statusCode: number; user: childResponse }> => {
    const url = `${baseUrl}api/v1/users/register-iam`;
    const body = {
      username,
      password,
      permission,
    };
    return axiosClient.post(url, body);
  },
  editIamUser: (
    id: string,
    password: string,
    permission: number,
  ): Promise<{ statusCode: number; user: childResponse }> => {
    const url = `${baseUrl}api/v1/users/root-users/child/`;
    const body = {
      id,
      password,
      permission,
    };
    return axiosClient.put(url, body);
  },
  deleteIamUser: (id: string): Promise<{ statusCode: number, error: string}> => {
    const url = `${baseUrl}api/v1/users/root-users/child/${id}`;
    return axiosClient.delete(url);
  },
};

export default rootUserApi;
