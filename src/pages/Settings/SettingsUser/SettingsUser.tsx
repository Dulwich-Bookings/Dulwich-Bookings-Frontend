import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import HomeHeader from '@components/Home/HomeHeader/HomeHeader';
import SettingNavigation from '@/components/Settings/SettingNavigation/SettingNavigation';
import { Divider, Grid } from '@mui/material';

import { getCurrentUser } from '@/modules/user/userSlice';
import { getCurrentSchool } from '@/modules/school/schoolSlice';
import { settingStateMap } from '@/consts/constants';
import TagDetails from '@/components/Settings/SettingBody/TagDetails/TagDetails';
import { useApi } from '@/api/ApiHandler';
import TagService from '@/api/tag/TagService';
import { TagData } from '@/modules/tag/types';
import { retrieveAllData } from '@/utilities/api';
import Loading from '@/components/Loading/Loading';
import UserDetails from '@/components/Settings/SettingBody/UserDetails/UserDetails';
import UserService from '@/api/user/UserService';
import { UserData } from '@/modules/user/types';

const SettingsUser = () => {
  const currentUser = useSelector(getCurrentUser);
  const currentSchool = useSelector(getCurrentSchool);

  const [getAllUsers] = useApi(() => UserService.getAllUsers(), false, true, false);
  const [allUsers, setAllUsers] = useState<UserData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchData = async () => {
    setIsLoading(true);
    const allUserData = await retrieveAllData<UserData[]>(getAllUsers);

    setAllUsers(allUserData ?? []);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {currentUser && currentSchool && (
        <>
          <HomeHeader currentSchool={currentSchool} currentUser={currentUser} />
          <main>
            <Grid container className='w-screen h-screen pt-10'>
              <Grid item className='w-2/12'>
                <SettingNavigation isClicked={settingStateMap.USERS} />
              </Grid>
              <Divider className='ml-4 mr-16' orientation='vertical' variant='middle' flexItem />
              <Grid item className='w-9/12'>
                {isLoading ? <Loading /> : <UserDetails user={currentUser} usersData={allUsers} handleRefresh={fetchData} />}
              </Grid>
            </Grid>
          </main>
        </>
      )}
    </>
  );
};

export default SettingsUser;
