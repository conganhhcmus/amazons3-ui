import React from 'react';
import 'App.less';
import 'styles/common.scss';
import { BrowserRouter, Redirect, Switch } from 'react-router-dom';
import Login from 'features/Auth/pages/Login';
import PublicRoute from 'components/PublicRoute';
// import PrivateRoute from 'components/PrivateRoute';
import User from 'features/User';
import { Provider } from 'react-redux';
import store from 'app/store';
import ResetPassword from './features/Auth/pages/ResetPassword';
import Register from './features/Auth/pages/Register';
import Layout from 'components/Layout';
import Bucket from 'features/Bucket';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <PublicRoute path="/login" component={Login} />
          <PublicRoute path="/register" component={Register} />
          <PublicRoute path="/forgot-password" component={ResetPassword} />

          <Layout>
            <Switch>
              <PublicRoute path="/buckets" component={Bucket} />
              <PublicRoute path="/users" component={User} />
              <Redirect from="/" to="/buckets" />
            </Switch>
          </Layout>
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
