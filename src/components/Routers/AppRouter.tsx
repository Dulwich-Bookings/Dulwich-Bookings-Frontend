import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Routes from '@/utilities/routes';
import { getLocalStorageValue } from '@/utilities/localStorage';
import { useApi } from '@/api/ApiHandler';
import UserService from '@/api/user/UserService';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '@/modules/user/userSlice';
import { updateCurrentUser } from '@/modules/user/userSlice';

import Login from '@pages/Landing/Login/Login';
import ForgetPassword from '@pages/Landing/ForgetPassword/ForgetPassword';
import ResetPassword from '@pages/Landing/ResetPassword/ResetPassword';
import ConfirmEmail from '@pages/Landing/ConfirmEmail/ConfirmEmail';
import SignUp from '@pages/Landing/SignUp/SignUp';
import IsTemporaryUser from '@pages/Landing/IsTemporaryUser/IsTemporaryUser';
import Home from '@pages/Home/Home';
<<<<<<< HEAD
import Test from '@/pages/Test/Test';
import SignUp from '@/pages/SignUp/SignUp';
import ResetPassword from '@/pages/ResetPassword/ResetPassword';
import NewPassword from '@/pages/NewPassword/NewPassword';
=======
import Test from '@pages/Test/Test';
>>>>>>> 0137b070648b33a00705bc06362f651cc1513b50

const AppRouter = () => {
  const dispatch = useDispatch();
  const accessToken: string | null = getLocalStorageValue('accessToken') ?? null;
  const [getSelf] = useApi(() => UserService.getSelf(), false, false, false);
  const currentUser = useSelector(getCurrentUser);
  const isTemp = !currentUser?.isConfirmed && currentUser?.isTemporary;
  console.log(isTemp);

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
        <Redirect to={accessToken ? (isTemp ? Routes.authentication.isTempUser : Routes.home) : Routes.authentication.login} />
      </Route>
      <Route exact path={Routes.authentication.login} component={Login} />
      <Route exact path={Routes.authentication.forgetPassword} component={ForgetPassword} />
      <Route exact path={Routes.authentication.setPassword} component={ResetPassword} />
      <Route exact path={Routes.authentication.signUp} component={SignUp} />
      <Route exact path={Routes.authentication.confirmEmail} component={ConfirmEmail} />
      {accessToken && <Route exact path={Routes.authentication.isTempUser} component={IsTemporaryUser} />}
      {accessToken && !isTemp && <Route exact path={Routes.home} component={Home} />}
      <Route exact path={Routes.test} component={Test} />
<<<<<<< HEAD
      <Route exact path={Routes.signup} component={SignUp} />
      <Route exact path={Routes.resetPassword} component={ResetPassword} />
      <Route exact path={Routes.newPassword} component={NewPassword} />
=======
      <Route exact path='*'>
        <Redirect to={Routes.base} />
      </Route>
>>>>>>> 0137b070648b33a00705bc06362f651cc1513b50
    </Switch>
  );
};

export default AppRouter;
