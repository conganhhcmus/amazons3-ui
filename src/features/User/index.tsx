import React from "react";
import { Route, useRouteMatch, Switch } from "react-router-dom";
import UserList from "./pages/UserList";

function User() {
	const match = useRouteMatch();

	return (
		<Switch>
			<Route exact path={match.url} component={UserList} />
		</Switch>
	);
}

export default User;