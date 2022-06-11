import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Routes from '@/utilities/routes';
import { getLocalStorageValue } from '@/utilities/localStorage';
import { useApi } from '@/api/ApiHandler';
import UserService from '@/api/user/UserService';
import { useDispatch } from 'react-redux';
import { updateCurrentUser } from '@/modules/user/userSlice';

import Login from '@pages/Landing/Login/Login';
import ForgetPassword from '@pages/Landing/ForgetPassword/ForgetPassword';
import ResetPassword from '@pages/Landing/ResetPassword/ResetPassword';
import SignUp from '@/pages/Landing/SignUp/SignUp';
import Home from '@pages/Home/Home';
import Test from '@pages/Test/Test';

const AppRouter = () => {
  const dispatch = useDispatch();
  const accessToken: string | null = getLocalStorageValue('accessToken') ?? null;
  const [getSelf] = useApi(() => UserService.getSelf(), false, false, false);

  const fetchUser = async () => {
    try {
      const res = await getSelf();
      if (res.isSuccess) {
        dispatch(updateCurrentUser(res.data));
        console.log(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!accessToken) return;
    fetchUser();
  }, []);

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
