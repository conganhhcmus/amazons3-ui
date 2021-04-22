import React from 'react';
import 'App.scss';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Login from 'features/Auth/pages/Login';
import NotFound from 'components/NotFound';
import PublicRoute from 'components/PublicRoute';
import PrivateRoute from 'components/PrivateRoute';
import User from 'features/User';
import { Provider } from 'react-redux';
import store from 'app/store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <PublicRoute path="/login" component={Login} />

          <PrivateRoute path="/users" component={User} />

          <Redirect exact from="/" to="/users" />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
