import React from 'react';
import { SearchOutlined ,CheckCircleTwoTone,EyeTwoTone,DeleteTwoTone } from '@ant-design/icons';
import {  Input } from 'antd';
import './userlist.css'
import { Button as Button1} from 'antd';
import { Button, Modal,Pagination,Dropdown, Icon } from 'semantic-ui-react'
import { useDispatch } from 'react-redux';
import { createIamUser } from 'app/userlist/userliststore'
function UserList(): JSX.Element {
  const [open, setOpen] = React.useState<boolean>(false)
  const [currentPage,setCurrentPage]= React.useState<any>(1)
  const dispatch = useDispatch()
  const Options =[
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
  const itemperPage= 3
  const totalPage= Math.ceil(Options.length/itemperPage)
  const start= itemperPage * (currentPage-1)
  const end= start+ itemperPage
  // const handleSort =(sort:Array<string>)=>{
  //   console.log('asd',sort)
  // }
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
                // onClick={()=>handleSort(Options)}
              />
            </div>    
          </div>
          <div className='ctit' style={{ width: '18%', justifyContent: 'flex-start'}}>
            <div className='user__body__text'>Permisstion</div>
            <Icon name='sort' className='sort__icon' 
              // onClick={handleSort(Options)}
            />
          </div>
          <div className='ctit' style={{ width: '15%', justifyContent: 'flex-start'}}>
            <div className='user__body__text'>Access key age</div>
            <Icon name='sort' className='sort__icon' 
              // onClick={handleSort} 
            /> 
          </div>
          <div className='ctit' style={{ width: '15%', justifyContent: 'flex-start'}}>
            <div className='user__body__text'>Password age</div>
            <Icon name='sort' className='sort__icon' 
              // onClick={handleSort} 
            />
          </div>
          <div className='ctit' style={{ width: '15%', justifyContent: 'flex-start'}}>
            <div className='user__body__text'>Last activity</div>
            <Icon name='sort' className='sort__icon' 
              // onClick={handleSort}
            />
          </div>
          <div className='ctit'>
            <div className='user__body__text'>Action</div> 
          </div>
        </div>
      </div>
      {Options.slice(start,end).map((e,i)=>{
        return(
          <div className='user__body user__item' key={i}>
            <div className='bt' style={{ paddingBottom: '10px', width: '100%'}}>
              <div className='ctit' style={{ width: '23%', justifyContent: 'flex-start'}}>
                <input type='checkbox' style={{ marginRight: '30px'}}></input>
                <div className='ctit'>
                  <div className='user__body__text2'>{e.text}</div>
                </div>    
              </div>
              <div className='ctit' style={{ width: '18%', justifyContent: 'flex-start'}}>
                <div className='user__body__text2'>
                  <Button1  className={(e.key=='fullaccess')?'user__item__btn fullaccess':
                    ((e.key=='readonly')?'user__item__btn readonly':
                      (e.key=='writeonly')?'user__item__btn writeonly':'user__item__btn noaccess'
                    )}>
                    {e.text}
                  </Button1>
                </div>  
              </div>
              <div className='ctit' style={{ width: '15%', justifyContent: 'flex-start'}}>
                <div className='ctit'>
                  <CheckCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: '25px'}}/>
                  <div className='user__body__text2' style={{ marginLeft: '5px' }}>4 days ago</div>   
                </div>
              </div>
              <div className='ctit' style={{ width: '15%', justifyContent: 'flex-start'}}>
                <div className='user__body__text2'>4 days ago</div>   
              </div>
              <div className='ctit' style={{ width: '15%', justifyContent: 'flex-start'}}>
                <div className='user__body__text2'>4 days ago</div>   
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
          onPageChange={(e,data)=>setCurrentPage(data.activePage)}
          lastItem={null}
          siblingRange={1}
          totalPages={totalPage}
        />
      </div>

    </div>
  ) 

}

export default UserList;
