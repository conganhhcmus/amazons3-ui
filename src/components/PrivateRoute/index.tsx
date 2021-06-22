import React, { useEffect } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'app/store';
import rootUserApi from 'api/rootuserApi';
import { saveUserInfo } from 'app/userSlice';

const PrivateRoute = ({
  component: Component,
  ...rest
}: {
  component: React.ComponentType<RouteProps>;
  path: string;
}): JSX.Element => {
  const { token, userInfo } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      rootUserApi.getDetailsUser(userInfo?.userId).then((res: any) => {
        dispatch(
          saveUserInfo({
            ...userInfo,
            ...res?.user,
          }),
        );
      });
    }
  }, []);

  return <Route {...rest} render={(props) => (token ? <Component {...props} /> : <Redirect to="/login" />)} />;
};

export default PrivateRoute;
