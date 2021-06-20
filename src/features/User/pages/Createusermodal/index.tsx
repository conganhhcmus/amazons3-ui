import React from 'react'
import { Modal,Dropdown,Button } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux';
import { createIamUser } from 'app/userlist/userliststore'
import {  Input, Button as Button1} from 'antd';
import  rootUserApi  from 'api/rootuserApi';
import { RootState } from 'app/store';
import {getListIamUser } from 'app/userlist/userliststore'
interface Ioption{
  key: number,
  value: number,
  text: string
}
const Options: Ioption[]=[
  {
    key: 1,
    value:99,
    text: 'Full Access'
  },
  {
    key: 2,
    value:0,
    text: 'Read Only'
  },
  {
    key: 3,
    value:1,
    text: 'Write Only'
  },
  {
    key: 4,
    value:-1,
    text: 'No Access'
  },
]
function Createusermodal(): JSX.Element {
  const [open, setOpen] = React.useState<boolean>(false)
  const dispatch = useDispatch()
  const user=useSelector((state:RootState)=>state.userlistReducer.createIamUser)
  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button1 className="ml-2" type="primary">
        Create
      </Button1>}
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
            <div><span className='modal__span'>*</span>permission:</div>
            <div>
              <Dropdown
                onChange={(e,data)=>dispatch(createIamUser({permission: data.value}))}
                placeholder='Select permission'
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
          onClick={() =>{
            setOpen(false)
            rootUserApi.createIamUser(user.userName,user.passWord,user.permission)
              .then(()=>rootUserApi.getListIamUser()
                .then(res=>{
                  if(res.statusCode===200)
                    dispatch(getListIamUser(res.users))
                })
              
              )
          }
   
          }
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}

export default Createusermodal
