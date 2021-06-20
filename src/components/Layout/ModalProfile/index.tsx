import { Input as Input1 } from 'antd';
import rootUserApi from 'api/rootuserApi';
import React from 'react';
import { Button, Dropdown, Input, Modal } from 'semantic-ui-react';
rootUserApi;
interface Ioption {
  key: string;
  value: number;
  text: string;
}
interface IProps {
  open: boolean;
  toggle: () => void;
  user: any;
}
const Options: Ioption[] = [
  {
    key: 'fullaccess',
    value: 99,
    text: 'Full Access',
  },
  {
    key: 'readonly',
    value: 0,
    text: 'Read Only',
  },
  {
    key: 'writeonly',
    value: 1,
    text: 'Write Only',
  },
  {
    key: 'noaccess',
    value: -1,
    text: 'No Access',
  },
];
function ModalProfile(props: IProps): JSX.Element {
  const { open, toggle, user } = props;
  const permiss = (data: number) => {
    if (data == 99) return 'Full Access';
    if (data == 1) return 'Write only';
    if (data == 0) return 'Read only';
    return 'No access';
  };
  return (
    <Modal onClose={toggle} onOpen={toggle} open={open}>
      <Modal.Header>Profile</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <div>
            <div>
              <span className="modal__span">*</span>Username:
            </div>
            <div>
              <Input fluid placeholder="Username" value={user?.username} disabled />
            </div>
            <br></br>
            <div>
              <span className="modal__span">*</span>Password:
            </div>
            <div>
              <Input1.Password placeholder="Password" />
            </div>
            <br></br>
            <div>
              <span className="modal__span">*</span>Permission:
            </div>
            <div>
              <Dropdown placeholder={permiss(user?.permission)} fluid selection options={Options} />
            </div>
            <div style={{ paddingTop: '10px' }}>
              <div>
                <div>Public Token:</div>
                <Input disabled defaultValue={user?.publicToken} />
                <Button
                  positive
                  onClick={() => {
                    navigator.clipboard.writeText(user?.publicToken);
                  }}
                >
                  Copy
                </Button>
              </div>
              <div>
                <div>Private Token:</div>
                <Input disabled defaultValue={user?.privateToken} />
                <Button
                  positive
                  onClick={() => {
                    navigator.clipboard.writeText(user?.privateToken);
                  }}
                >
                  Copy
                </Button>
              </div>
            </div>
          </div>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button content="Close" onClick={toggle} positive />
      </Modal.Actions>
    </Modal>
  );
}

export default ModalProfile;
