import React from 'react';

import HomeHeader from '@components/Home/HomeHeader/HomeHeader';

import { useSelector } from 'react-redux';
import { getCurrentUser } from '@/modules/user/userSlice';
import { getCurrentSchool } from '@/modules/school/schoolSlice';

import { Divider, Grid } from '@mui/material';
import SettingNavigation from '@/components/Settings/SettingNavigation/SettingNavigation';

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
              <Grid item className='w-72'>
                <SettingNavigation />
              </Grid>
              <Divider className='mx-4' orientation='vertical' variant='middle' flexItem />
              <Grid item className='w-auto'>
                Aing
              </Grid>
            </Grid>
          </main>
        </>
      )}
    </>
  );
};

export default Settings;
