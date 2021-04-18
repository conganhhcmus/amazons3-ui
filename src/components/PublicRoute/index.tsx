import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = ({ component: Component, ...rest }: any) => {
	const { token } = useSelector((state: any) => state.user);

	return (
		<Route
			{...rest}
			render={(props) =>
				token ? <Redirect to="/" /> : <Component {...props} />
			}
		/>
	);
};

export default PublicRoute;