import React from 'react';
import { Route, useRouteMatch, Switch, Redirect } from 'react-router-dom';
import UserList from './pages/UserList';

function User(): JSX.Element {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route exact path={match.url} component={UserList} />
      <Redirect from="/" to={match.url} />
    </Switch>
  );
}

export default User;
