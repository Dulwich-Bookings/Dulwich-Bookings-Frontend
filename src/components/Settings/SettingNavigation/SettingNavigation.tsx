import React, { useState } from 'react';

import { Grid, Stack } from '@mui/material';
import BackButton from '@/components/AddResource/BackButton/BackButton';
import SettingButton from './SettingButton/SettingButton';
import { SettingState, settingStateMap } from '@/consts/constants';

const SettingNavigation = () => {
  const [isClicked, setIsClicked] = useState<SettingState>(settingStateMap.ACCOUNT);

  const accountClickHandler = () => {
    setIsClicked(settingStateMap.ACCOUNT);
  };

  const resourceClickHandler = () => {
    setIsClicked(settingStateMap.RESOURCE);
  };

  const tagClickHandler = () => {
    setIsClicked(settingStateMap.TAG);
  };

  const milestoneClickHandler = () => {
    setIsClicked(settingStateMap.MILESTONE);
  };

  const usersClickHandler = () => {
    setIsClicked(settingStateMap.USERS);
  };

  return (
    <>
      <Grid container className='justify-end'>
        <Stack className='w-3/4 pt-10' spacing={3}>
          <BackButton buttonText='Home' />
          <Stack>
            <SettingButton buttonText='Account Details' isClicked={isClicked.account} handleOnClick={accountClickHandler} />
            <SettingButton buttonText='My Resource' isClicked={isClicked.resource} handleOnClick={resourceClickHandler} />
            <SettingButton buttonText='Tag Management' isClicked={isClicked.tag} handleOnClick={tagClickHandler} />
            <SettingButton buttonText='Milestones' isClicked={isClicked.milestone} handleOnClick={milestoneClickHandler} />
            <SettingButton buttonText='User Management' isClicked={isClicked.users} handleOnClick={usersClickHandler} />
          </Stack>
        </Stack>
      </Grid>
    </>
  );
};

export default SettingNavigation;
