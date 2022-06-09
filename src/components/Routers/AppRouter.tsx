import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Routes from '@/utilities/routes';
import { getLocalStorageValue } from '@/utilities/localStorage';

import Login from '@/pages/Landing/Login/Login';
import Home from '@pages/Home/Home';
import Test from '@/pages/Test/Test';

const AppRouter = () => {
  const accessToken: string | null = getLocalStorageValue('accessToken') ?? null;

  return (
    <Switch>
      <Route exact path={Routes.base}>
        <Redirect to={accessToken ? Routes.home : Routes.authentication.login} />
      </Route>
      <Route exact path={Routes.authentication.login} component={Login} />
      <Route exact path={Routes.test} component={Test} />
      {accessToken && <Route exact path={Routes.home} component={Home} />}
      <Route exact path='*'>
        <Redirect to={Routes.base} />
      </Route>
    </Switch>
  );
};

export default AppRouter;
