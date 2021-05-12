import React from 'react'
import { Button, Modal,Dropdown } from 'semantic-ui-react'
import { useDispatch } from 'react-redux';
import { createIamUser } from 'app/userlist/userliststore'
import {  Input } from 'antd';
interface Ioption{
  key: string,
  value: string,
  text: string
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
function Createusermodal(): JSX.Element {
  const [open, setOpen] = React.useState<boolean>(false)
  const dispatch = useDispatch()
  return (
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
                placeholder='Select permisstion'
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
  )
}

export default Createusermodal
