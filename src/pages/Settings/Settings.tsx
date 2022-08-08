import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import HomeHeader from '@components/Home/HomeHeader/HomeHeader';
import SettingNavigation from '@/components/Settings/SettingNavigation/SettingNavigation';
import SettingBody from '@/components/Settings/SettingBody/SettingBody';
import { Divider, Grid } from '@mui/material';

import { getCurrentUser } from '@/modules/user/userSlice';
import { getCurrentSchool } from '@/modules/school/schoolSlice';
import { SettingState, settingStateMap } from '@/consts/constants';

const Settings = () => {
  const [settingState, setSettingState] = useState<SettingState>(settingStateMap.ACCOUNT);

  const currentUser = useSelector(getCurrentUser);
  const currentSchool = useSelector(getCurrentSchool);

  const stateChangeHandler = (state: SettingState) => {
    setSettingState(state);
  };

  return (
    <>
      {currentUser && currentSchool && (
        <>
          <HomeHeader currentSchool={currentSchool} currentUser={currentUser} />
          <main>
            <Grid container className='w-screen h-screen pt-10'>
              <Grid item className='w-2/12'>
                <SettingNavigation stateChangeHandler={stateChangeHandler} />
              </Grid>
              <Divider className='ml-4 mr-16' orientation='vertical' variant='middle' flexItem />
              <Grid item className='w-9/12'>
                <SettingBody viewState={settingState} user={currentUser} />
              </Grid>
            </Grid>
          </main>
        </>
      )}
    </>
  );
};

export default Settings;
