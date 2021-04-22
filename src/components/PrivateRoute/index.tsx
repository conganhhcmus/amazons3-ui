import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'app/store';

const PrivateRoute = ({
  component: Component,
  ...rest
}: {
  component: React.ComponentType<RouteProps>;
  path: string;
}): JSX.Element => {
  const { token } = useSelector((state: RootState) => state.user);

  return <Route {...rest} render={(props) => (token ? <Component {...props} /> : <Redirect to="/login" />)} />;
};

export default PrivateRoute;
