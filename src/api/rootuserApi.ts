import axiosClient from './axiosClient';

const rootUserApi={
  getListIamUser:(): Promise<{statusCode: number;user: any}>=>{
    const url=`https://user-service-s3.herokuapp.com/api/v1/users/root-users/childs`
    return axiosClient.get(url)
  },
  createIamUser:(username: string, password: string,permisstion: number ): Promise<{statusCode: number;user: any}>=>{
    const url=`https://user-service-s3.herokuapp.com/api/v1/users/register-iam`
    const body = {
      username,
      password,
      permisstion
    };
    return axiosClient.post(url,body)
  },
  deleteIamUser:(id: string): Promise<{data: any}>=>{
    const url=`api/v1/root-users/${id}`
    return axiosClient.delete(url)
  },
}

export default rootUserApi