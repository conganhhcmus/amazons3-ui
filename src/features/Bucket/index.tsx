import React from 'react';
import { Route, useRouteMatch, Switch, Redirect } from 'react-router-dom';
import BucketDetail from './pages/BucketDetail';
import BucketList from './pages/BucketList';

function Bucket(): JSX.Element {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route exact path={match.url} component={BucketList} />
      <Route exact path={`${match.url}/:id`} component={BucketDetail} />
      <Redirect from="/" to={match.url} />
    </Switch>
  );
}

export default Bucket;
