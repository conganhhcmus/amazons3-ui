import { Button, Form, FormInstance, Input } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

export interface IRegisterValues {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const initialValues: IRegisterValues = {
  userName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

interface IProps {
  form: FormInstance;
  isSubmitting: boolean;
  onSubmit: (values: IRegisterValues) => void;
}

function RegisterForm(props: IProps): JSX.Element {
  const { form, isSubmitting, onSubmit } = props;

  return (
    <Form form={form} name="register" initialValues={initialValues} onFinish={onSubmit}>
      <div>
        <p className="font-weight-bold mb-0">
          <span className="text-danger">* </span>
          <span>Username</span>
        </p>
        <Form.Item name="userName" rules={[{ required: true, message: 'Please input your username' }]}>
          <Input size="large" />
        </Form.Item>
      </div>

      <div>
        <p className="font-weight-bold mb-0">
          <span className="text-danger">* </span>
          <span>Email</span>
        </p>

        <Form.Item name="email" rules={[{ required: true, message: 'Please input your email address' }]}>
          <Input size="large" />
        </Form.Item>
      </div>

      <div>
        <p className="font-weight-bold mb-0">
          <span className="text-danger">* </span>
          <span>Password</span>
        </p>
        <Form.Item name="password" rules={[{ required: true, message: 'Please input your password' }]}>
          <Input.Password size="large" />
        </Form.Item>
      </div>

      <div>
        <p className="font-weight-bold mb-0">
          <span className="text-danger">* </span>
          <span>Confirm password</span>
        </p>
        <Form.Item name="confirmPassword" rules={[{ required: true, message: 'Please confirm your password' }]}>
          <Input.Password size="large" />
        </Form.Item>
      </div>

      <Button type="primary" htmlType="submit" className="w-100" size="large" loading={isSubmitting}>
        Register
      </Button>

      <p className="mt-3 mb-0 text-center">
        Already have an account?{' '}
        <Link className="link-s3" to="/login">
          Login
        </Link>
      </p>
    </Form>
  );
}

export default RegisterForm;
