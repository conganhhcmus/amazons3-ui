import { Button, Form, Input } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { ILoginValues } from 'constants/interface';
import { ETypeUser } from 'constants/enum';

const initialValues: ILoginValues = {
	rootUsername: '',
	username: '',
	password: '',
}

interface IProps {
	form: any,
	isSubmitting: boolean,
	typeUser: number,
	onSubmit: (values: ILoginValues) => void,
}

function LoginForm(props: IProps) {
	const { form, isSubmitting, typeUser, onSubmit } = props;

	return (
		<Form
			form={form}
			name="login"
			initialValues={initialValues}
			onFinish={onSubmit}
		>
			{typeUser === ETypeUser.user && (
				<>
					<p className="label required">Root Username</p>
					<Form.Item
						name="rootUsername"
						rules={[{ required: true, message: 'Please input root username' }]}
					>
						<Input size="large" />
					</Form.Item>
				</>
			)}
			<p className="label required">Username</p>
			<Form.Item
				name="username"
				rules={[{ required: true, message: 'Please input username' }]}
			>
				<Input size="large" />
			</Form.Item>
			<p className="label required">Password</p>
			<Form.Item
				name="password"
				rules={[{ required: true, message: 'Please input password!' }]}
			>
				<Input.Password size="large" />
			</Form.Item>
			{typeUser === ETypeUser.rootUser && (
				<div className="d-flex justify-content-end mb-3">
					<Link to="/forgot-password" style={{ color: 'inherit' }}>Forgot password</Link>
				</div>
			)}
			<Button htmlType="submit" className="btn-s3 w-100" size="large" loading={isSubmitting}>
				Log in
				</Button>
			{typeUser === ETypeUser.rootUser && <p className="mt-3 mb-0 text-center">Don't have an account yet? <Link className="link-s3" to="/register">Register</Link></p>}
		</Form>
	);
}

export default LoginForm;