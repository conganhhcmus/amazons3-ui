import React, { useState } from 'react';
import 'features/Auth/pages/Login/styles.scss';
import { Card, Form, message } from 'antd';
import RegisterForm, { IRegisterValues } from 'features/Auth/components/RegisterForm';
import authApi from 'api/authApi';
// import { useDispatch } from 'react-redux';
// import { saveToken } from 'app/userSlice';

function Register(): JSX.Element {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [registerForm] = Form.useForm();
  // const dispatch = useDispatch();

  const handleRegister = (values: IRegisterValues) => {
    setIsSubmitting(true);
    const { username, password, email } = values;
    authApi
      .registerRootUser(username, password, email)
      .then((res) => {
        console.log('🚀 ~ file: index.tsx ~ line 36 ~ .then ~ res', res);
        // dispatch(saveToken(your_token))
        setIsSubmitting(false);
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
