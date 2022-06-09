import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Routes from '@/utilities/routes';
import { getLocalStorageValue } from '@/utilities/localStorage';

import Login from '@pages/Landing/Login/Login';
import ForgetPassword from '@pages/Landing/ForgetPassword/ForgetPassword';
import ResetPassword from '@pages/Landing/ResetPassword/ResetPassword';
import SignUp from '@/pages/Landing/SignUp/SignUp';
import Home from '@pages/Home/Home';
import Test from '@pages/Test/Test';

const AppRouter = () => {
  const accessToken: string | null = getLocalStorageValue('accessToken') ?? null;

  return (
    <Switch>
      <Route exact path={Routes.base}>
        <Redirect to={accessToken ? Routes.home : Routes.authentication.login} />
      </Route>
      <Route exact path={Routes.authentication.login} component={Login} />
      <Route exact path={Routes.authentication.forgetPassword} component={ForgetPassword} />
      <Route exact path={Routes.authentication.resetPassword} component={ResetPassword} />
      <Route exact path={Routes.authentication.signUp} component={SignUp} />
      {accessToken && <Route exact path={Routes.home} component={Home} />}
      <Route exact path={Routes.test} component={Test} />
      <Route exact path='*'>
        <Redirect to={Routes.base} />
      </Route>
    </Switch>
  );
};

export default AppRouter;
