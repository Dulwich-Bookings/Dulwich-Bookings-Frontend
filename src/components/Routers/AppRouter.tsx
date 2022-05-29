import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Routes from '@/utilities/routes';

import Landing from '@pages/Landing/Landing';
import Home from '@pages/Home/Home';
import Test from '@/pages/Test/Test';

const AppRouter = () => {
  return (
    <Switch>
      <Route exact path={Routes.base} component={Landing} />
      <Route exact path={Routes.home} component={Home} />
      <Route exact path={Routes.test} component={Test} />
    </Switch>
  );
};

export default AppRouter;
