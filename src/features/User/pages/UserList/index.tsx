import { Button, message } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { removeToken } from 'app/userSlice';

function UserList(): JSX.Element {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(removeToken());
    message.success('Successful logged out');
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center min-vh-100">
      <div className="mb-2">User List Page</div>
      <Button type="primary" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}

export default UserList;
