import React from 'react';
import { SearchOutlined ,CheckCircleTwoTone,DeleteTwoTone } from '@ant-design/icons';
import {  Input } from 'antd';
import './userlist.css'
import { Button as Button1,message} from 'antd';
import { Pagination, Icon } from 'semantic-ui-react'
import { useDispatch,connect } from 'react-redux';
import { sortIamUser,searchUser } from 'app/userlist/userliststore'
import {user} from 'app/userlist/userliststore'
import Createusermodal from '../Createusermodal/index'
import Userdetailmodal from '../Userdetailmodal/index'
export interface Iuserstate{
  user: {
    token: string
  },
  userlistReducer:{
    createIamUser:{
      userName: string,
      passWord: string,
      permisstion: string
    },
    listUser:user[],
    editIamUser:user,
    searchIamUser: string,
  }
}

interface Iuserlist {
  fake1:user[]
}

function UserList(props:Iuserlist): JSX.Element {
  const [currentPage,setCurrentPage]= React.useState<number>(1)
  const dispatch = useDispatch()
  const {fake1}=props
  const itemperPage= 3
  const totalPage= Math.ceil(fake1.length/itemperPage)
  const start= itemperPage * (currentPage-1)
  const end= start+ itemperPage
  const handleDeleteUser = (id: number): void => {
    message.info(`Delete user id = ${id}`);
  }
  return(
    <div>
      <div>User List Page</div>
      <div className='user__header'>
        <Input size="large" placeholder="Search..." 
          prefix={<SearchOutlined />} className='user__search'
          onChange={e=>dispatch(searchUser(e.target.value.trim()))}
        />
        <div style={{width:'40%'}}/>
        <Createusermodal />
        <Button1 type="primary" htmlType="submit" className="w-100 user__delete__btn" size="large" id='delete__btn' >
          Delete
        </Button1>
      </div>
      <div className='user__body'>
        <div className='bt' style={{ paddingBottom: '10px', width: '100%'}}>
          <div className='ctit' style={{ width: '23%', justifyContent: 'flex-start'}}>
            <input type='checkbox' style={{ marginRight: '30px'}}></input>
            <div className='ctit'>
              <div className='user__body__text'>User Name</div>
              <Icon name='sort'  className='sort__icon' 
                onClick={()=>dispatch(sortIamUser(1))}
              />
            </div>    
          </div>
          <div className='ctit' style={{ width: '18%', justifyContent: 'flex-start'}}>
            <div className='user__body__text'>Permisstion</div>
            <Icon name='sort' className='sort__icon' 
              onClick={()=>dispatch(sortIamUser(2))}
            />
          </div>
          <div className='ctit' style={{ width: '15%', justifyContent: 'flex-start'}}>
            <div className='user__body__text'>Access key age</div>
            <Icon name='sort' className='sort__icon' 
              onClick={()=>dispatch(sortIamUser(3))}
            /> 
          </div>
          <div className='ctit' style={{ width: '15%', justifyContent: 'flex-start'}}>
            <div className='user__body__text'>Password age</div>
            <Icon name='sort' className='sort__icon' 
              onClick={()=>dispatch(sortIamUser(4))}
            />
          </div>
          <div className='ctit' style={{ width: '15%', justifyContent: 'flex-start'}}>
            <div className='user__body__text'>Last activity</div>
            <Icon name='sort' className='sort__icon' 
              onClick={()=>dispatch(sortIamUser(5))}
            />
          </div>
          <div className='ctit'>
            <div className='user__body__text'>Action</div> 
          </div>
        </div>
      </div>
      {fake1 !=null&&fake1.slice(start,end).map((e,i)=>{
        return(
          <div className='user__body user__item' key={i}>
            <div className='bt' style={{ paddingBottom: '10px', width: '100%'}}>
              <div className='ctit' style={{ width: '23%', justifyContent: 'flex-start'}}>
                <input type='checkbox' style={{ marginRight: '30px'}}></input>
                <div className='ctit'>
                  <div className='user__body__text2'>{e.userName}</div>
                </div>    
              </div>
              <div className='ctit' style={{ width: '18%', justifyContent: 'flex-start'}}>
                <div className='user__body__text2'>
                  <Button1  className={(e.permisstion===1)?'user__item__btn fullaccess':
                    ((e.permisstion==2)?'user__item__btn readonly':
                      (e.permisstion==3)?'user__item__btn writeonly':'user__item__btn noaccess'
                    )}>
                    {e.permisstion===1 && <div>Full access</div>}
                    {e.permisstion==2 && <div>Read only</div>}
                    {e.permisstion==3 && <div>Write only</div>}
                    {e.permisstion==4 && <div>No access</div>}

                  </Button1>
                </div>  
              </div>
              <div className='ctit' style={{ width: '15%', justifyContent: 'flex-start'}}>
                <div className='ctit'>
                  <CheckCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: '25px'}}/>
                  <div className='user__body__text2' style={{ marginLeft: '5px' }}>{e.accessKeyAge}</div>   
                </div>
              </div>
              <div className='ctit' style={{ width: '15%', justifyContent: 'flex-start'}}>
                <div className='user__body__text2'>{e.passwordAge}</div>   
              </div>
              <div className='ctit' style={{ width: '15%', justifyContent: 'flex-start'}}>
                <div className='user__body__text2'>{e.lastAcctivity}</div>   
              </div>
              <div className='ctit'>
                <div>
                  <Userdetailmodal editUser={e} user={e} />
                  <DeleteTwoTone twoToneColor='#FD7D7D' 
                    style={{ fontSize: '25px', cursor:'pointer' }}
                    onClick={()=>handleDeleteUser(e.id)}
                  />
                </div>
              </div>
            </div>
          </div>
        )
      })}
      <div className='user__pagination'>
        <Pagination
          boundaryRange={0}
          defaultActivePage={1}
          ellipsisItem={null}
          firstItem={null}
          onPageChange={(e,data)=>setCurrentPage(data.activePage as number)}
          lastItem={null}
          siblingRange={1}
          totalPages={totalPage}
        />
      </div>
    </div>
  ) 
}
const mapStatetoProps= (state: Iuserstate)=>({
  fake1:state.userlistReducer.listUser,
  searchIamUser: state.userlistReducer.searchIamUser
})
export default connect(mapStatetoProps,null)(UserList);
