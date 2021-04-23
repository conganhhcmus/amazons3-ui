import React from 'react';
import 'App.less';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Login from 'features/Auth/pages/Login';
import NotFound from 'components/NotFound';
import PublicRoute from 'components/PublicRoute';
import PrivateRoute from 'components/PrivateRoute';
import User from 'features/User';
import { Provider } from 'react-redux';
import store from 'app/store';
import ResetPassword from './features/Auth/pages/ResetPassword';
import Register from './features/Auth/pages/Register';

function App(): JSX.Element {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;
