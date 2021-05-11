import React, { useState } from 'react';
import 'features/Auth/pages/Login/styles.scss';
import { Card, Form, message } from 'antd';
import LoginForm, { ILoginValues } from 'features/Auth/components/LoginForm';
import { ETypeUser } from 'constants/enum';
import UserFrame from 'features/Auth/components/UserFrame';
import IconRootUser from 'assets/icon/IconRootUser';
import IconUser from 'assets/icon/IconUser';
import authApi from 'api/authApi';
import { useDispatch } from 'react-redux';
import { saveToken } from 'app/userSlice';

function Login(): JSX.Element {
  const [currentTypeUser, setCurrentTypeUser] = useState<number>(ETypeUser.rootUser);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const dispatch = useDispatch();

  const [loginForm] = Form.useForm();

  const handleClickUserFrame = (type: number) => {
    setCurrentTypeUser(type);
    loginForm.resetFields();
  };

  const handleLogin = (values: ILoginValues) => {
    setIsSubmitting(true);

    if (currentTypeUser === ETypeUser.rootUser) {
      const { username, password } = values;

      authApi
        .loginRootUser(username, password)
        .then((res) => {
          const { accessToken } = res?.data;
          if (!accessToken) throw new Error(res?.data?.msg || '');
          dispatch(saveToken(accessToken));
          setIsSubmitting(false);
          message.success('Successful logged in');
        })
        .catch((err: Error) => {
          setIsSubmitting(false);
          message.error(err?.message);
        });
    } else if (currentTypeUser === ETypeUser.user) {
      const { rootUsername, username, password } = values;

      authApi
        .loginUser(rootUsername, username, password)
        .then((res) => {
          const { accessToken } = res?.data;
          if (!accessToken) throw new Error(res?.data?.msg || '');
          dispatch(saveToken(accessToken));
          setIsSubmitting(false);
          message.success('Successful logged in');
        })
        .catch((err: Error) => {
          setIsSubmitting(false);
          message.error(err?.message);
        });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 container-auth">
      <Card className="container-auth__card">
        <h2 className="font-weight-bold text-center">Login</h2>
        <p className="text-center">Choose type account</p>
        <div className="d-flex justify-content-center">
          <UserFrame
            className="mr-4"
            title="Root user"
            icon={<IconRootUser />}
            onClick={() => handleClickUserFrame(ETypeUser.rootUser)}
            highlight={currentTypeUser === ETypeUser.rootUser}
          />
          <UserFrame
            title="User"
            icon={<IconUser />}
            onClick={() => handleClickUserFrame(ETypeUser.user)}
            highlight={currentTypeUser === ETypeUser.user}
          />
        </div>
        <LoginForm form={loginForm} isSubmitting={isSubmitting} typeUser={currentTypeUser} onSubmit={handleLogin} />
      </Card>
    </div>
  );
}

export default Login;
