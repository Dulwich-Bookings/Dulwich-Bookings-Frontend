import React from 'react';
import { useSelector } from 'react-redux';

import HomeHeader from '@components/Home/HomeHeader/HomeHeader';
import SettingNavigation from '@/components/Settings/SettingNavigation/SettingNavigation';
import { Grid } from '@mui/material';

import { getCurrentUser } from '@/modules/user/userSlice';
import { getCurrentSchool } from '@/modules/school/schoolSlice';
import { settingStateMap } from '@/consts/constants';
import ResourceDetails from '@/components/Settings/SettingBody/ResourceDetails/ResourceDetails';

const SettingsResource = () => {
  const currentUser = useSelector(getCurrentUser);
  const currentSchool = useSelector(getCurrentSchool);

  return (
    <>
      {currentUser && currentSchool && (
        <>
          <HomeHeader currentSchool={currentSchool} currentUser={currentUser} />
          <main>
            <Grid container className='w-screen h-screen'>
              <SettingNavigation isClicked={settingStateMap.RESOURCE} customClassName='w-2/12 justify-end' />

              <Grid item className='w-9/12 pt-10'>
                <ResourceDetails user={currentUser} />
              </Grid>
            </Grid>
          </main>
        </>
      )}
    </>
  );
};

export default SettingsResource;
