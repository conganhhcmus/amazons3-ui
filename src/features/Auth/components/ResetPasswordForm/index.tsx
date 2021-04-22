import { Button, Form, FormInstance, Input } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { IRegisterValues } from '../RegisterForm';

const initialValues = {
  userName: '',
  email: '',
};

interface IProps {
  form: FormInstance;
  isSubmitting: boolean;
  onSubmit: (values: IRegisterValues) => void;
}

function ResetPasswordForm(props: IProps): JSX.Element {
  const { form, isSubmitting, onSubmit } = props;

  return (
    <Form form={form} name="reset password" initialValues={initialValues} onFinish={onSubmit}>
      <div>
        <p className="font-weight-bold mb-0">
          <span className="text-danger">* </span>
          <span>Email</span>
        </p>
        <Form.Item name="email" rules={[{ required: true, message: 'Please input your email' }]}>
          <Input size="large" />
        </Form.Item>
      </div>

      <Button htmlType="submit" className="btn-s3 w-100" size="large" loading={isSubmitting}>
        Submit
      </Button>

      <p className="mt-3 mb-0 text-center">Your new password will be send to your email.</p>
      <p className="text-center mt-3 mb-0">
        <Link className="link-s3" to="/login">
          Back to login
        </Link>
      </p>
    </Form>
  );
}

export default ResetPasswordForm;
