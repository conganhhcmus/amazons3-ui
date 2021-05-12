import React from 'react';
import { Route, useRouteMatch, Switch } from 'react-router-dom';
import ObjectInfo from "features/Object/pages/ObjectInfo";

function BucketObject(): JSX.Element {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${match.url}/:id`} component={ObjectInfo} />
    </Switch>
  );
}

export default BucketObject;
