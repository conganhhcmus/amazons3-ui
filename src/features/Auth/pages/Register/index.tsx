import React, { useState } from 'react';
import 'features/Auth/pages/Login/styles.scss';
import { Card, Form, message } from 'antd';
import RegisterForm, { IRegisterValues } from 'features/Auth/components/RegisterForm';
import authApi from 'api/authApi';

function Register(): JSX.Element {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [registerForm] = Form.useForm();

  const handleRegister = (values: IRegisterValues) => {
    setIsSubmitting(true);

    authApi
      .registerRootUser(values.userName, values.password, values.confirmPassword)
      .then((res) => {
        console.log('🚀 ~ file: index.tsx ~ line 36 ~ .then ~ res', res);
        // if (res.statusCode === 201) {
        //   message.success('Register successful!');
        // } else if (res.statusCode === 200) {
        //   message.error('Username is already exist!');
        // }
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
