import React from 'react'
import { Button, Modal,Dropdown,Input } from 'semantic-ui-react'
import { useDispatch,connect } from 'react-redux';
import { editIamUser,editIamUserFormChange } from 'app/userlist/userliststore'
import {  Input as Input1 } from 'antd';
import {Iuserstate} from '../UserList/index'
import { EyeTwoTone } from '@ant-design/icons';
import {user} from 'app/userlist/userliststore'
interface Ioption{
  key: string,
  value: number,
  text: string
}
interface userdetail{
  editUser:user,
  user:user
}
const Options: Ioption[]=[
  {
    key: 'fullaccess',
    value:1,
    text: 'Full Access'
  },
  {
    key: 'readonly',
    value:2,
    text: 'Read Only'
  },
  {
    key: 'writeonly',
    value:3,
    text: 'Write Only'
  },
  {
    key: 'noaccess',
    value:4,
    text: 'No Access'
  },
]
function Userdetailmodal(props: userdetail): JSX.Element {
  const [open, setOpen] = React.useState<boolean>(false)
  const dispatch = useDispatch()
  const { editUser,user }=props
  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <EyeTwoTone twoToneColor='#2AE9DD'  
          style={{ fontSize: '25px', marginRight: '10px',cursor:'pointer' }}
          onClick={()=>dispatch(editIamUser(editUser))}
        />
      }
    >
      <Modal.Header>View & edit user</Modal.Header>
      <Modal.Content >
        <Modal.Description>
          <div>
            <div><span className='modal__span'>*</span>Username:</div>
            <div>
              <Input fluid placeholder="Username" 
                value={user.userName}
                onChange={(e,data)=>dispatch(editIamUserFormChange({userName: data.value}))}
              />
            </div>
            <br></br>
            <div><span className='modal__span'>*</span>Password:</div>
            <div>
              <Input1.Password  placeholder="Password" 
                value={user.passwordAge}
                onChange={e=>dispatch(editIamUserFormChange({passwordAge: e.target.value}))}
              />
            </div>
            <br></br>
            <div><span className='modal__span'>*</span>Permisstion:</div>
            <div>
              <Dropdown
                value={editUser.permisstion}
                onChange={(e,data)=>{
                  dispatch(editIamUserFormChange({permisstion: data.value}))
                }}
                fluid
                selection
                options={Options}
              />
            </div>
            <div style={{ paddingTop: '10px'}}>
              <div>
                <div>Access key ID:</div>
                <Input
                  action={{
                    color: 'teal',
                    labelPosition: 'right',
                    icon: 'copy',
                    content: 'Copy',
                  }}
                  defaultValue='http://ww.short.url/c0opq'
                />
              </div>
              <div>
                <div>Secrect key ID:</div>
                <Input
                  action={{
                    color: 'teal',
                    labelPosition: 'right',
                    icon: 'copy',
                    content: 'Copy',
                  }}
                  defaultValue='http://ww.short.url/c0opq'
                />
              </div>
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
  )
}
const mapStatetoProps= (state: Iuserstate)=>({
  user:state.userlistReducer.editIamUser
})

export default connect(mapStatetoProps,null)(Userdetailmodal)
