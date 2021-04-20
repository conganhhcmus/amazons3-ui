import React, { useState } from 'react';
import 'features/Auth/pages/Login/styles.scss';
import { Card, Form, message } from 'antd';
import {IRegisterValues} from 'constants/interface';
import authApi from 'api/authApi';
import { useDispatch } from 'react-redux';
import { saveToken } from 'app/userSlice';
import RegisterForm from "../../components/RegisterForm";

function Register() {
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

	const dispatch = useDispatch();

	const [registerForm] = Form.useForm();

	const handleRegister = (values: IRegisterValues) => {
		setIsSubmitting(true);

        if (values.confirmPassword !== values.password){
            message.success("Password and confirm password does not match!");
            setIsSubmitting(false);
            return;
        }
        message.success("Register successful!");
        setIsSubmitting(false);
	}

	return <div className="d-flex justify-content-center align-items-center min-vh-100 container-auth">
		<Card className="container-auth__card">
			<h3 className="font-weight-bold text-center">Register</h3>
			<RegisterForm form={registerForm} isSubmitting={isSubmitting}  onSubmit={handleRegister} />
		</Card>
	</div>;
}

export default Register;
