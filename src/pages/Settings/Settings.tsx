import React from 'react';
import { useSelector } from 'react-redux';

import HomeHeader from '@components/Home/HomeHeader/HomeHeader';
import SettingNavigation from '@/components/Settings/SettingNavigation/SettingNavigation';
import { Grid } from '@mui/material';

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
            <Grid container className='w-screen h-screen'>
              <SettingNavigation isClicked={settingStateMap.ACCOUNT} />

              <Grid className='settingLaptop:w-9/12 settingLaptop:pl-0 settingPhone:w-11/12 settingPhone:pl-12 settingPhone:block hidden pt-10 '>
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
