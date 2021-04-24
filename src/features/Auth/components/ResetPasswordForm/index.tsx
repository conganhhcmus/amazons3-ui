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
        <p className="label required">Email</p>
        <Form.Item
          name="email"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid email',
            },
            {
              required: true,
              message: 'Please input email',
            },
          ]}
        >
          <Input size="large" />
        </Form.Item>
      </div>

      <Button type="primary" htmlType="submit" className="w-100" size="large" loading={isSubmitting}>
        Submit
      </Button>

      <p className="mt-3 mb-0 text-center">Your new password will be send to your email.</p>
      <p className="text-center mt-3 mb-0">
        <Link to="/login">Back to login</Link>
      </p>
    </Form>
  );
}

export default ResetPasswordForm;
