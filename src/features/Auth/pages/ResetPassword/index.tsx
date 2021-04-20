import React, { useState } from 'react';
import 'features/Auth/pages/Login/styles.scss';
import { Card, Form, message } from 'antd';
import { useDispatch } from 'react-redux';
import ResetPasswordForm from "../../components/ResetPasswordForm";

function ResetPassword() {
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

	const dispatch = useDispatch();

	const [registerForm] = Form.useForm();

	const handleResetPassword = (values: any) => {
		setIsSubmitting(true);


	}

	return <div className="d-flex justify-content-center align-items-center min-vh-100 container-auth">
		<Card className="container-auth__card">
			<h3 className="font-weight-bold text-center">Reset password</h3>
			<ResetPasswordForm form={registerForm} isSubmitting={isSubmitting}  onSubmit={handleResetPassword} />
		</Card>
	</div>;
}

export default ResetPassword;
