import React from 'react'
import IconTrash from 'assets/icon/IconTrash';
import { user } from 'app/userlist/userliststore'
import { Table, TablePaginationConfig } from 'antd';
import { FilterValue, SorterResult } from 'antd/lib/table/interface';
import Userdetailmodal from '../Userdetailmodal'
import '../UserList/userlist.css'
import { CheckCircleTwoTone } from '@ant-design/icons';
interface IUserTable{
  loading: boolean
  onDelete: (id: number) => void
  onChange: (
    pagination: TablePaginationConfig,
    filter: Record<string, FilterValue | null>,
    sorter: SorterResult<user> | SorterResult<user>[],
  ) => void;
  onSelect: (selectedRowKeys: React.Key[], selectedRows: user[]) => void;
  data: user[];
}

function Usertable(props: IUserTable): JSX.Element {
  const { loading= true, data= [],onDelete,onChange,onSelect } =props
  const columns = [
    {
      title: 'User Name',
      dataIndex: 'userName',
      fixed: true,
      sorter: (a:user, b:user) => {
        if(a.userName> b.userName) return 1
        if(a.userName< b.userName) return -1
        return 0
      },
      sortDirection: ['ascend', 'descend', 'ascend'],
      
    },
    {
      title: 'Permisstion',
      dataIndex: 'permisstion',
      sorter: (a:user, b:user) => {
        if(a.permisstion> b.permisstion) return 1
        if(a.permisstion< b.permisstion) return -1
        return 0
      },
      sortDirection: ['ascend', 'descend', 'ascend'],
      // eslint-disable-next-line react/display-name
      render: (record: number) =>(
        <div style={{ height:' 80%' }}>
          {record===1 && <div className='fullaccess'>Full access</div>}
          {record==2 && <div className='readonly'>Read only</div>}
          {record==3 && <div className='writeonly'>Write only</div>}
          {record==4 && <div className='noaccess'>No access</div>}
        </div>
      )
    },
    {
      title: 'Access key age',
      dataIndex: 'accessKeyAge',
      sortDirection: ['ascend', 'descend', 'ascend'],
      sorter: (a:user, b:user) => {
        if(a.accessKeyAge> b.accessKeyAge) return 1
        if(a.accessKeyAge< b.accessKeyAge) return -1
        return 0
      },
      // eslint-disable-next-line react/display-name
      render: (record: user) => (
        <div style={{ display: 'flex' }}>
          <CheckCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: '25px', marginRight: '10px'}}/>
          <div>{record}</div>
        </div>
      )
    },
    {
      title: 'Password age',
      dataIndex: 'passwordAge',
      sortDirection: ['ascend', 'descend', 'ascend'],
      sorter: (a:user, b:user) => {
        if(a.passwordAge> b.passwordAge) return 1
        if(a.passwordAge< b.passwordAge) return -1
        return 0
      },
    },
    {
      title: 'Last activity',
      dataIndex: 'lastActivity',
      sortDirection: ['ascend', 'descend', 'ascend'],
      sorter: (a:user, b:user) => {
        if(a.lastActivity> b.lastActivity) return 1
        if(a.lastActivity< b.lastActivity) return -1
        return 0
      },
    },
    {
      title: 'Action',
      width: '80px',
      // eslint-disable-next-line react/display-name
      render: (record: user) => (
        <div className="d-flex justify-content-around align-items-center">
          <Userdetailmodal editUser={record} user={record} />
          <div style={{ cursor: 'pointer' }} onClick={() => onDelete(record?.id)}>
            <IconTrash />
          </div>
        </div>
      ),
    },
  ];
  return (
    <Table
      rowKey="id"
      className="bucket-table-container__table"
      loading={loading}
      columns={columns}
      dataSource={data}
      rowSelection={{ type: 'checkbox', onChange: onSelect }}
      scroll={{ x: 1000, y: 400 }}
      pagination={{ pageSize: 5 }}
      onChange={onChange}
    />
  )
}

export default Usertable