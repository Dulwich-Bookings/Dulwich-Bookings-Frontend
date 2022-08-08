import React, { useState } from 'react';

import HomeHeader from '@components/Home/HomeHeader/HomeHeader';

import { useSelector } from 'react-redux';
import { getCurrentUser } from '@/modules/user/userSlice';
import { getCurrentSchool } from '@/modules/school/schoolSlice';

import { Divider, Grid } from '@mui/material';
import SettingNavigation from '@/components/Settings/SettingNavigation/SettingNavigation';
import SettingBody from '@/components/Settings/SettingBody/SettingBody';
import { SettingState, settingStateMap } from '@/consts/constants';

const Settings = () => {
  const [settingState, setSettingState] = useState<SettingState>(settingStateMap.ACCOUNT);

  const currentUser = useSelector(getCurrentUser);
  const currentSchool = useSelector(getCurrentSchool);

  const stateChangeHandler = (state: SettingState) => {
    console.log(state);
    setSettingState(state);
  };

  return (
    <>
      {currentUser && currentSchool && (
        <>
          <HomeHeader currentSchool={currentSchool} currentUser={currentUser} />
          <main>
            <Grid container className='w-screen h-screen'>
              <Grid item className='w-72'>
                <SettingNavigation stateChangeHandler={stateChangeHandler} />
              </Grid>
              <Divider className='mx-4' orientation='vertical' variant='middle' flexItem />
              <Grid item className='w-auto'>
                <SettingBody viewState={settingState} />
              </Grid>
            </Grid>
          </main>
        </>
      )}
    </>
  );
};

export default Settings;
