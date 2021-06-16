import React from 'react';
import { Route, useRouteMatch, Switch, Redirect } from 'react-router-dom';
import BucketDetail from './pages/BucketDetail';
import BucketList from './pages/BucketList';
import FolderDetail from './pages/FolderDetail';

function Bucket(): JSX.Element {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route exact path={match.url} component={BucketList} />
      <Route exact path={`${match.url}/:id`} component={BucketDetail} />
      <Route exact path={`${match.url}/:id/folder/:parent`} component={FolderDetail} />
      <Redirect from="/" to={match.url} />
    </Switch>
  );
}

export default Bucket;
