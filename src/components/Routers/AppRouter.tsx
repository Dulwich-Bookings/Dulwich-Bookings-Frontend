import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Routes from '@/utilities/routes';

import Landing from '@pages/Landing/Landing';
import Home from '@pages/Home/Home';

const AppRouter = () => {
  return (
    <Switch>
      <Route exact path={Routes.base} component={Landing} />
      <Route exact path={Routes.home} component={Home} />
    </Switch>
  );
};

export default AppRouter;
