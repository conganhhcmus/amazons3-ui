import {Button, Form, Input} from 'antd';
import React from 'react';
import {Link} from 'react-router-dom';
import {IRegisterValues} from 'constants/interface';

const initialValues = {
    userName: '',
    email: '',
}

interface IProps {
    form: any,
    isSubmitting: boolean,
    onSubmit: (values: IRegisterValues) => void,
}

function ResetPasswordForm(props: IProps) {
    const {form, isSubmitting, onSubmit} = props;

    return (
        <Form
            form={form}
            name="reset password"
            initialValues={initialValues}
            onFinish={onSubmit}
        >
            <div>
                <p className="font-weight-bold mb-0">
                    <span className="text-danger">* </span>
                    <span>Username</span>
                </p>
                <Form.Item
                    name="userName"
                    rules={[{required: true, message: 'Please input your username'}]}
                >
                    <Input
                        size="large"
                    />
                </Form.Item>
            </div>

            <Button htmlType="submit" className="btn-s3 w-100" size="large" loading={isSubmitting}>
                Submit
            </Button>

            <p className="mt-3 mb-0 text-center">Your new password will be send to your email.</p>
            <p><Link className="link-s3 mt-3 mb-0 text-center" to="/login">Back to login</Link></p>
        </Form>
    );
}

export default ResetPasswordForm;
