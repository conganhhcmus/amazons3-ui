import React from 'react';
import 'App.scss';
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Login from 'features/Auth/pages/Login';
import NotFound from 'components/NotFound';
import PublicRoute from 'components/PublicRoute';
import PrivateRoute from 'components/PrivateRoute';
import User from 'features/User';
import ResetPassword from "./features/Auth/pages/ResetPassword";
import Register from "./features/Auth/pages/Register";

function App() {
	return (
		<BrowserRouter>
			<Switch>
				<PublicRoute path="/login" component={Login} />

                <PublicRoute path="/register" component={Register} />

                <PublicRoute path="/forgot-password" component={ResetPassword} />

				<PrivateRoute path="/users" component={User} />

				<Redirect exact from="/" to="/users" />
				<Route component={NotFound} />
			</Switch>
		</BrowserRouter>
	)
}

export default App;
