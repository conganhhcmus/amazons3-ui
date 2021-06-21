import React from 'react'
import { Button, Modal,Dropdown,Input } from 'semantic-ui-react'
import { useDispatch,connect, useSelector } from 'react-redux';
import { editIamUser,editIamUserFormChange,getListIamUser } from 'app/userlist/userliststore'
import {  Input as Input1 } from 'antd';
import {Iuserstate} from '../UserList/index'
import {user} from 'app/userlist/userliststore'
import IconView from 'assets/icon/IconView';
import rootUserApi from 'api/rootuserApi';
import { RootState } from 'app/store';
rootUserApi
interface Ioption{
  key: string,
  value: number,
  text: string
}
interface userdetail{
  editUser:user,
  user:user,
  username?:string
}
const Options: Ioption[]=[
  {
    key: 'fullaccess',
    value:99,
    text: 'Full Access'
  },
  {
    key: 'readonly',
    value:0,
    text: 'Read Only'
  },
  {
    key: 'writeonly',
    value:1,
    text: 'Write Only'
  },
  {
    key: 'noaccess',
    value:-1,
    text: 'No Access'
  },
]
function Userdetailmodal(props: userdetail): JSX.Element {
  const [open, setOpen] = React.useState<boolean>(false)
  const dispatch = useDispatch()
  const { editUser,user,username }=props
  const permiss=(data: number)=>{
    if(data==99) return 'Full Access'
    if(data==1) return 'Write only'
    if(data==0) return 'Read only'
    return 'No access'
  }
  const editData= useSelector((state: RootState) =>(state.userlistReducer.editIamUser))
  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        (username)?(
          <a onClick={()=>dispatch(editIamUser(editUser))}>{username}</a>
        ):
          (<div 
            style={{ marginRight: '10px',cursor:'pointer' }}
            onClick={()=>dispatch(editIamUser(editUser))}
          >
            <IconView />
          </div>)
      }
    >
      <Modal.Header>View & edit user</Modal.Header>
      <Modal.Content >
        <Modal.Description>
          <div>
            <div><span className='modal__span'>*</span>Username:</div>
            <div>
              <Input fluid placeholder="Username" 
                value={user.username}
                disabled
              />
            </div>
            <br></br>
            <div><span className='modal__span'>*</span>New Password:</div>
            <div>
              <Input1.Password  placeholder="Password" 
                onChange={e=>dispatch(editIamUserFormChange({newpassword: e.target.value}))}
              />
            </div>
            <br></br>
            <div><span className='modal__span'>*</span>Permission:</div>
            <div>
              <Dropdown
                placeholder={permiss(editUser.permission)}
                onChange={(e,data)=>{
                  dispatch(editIamUserFormChange({permission: data.value}))
                }}
                fluid
                selection
                options={Options}
              />
            </div>
            <div style={{ paddingTop: '10px'}}>
              <div>
                <div>Public Token:</div>
                <Input
                  disabled
                  defaultValue={editUser.publicToken}
                />
                <Button positive onClick={() => {navigator.clipboard.writeText(editUser.publicToken)}}>Copy</Button>
              </div>
              <div>
                <div>Private Token:</div>
                <Input
                  disabled
                  defaultValue={editUser.privateToken}
                />
                <Button positive onClick={() => {navigator.clipboard.writeText(editUser.privateToken)}}>Copy</Button>
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
          onClick={() =>{
            rootUserApi.editIamUser(
              editData._id,
              editData.newpassword,
              editData.permission
            )
              .then(res=>{
                if(res.statusCode===201){
                  setOpen(false)
                  rootUserApi.getListIamUser()
                    .then(res=>{
                      if(res.statusCode===200)
                        dispatch(getListIamUser(res.users))
                    })
                }
              })
          } 
          }
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
