import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Routes from '@/utilities/routes';
import { getLocalStorageValue } from '@/utilities/localStorage';
import { useApi } from '@/api/ApiHandler';
import UserService from '@/api/user/UserService';
import SchoolService from '@/api/school/SchoolService';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser, updateCurrentUser } from '@/modules/user/userSlice';
import { updateCurrentSchool } from '@/modules/school/schoolSlice';

import Login from '@pages/Landing/Login/Login';
import ForgetPassword from '@pages/Landing/ForgetPassword/ForgetPassword';
import ResetPassword from '@pages/Landing/ResetPassword/ResetPassword';
import ConfirmEmail from '@pages/Landing/ConfirmEmail/ConfirmEmail';
import SignUp from '@pages/Landing/SignUp/SignUp';
import IsTemporaryUser from '@pages/Landing/IsTemporaryUser/IsTemporaryUser';
import Home from '@pages/Home/Home';
import Test from '@pages/Test/Test';

const AppRouter = () => {
  const dispatch = useDispatch();
  const accessToken: string | null = getLocalStorageValue('accessToken') ?? null;
  const currentUser = useSelector(getCurrentUser);
  const isTemp = !currentUser?.isConfirmed && currentUser?.isTemporary;
  const [getSelf] = useApi(() => UserService.getSelf(), false, false, false);
  const [getSchool] = useApi(() => SchoolService.getSchoolById(currentUser?.id ?? 0), false, false, false);

  const fetchSelf = async () => {
    try {
      const res = await getSelf();
      if (!res.isSuccess) return;
      dispatch(updateCurrentUser(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  const fetchSchool = async () => {
    try {
      const res = await getSchool();
      if (!res.isSuccess) return;
      dispatch(updateCurrentSchool(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!accessToken) return;
    fetchSelf();
  }, []);

  useEffect(() => {
    if (!currentUser || !accessToken) return;
    fetchSchool();
  }, [currentUser]);

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
      <Route exact path='*'>
        <Redirect to={Routes.base} />
      </Route>
    </Switch>
  );
};

export default AppRouter;
