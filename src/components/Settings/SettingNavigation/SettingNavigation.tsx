import React, { useState } from 'react';

import { Button, Grid, Stack } from '@mui/material';
import BackButton from '@/components/AddResource/BackButton/BackButton';
import SettingButton from './SettingButton/SettingButton';

const blankClickedState = { account: false, resource: false, tag: false, milestone: false, users: false };

const SettingNavigation = () => {
  const [isClicked, setIsClicked] = useState({ account: true, resource: false, tag: false, milestone: false, users: false });

  const accountClickHandler = () => {
    setIsClicked({ ...blankClickedState, account: true });
  };

  const resourceClickHandler = () => {
    setIsClicked({ ...blankClickedState, resource: true });
  };

  const tagClickHandler = () => {
    setIsClicked({ ...blankClickedState, tag: true });
  };

  const milestoneClickHandler = () => {
    setIsClicked({ ...blankClickedState, milestone: true });
  };

  const usersClickHandler = () => {
    setIsClicked({ ...blankClickedState, users: true });
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
