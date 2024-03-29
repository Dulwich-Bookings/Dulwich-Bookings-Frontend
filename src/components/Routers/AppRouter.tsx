import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Routes from '@/utilities/routes';
import { getLocalStorageValue } from '@/utilities/localStorage';
import { useApi } from '@/api/ApiHandler';
import UserService from '@/api/user/UserService';
import SchoolService from '@/api/school/SchoolService';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser, updateCurrentUser } from '@/modules/user/userSlice';
import { updateAllSchools, updateCurrentSchool, getAllSchools } from '@/modules/school/schoolSlice';

import Login from '@pages/Landing/Login/Login';
import ForgetPassword from '@pages/Landing/ForgetPassword/ForgetPassword';
import ResetPassword from '@pages/Landing/ResetPassword/ResetPassword';
import ConfirmEmail from '@pages/Landing/ConfirmEmail/ConfirmEmail';
import SignUp from '@pages/Landing/SignUp/SignUp';
import IsTemporaryUser from '@pages/Landing/IsTemporaryUser/IsTemporaryUser';
import Home from '@pages/Home/Home';
import HomeViewAll from '@/pages/Home/HomeViewAll/HomeViewAll';
import Test from '@pages/Test/Test';
import AddResource from '@pages/AddResource/AddResource';
import AddRoom from '@/pages/AddResource/AddRoom/AddRoom';
import AddSubscription from '@/pages/AddResource/AddSubscription/AddSubscription';
import AddTag from '@/pages/AddResource/AddTag/AddTag';
import { isAdmin, isTeacher } from '@/utilities/authorisation';
import Settings from '@/pages/Settings/Settings';
import SettingsResource from '@/pages/Settings/SettingsResource/SettingsResource';
import EditResource from '@/pages/Settings/SettingsResource/EditResource/EditResource';
import EditSubscription from '@/pages/Settings/SettingsResource/EditSubscription.tsx/EditSubscription';
import SettingsTag from '@/pages/Settings/SettingsTag/SettingsTag';
import SettingsUser from '@/pages/Settings/SettingsUser/SettingsUser';
import SettingMilestone from '@/pages/Settings/SettingMilestone/SettingMilestone';

const AppRouter = () => {
  const dispatch = useDispatch();
  const [getSelf] = useApi(() => UserService.getSelf(), false, false, false);
  const [getSchools] = useApi(() => SchoolService.getAllSchools(), false, false, false);
  const accessToken: string | null = getLocalStorageValue('accessToken') ?? null;
  const currentUser = useSelector(getCurrentUser);
  const allSchools = useSelector(getAllSchools);
  const Teacher = isTeacher(currentUser);
  const Admin = isAdmin(currentUser);
  const isTemp = !currentUser?.isConfirmed && currentUser?.isTemporary;

  const fetchSelf = async () => {
    try {
      const res = await getSelf();
      if (!res.isSuccess) return;
      dispatch(updateCurrentUser(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  const fetchSchools = async () => {
    try {
      const res = await getSchools();
      if (!res.isSuccess) return;
      dispatch(updateAllSchools(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  // fetch all data
  useEffect(() => {
    fetchSchools();
    if (!accessToken) return;
    fetchSelf();
  }, [accessToken]);

  // update redux store with current school
  useEffect(() => {
    if (!currentUser || !allSchools) return;
    const currentSchool = allSchools.find(school => school.id === currentUser.schoolId);
    if (!currentSchool) return;
    dispatch(updateCurrentSchool(currentSchool));
  }, [currentUser, allSchools]);

  return (
    <Switch>
      <Route exact path={Routes.base}>
        <Redirect to={accessToken ? (isTemp ? Routes.authentication.isTempUser : Routes.home.main) : Routes.authentication.login} />
      </Route>
      <Route exact path={Routes.authentication.login} component={Login} />
      <Route exact path={Routes.authentication.forgetPassword} component={ForgetPassword} />
      <Route exact path={Routes.authentication.setPassword} component={ResetPassword} />
      <Route exact path={Routes.authentication.signUp} component={SignUp} />
      <Route exact path={Routes.authentication.confirmEmail} component={ConfirmEmail} />
      {accessToken && <Route exact path={Routes.authentication.isTempUser} component={IsTemporaryUser} />}

      {accessToken && !isTemp && <Route exact path={Routes.home.main} component={Home} />}
      {accessToken && !isTemp && <Route exact path={Routes.home.viewAll} component={HomeViewAll} />}

      {accessToken && !isTemp && <Route exact path={Routes.settings.main} component={Settings} />}
      {accessToken && !isTemp && <Route exact path={Routes.settings.resources.main} component={SettingsResource} />}
      {accessToken && !isTemp && <Route exact path={Routes.settings.resources.editResource} component={EditResource} />}
      {accessToken && !isTemp && <Route exact path={Routes.settings.resources.editSubscription} component={EditSubscription} />}
      {Teacher && accessToken && !isTemp && <Route exact path={Routes.settings.tags} component={SettingsTag} />}
      {Admin && accessToken && !isTemp && <Route exact path={Routes.settings.milestone} component={SettingMilestone} />}
      {Admin && accessToken && !isTemp && <Route exact path={Routes.settings.users} component={SettingsUser} />}

      {Teacher && accessToken && !isTemp && <Route exact path={Routes.addResource.main} component={AddResource} />}
      {Teacher && accessToken && !isTemp && <Route exact path={Routes.addResource.addRoom} component={AddRoom} />}
      {Teacher && accessToken && !isTemp && <Route exact path={Routes.addResource.addSubscription} component={AddSubscription} />}
      {Teacher && accessToken && !isTemp && <Route exact path={Routes.addResource.addTag} component={AddTag} />}
      <Route exact path={Routes.test} component={Test} />
      <Route exact path='*'>
        <Redirect to={Routes.base} />
      </Route>
    </Switch>
  );
};

export default AppRouter;
