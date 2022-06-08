import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Routes from '@/utilities/routes';

import Landing from '@pages/Landing/Landing';
import Home from '@pages/Home/Home';
import Test from '@/pages/Test/Test';
import SignUp from '@/pages/SignUp/SignUp';
import ResetPassword from '@/pages/ResetPassword/ResetPassword';
import NewPassword from '@/pages/NewPassword/NewPassword';

const AppRouter = () => {
  return (
    <Switch>
      <Route exact path={Routes.base} component={Landing} />
      <Route exact path={Routes.home} component={Home} />
      <Route exact path={Routes.test} component={Test} />
      <Route exact path={Routes.signup} component={SignUp} />
      <Route exact path={Routes.resetPassword} component={ResetPassword} />
      <Route exact path={Routes.newPassword} component={NewPassword} />
    </Switch>
  );
};

export default AppRouter;
