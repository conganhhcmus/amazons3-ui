import { Button, Form, FormInstance, Input } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

export interface IRegisterValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const initialValues: IRegisterValues = {
  username: '',
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
        <p className="label required">Username</p>
        <Form.Item name="username" rules={[{ required: true, message: 'Please input your username' }]}>
          <Input size="large" />
        </Form.Item>
      </div>

      <div>
        <p className="label required">Email</p>
        <Form.Item
          name="email"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid email!',
            },
            {
              required: true,
              message: 'Please input email!',
            },
          ]}
        >
          <Input size="large" />
        </Form.Item>
      </div>

      <div>
        <p className="label required">Password</p>
        <Form.Item name="password" rules={[{ required: true, message: 'Please input your password' }]}>
          <Input.Password size="large" />
        </Form.Item>
      </div>

      <div>
        <p className="label required">Confirm password</p>
        <Form.Item
          name="confirmPassword"
          rules={[
            { required: true, message: 'Please confirm your password' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords do not match'));
              },
            }),
          ]}
        >
          <Input.Password size="large" />
        </Form.Item>
      </div>

      <Button type="primary" htmlType="submit" className="w-100" size="large" loading={isSubmitting}>
        Register
      </Button>

      <p className="mt-3 mb-0 text-center">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </Form>
  );
}

export default RegisterForm;
