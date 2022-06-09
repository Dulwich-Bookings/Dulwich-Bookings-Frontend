import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Routes from '@/utilities/routes';

import Login from '@/pages/Landing/Login';
import Home from '@pages/Home/Home';
import Test from '@/pages/Test/Test';

const AppRouter = () => {
  return (
    <Switch>
      <Route exact path={Routes.authentication.login} component={Login} />
      <Route exact path={Routes.home} component={Home} />
      <Route exact path={Routes.test} component={Test} />
    </Switch>
  );
};

export default AppRouter;
