import React from 'react';
import { SearchOutlined ,CheckCircleTwoTone,EyeTwoTone,DeleteTwoTone } from '@ant-design/icons';
import {  Input } from 'antd';
import './userlist.css'
import { Button as Button1} from 'antd';
import { Button, Modal,Pagination,Dropdown, Icon } from 'semantic-ui-react'
import { useDispatch,connect } from 'react-redux';
import { createIamUser,sortUser } from 'app/userlist/userliststore'
import {fake} from 'app/userlist/userliststore'
interface Ioption{
  key: string,
  value: string,
  text: string
}
interface Iuserstate{
  user: {
    token: string
  },
  userlistReducer:{
    createIamUser:{
      userName: string,
      passWord: string,
      permisstion: string
    },
    listUser:fake[]
  }
}

interface Iuserlist {
  fake1:fake[]
}
const Options: Ioption[]=[
  {
    key: 'fullaccess',
    value:'fullaccess',
    text: 'Full Access'
  },
  {
    key: 'readonly',
    value:'readonly',
    text: 'Read Only'
  },
  {
    key: 'writeonly',
    value:'writeonly',
    text: 'Write Only'
  },
  {
    key: 'noaccess',
    value:'noaccess',
    text: 'No Access'
  },
]
function UserList(props:Iuserlist): JSX.Element {
  const [open, setOpen] = React.useState<boolean>(false)
  const [currentPage,setCurrentPage]= React.useState<number>(1)
  const dispatch = useDispatch()
  const {fake1}=props
  const itemperPage= 3
  const totalPage= Math.ceil(fake1.length/itemperPage)
  const start= itemperPage * (currentPage-1)
  const end= start+ itemperPage

  return(
    <div>
      <div>User List Page</div>
      <div className='user__header'>
        <Input size="large" placeholder="Search..." prefix={<SearchOutlined />} className='user__search'/>
        <div style={{width:'40%'}}></div>
        <Modal
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          trigger={<Button className='user__create__btn custom__btn'>Create</Button>}
        >
          <Modal.Header>Create user</Modal.Header>
          <Modal.Content >
            <Modal.Description>
              <div>
                <div><span className='modal__span'>*</span>Username:</div>
                <div>
                  <Input size="large" placeholder="Username" onChange={e=>dispatch(createIamUser({userName: e.target.value}))} />
                </div>
                <br></br>
                <div><span className='modal__span'>*</span>Password:</div>
                <div>
                  <Input.Password size="large" placeholder="Password" onChange={e=>dispatch(createIamUser({passWord: e.target.value}))}  />
                </div>
                <br></br>
                <div><span className='modal__span'>*</span>Permisstion:</div>
                <div>
                  <Dropdown
                    onChange={(e,data)=>dispatch(createIamUser({permisstion: data.value}))}
                    placeholder='Select Friend'
                    fluid
                    selection
                    options={Options}
                  />
                </div>
              </div>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button color='black' onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              content="Submit"
              labelPosition='right'
              icon='checkmark'
              onClick={() => setOpen(false)}
              positive
            />
          </Modal.Actions>
        </Modal>
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
                onClick={()=>dispatch(sortUser(1))}
              />
            </div>    
          </div>
          <div className='ctit' style={{ width: '18%', justifyContent: 'flex-start'}}>
            <div className='user__body__text'>Permisstion</div>
            <Icon name='sort' className='sort__icon' 
              onClick={()=>dispatch(sortUser(2))}
            />
          </div>
          <div className='ctit' style={{ width: '15%', justifyContent: 'flex-start'}}>
            <div className='user__body__text'>Access key age</div>
            <Icon name='sort' className='sort__icon' 
              onClick={()=>dispatch(sortUser(3))}
            /> 
          </div>
          <div className='ctit' style={{ width: '15%', justifyContent: 'flex-start'}}>
            <div className='user__body__text'>Password age</div>
            <Icon name='sort' className='sort__icon' 
              onClick={()=>dispatch(sortUser(4))}
            />
          </div>
          <div className='ctit' style={{ width: '15%', justifyContent: 'flex-start'}}>
            <div className='user__body__text'>Last activity</div>
            <Icon name='sort' className='sort__icon' 
              onClick={()=>dispatch(sortUser(5))}
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
                  <Button1  className={(e.permisstion=='fullaccess')?'user__item__btn fullaccess':
                    ((e.permisstion=='readonly')?'user__item__btn readonly':
                      (e.permisstion=='writeonly')?'user__item__btn writeonly':'user__item__btn noaccess'
                    )}>
                    {e.permisstion}
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
                  <EyeTwoTone twoToneColor='#2AE9DD'  style={{ fontSize: '25px', marginRight: '10px' }}/>
                  <DeleteTwoTone twoToneColor='#FD7D7D' style={{ fontSize: '25px'}}/>
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
  fake1:state.userlistReducer.listUser
})
export default connect(mapStatetoProps,null)(UserList);
