import React,{ useState,useEffect} from 'react';
import { SearchOutlined } from '@ant-design/icons';
import {  Input,TablePaginationConfig,Popconfirm } from 'antd';
import './userlist.css'
import { Button,message} from 'antd';
import { useDispatch,connect } from 'react-redux';
import {searchUser,deleteMulUser,deleteUser,getListIamUser } from 'app/userlist/userliststore'
import {user} from 'app/userlist/userliststore'
import Createusermodal from '../Createusermodal/index'
import Usertable from '../UserTable';
import { SorterResult } from 'antd/lib/table/interface';
import rootUserApi from 'api/rootuserApi';
export interface Iuserstate{
  user: {
    token: string
  },
  userlistReducer:{
    createIamUser:{
      userName: string,
      passWord: string,
      permisstion: number
    },
    listUser:user[],
    editIamUser:user,
    searchIamUser: string,
  }
}
interface Iuserlist {
  list:user[]
}
function UserList(props:Iuserlist): JSX.Element {
  const [loading, setLoading] = useState<boolean>(true)
  const [selectedIamUser, setSelectedIamUser] = useState<React.Key[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    rootUserApi
      .getListIamUser()
      .then(res=>dispatch(getListIamUser(res.user)))
  }, []);
  const dispatch = useDispatch()
  const {list}=props
  const handleDeleteUser = (id: string): void => {
    dispatch(deleteUser(id))
    message.info(`Delete user id = ${id}`);
  }
  const handleSelect = (selectedRowKeys: React.Key[]): void => {
    console.log('🚀 ~ file: index.tsx ~ line 58 ~ handleChangeSelect ~ selectedRowKeys', selectedRowKeys);
    setSelectedIamUser(selectedRowKeys);
  };
  const handleChange = (
    pagination: TablePaginationConfig,
    sorter: SorterResult<user> | SorterResult<user>[],
  ): void => {
    console.log('🚀 ~ file: index.tsx ~ line 72 ~ handleChange ~ pagination', pagination);
    console.log('🚀 ~ file: index.tsx ~ line 72 ~ handleChange ~ sorter', sorter);
  };
  const handleDeleteMulUser = () => {
    if (!selectedIamUser.length) {
      message.warning('Please select at least one bucket');
      return;
    }
    dispatch(deleteMulUser(selectedIamUser))
    message.info('Delete multi IamUSer');
  }
  return(
    <div>
      <div>User List Page</div>
      <div className="bucket-table-container">
        <div className="d-flex justify-content-between">
          <div className="bucket-table-container__search">
            <Input size="large" placeholder="Search..." prefix={<SearchOutlined />} onChange={e=>dispatch(searchUser(e.target.value.trim()))} />
          </div>
          <div className="bucket-table-container__actions">
            <Popconfirm title="Are you sure to delete?" onConfirm={handleDeleteMulUser} okText="Yes" cancelText="No">
              <Button type="primary" danger>
                Delete
              </Button>
            </Popconfirm>
            <Createusermodal />
          </div>
        </div>
        <div className="mt-4">
        </div>
      </div>
      <div style={{ marginTop: '40px' }}>
        <Usertable 
          loading={loading}
          onDelete={handleDeleteUser}
          onChange={handleChange}
          onSelect={handleSelect}
          data={list}
        />
      </div>
    </div>
  ) 
}
const mapStatetoProps= (state: Iuserstate)=>({
  list:state.userlistReducer.listUser,
  searchIamUser: state.userlistReducer.searchIamUser
})
export default connect(mapStatetoProps,null)(UserList);
