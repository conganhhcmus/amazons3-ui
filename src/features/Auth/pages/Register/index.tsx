import React, { useState } from 'react';
import 'features/Auth/pages/Login/styles.scss';
import { Card, Form, message } from 'antd';
import RegisterForm, { IRegisterValues } from 'features/Auth/components/RegisterForm';
import authApi from 'api/authApi';
import { useHistory } from 'react-router';

function Register(): JSX.Element {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [registerForm] = Form.useForm();
  const history = useHistory();

  const handleRegister = (values: IRegisterValues) => {
    setIsSubmitting(true);
    const { username, password, email } = values;
    authApi
      .registerRootUser(username, password, email)
      .then(() => {
        setIsSubmitting(false);
        history.push('/login');
        message.success('Successful registered. Please login!');
      })
      .catch((err: Error) => {
        setIsSubmitting(false);
        message.error(err?.message);
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 container-auth">
      <Card className="container-auth__card">
        <h2 className="font-weight-bold text-center">Register</h2>
        <RegisterForm form={registerForm} isSubmitting={isSubmitting} onSubmit={handleRegister} />
      </Card>
    </div>
  );
}

export default Register;
