import React, { useState } from 'react';
import 'features/Auth/pages/Login/styles.scss';
import { Card, Form } from 'antd';
//import { useDispatch } from 'react-redux';
import ResetPasswordForm from 'features/Auth/components/ResetPasswordForm';
import { IRegisterValues } from 'features/Auth/components/RegisterForm';

function ResetPassword(): JSX.Element {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  //const dispatch = useDispatch();

  const [registerForm] = Form.useForm();

  const handleResetPassword = (values: IRegisterValues) => {
    console.log('🚀 ~ file: index.tsx ~ line 16 ~ handleResetPassword ~ values', values);
    setIsSubmitting(true);
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 container-auth">
      <Card className="container-auth__card">
        <h3 className="font-weight-bold text-center">Reset password</h3>
        <ResetPasswordForm form={registerForm} isSubmitting={isSubmitting} onSubmit={handleResetPassword} />
      </Card>
    </div>
  );
}

export default ResetPassword;
