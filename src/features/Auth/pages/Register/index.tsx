import React, { useState } from 'react';
import 'features/Auth/pages/Login/styles.scss';
import { Card, Form, message } from 'antd';
import {IRegisterValues} from 'constants/interface';
import RegisterForm from "features/Auth/components/RegisterForm";
import authApi from 'api/authApi';


function Register() {
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

	const [registerForm] = Form.useForm();

	const handleRegister = (values: IRegisterValues) => {
		setIsSubmitting(true);

		//validate email
        const pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(values.email)){
            message.error("Please input valid email address!");
            setIsSubmitting(false);
            return;
        }

        //validate password
        if (values.confirmPassword !== values.password){
            message.error("Password and confirm password does not match!");
            setIsSubmitting(false);
            return;
        }

        authApi.registerRootUser(values.userName, values.password, values.confirmPassword).then( (res : any) => {
            if (res.statusCode === 201){
                message.success("Register successful!");
            }else if (res.statusCode === 200){
                message.error("Username is already exist!");
            }
            setIsSubmitting(false);
        }).catch((err: any) => {
            setIsSubmitting(false);
            message.error(err?.message);
        });


	}

	return <div className="d-flex justify-content-center align-items-center min-vh-100 container-auth">
		<Card className="container-auth__card">
			<h3 className="font-weight-bold text-center">Register</h3>
			<RegisterForm form={registerForm} isSubmitting={isSubmitting}  onSubmit={handleRegister} />
		</Card>
	</div>;
}

export default Register;
