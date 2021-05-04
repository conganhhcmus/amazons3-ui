import React from 'react';
import { SearchOutlined ,CaretUpOutlined,CaretDownOutlined,CheckCircleTwoTone,EyeTwoTone,DeleteTwoTone } from '@ant-design/icons';
import {  Input } from 'antd';
import './userlist.css'
import { Button as Button1} from 'antd';
import { Button, Header, Image, Modal,Pagination } from 'semantic-ui-react'

function UserList(): JSX.Element {
  const [open, setOpen] = React.useState(false)

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
          <Modal.Header>Select a Photo</Modal.Header>
          <Modal.Content image>
            <Image size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' wrapped />
            <Modal.Description>
              <Header>Default Profile Image</Header>
              <p>hello</p>
              <p>Is it okay to use this photo?</p>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button color='black' onClick={() => setOpen(false)}>
              Nope
            </Button>
            <Button
              content="Yep, that's me"
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
              <div className='ctit2' style={{marginLeft: '10px'}}>
                <CaretUpOutlined />
                <CaretDownOutlined />
              </div>
            </div>    
          </div>
          <div className='ctit' style={{ width: '18%', justifyContent: 'flex-start'}}>
            <div className='user__body__text'>Permisstion</div>
            <div className='ctit2' style={{marginLeft: '10px'}}>
              <CaretUpOutlined />
              <CaretDownOutlined />
            </div>    
          </div>
          <div className='ctit' style={{ width: '15%', justifyContent: 'flex-start'}}>
            <div className='user__body__text'>Access key age</div>
            <div className='ctit2' style={{marginLeft: '10px'}}>
              <CaretUpOutlined />
              <CaretDownOutlined />
            </div>    
          </div>
          <div className='ctit' style={{ width: '15%', justifyContent: 'flex-start'}}>
            <div className='user__body__text'>Password age</div>
            <div className='ctit2' style={{marginLeft: '10px'}}>
              <CaretUpOutlined />
              <CaretDownOutlined />
            </div>    
          </div>
          <div className='ctit' style={{ width: '15%', justifyContent: 'flex-start'}}>
            <div className='user__body__text'>Last activity</div>
            <div className='ctit2' style={{marginLeft: '10px'}}>
              <CaretUpOutlined />
              <CaretDownOutlined />
            </div>    
          </div>
          <div className='ctit'>
            <div className='user__body__text'>Action</div> 
          </div>
        </div>
      </div>
      <div className='user__body user__item'>
        <div className='bt' style={{ paddingBottom: '10px', width: '100%'}}>
          <div className='ctit' style={{ width: '23%', justifyContent: 'flex-start'}}>
            <input type='checkbox' style={{ marginRight: '30px'}}></input>
            <div className='ctit'>
              <div className='user__body__text2'>Dummy data</div>
            </div>    
          </div>
          <div className='ctit' style={{ width: '18%', justifyContent: 'flex-start'}}>
            <div className='user__body__text2'>
              <Button1 type="primary" className='user__item__btn'>
                Full access
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
      <div className='user__pagination'>
        <Pagination
          boundaryRange={0}
          defaultActivePage={1}
          ellipsisItem={null}
          firstItem={null}
          lastItem={null}
          siblingRange={1}
          totalPages={10}
        />
      </div>

    </div>
  ) 

}

export default UserList;
