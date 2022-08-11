import React from 'react';
import { useSelector } from 'react-redux';

import HomeHeader from '@components/Home/HomeHeader/HomeHeader';
import SettingNavigation from '@/components/Settings/SettingNavigation/SettingNavigation';
import { Divider, Grid } from '@mui/material';

import { getCurrentUser } from '@/modules/user/userSlice';
import { getCurrentSchool } from '@/modules/school/schoolSlice';
import { settingStateMap } from '@/consts/constants';
import AccountDetails from '@/components/Settings/SettingBody/AccountDetails/AccountDetails';

const Settings = () => {
  const currentUser = useSelector(getCurrentUser);
  const currentSchool = useSelector(getCurrentSchool);

  return (
    <>
      {currentUser && currentSchool && (
        <>
          <HomeHeader currentSchool={currentSchool} currentUser={currentUser} />
          <main>
            <Grid container className='w-screen h-screen pt-10'>
              <Grid item className='w-2/12'>
                <SettingNavigation isClicked={settingStateMap.ACCOUNT} />
              </Grid>
              <Divider className='ml-4 mr-16' orientation='vertical' variant='middle' flexItem />
              <Grid item className='w-9/12'>
                <AccountDetails user={currentUser} />
              </Grid>
            </Grid>
          </main>
        </>
      )}
    </>
  );
};

export default Settings;
