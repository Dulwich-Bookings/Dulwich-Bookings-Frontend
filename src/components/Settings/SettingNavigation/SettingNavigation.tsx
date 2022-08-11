import React from 'react';

import { SettingState } from '@/consts/constants';

import { Grid, Stack } from '@mui/material';
import BackButton from '@/components/AddResource/BackButton/BackButton';
import SettingButton from '@/components/Settings/SettingNavigation/SettingButton/SettingButton';
import { useHistory } from 'react-router-dom';

type Props = {
  isClicked: SettingState;
};

const SettingNavigation = ({ isClicked }: Props) => {
  const history = useHistory();

  const homeButtonClickHandler = () => {
    history.push('/home');
  };

  const accountClickHandler = () => {
    history.push('/settings');
  };

  const resourceClickHandler = () => {
    history.push('/settings/resources');
  };

  const tagClickHandler = () => {
    history.push('/settings/tags');
  };

  const milestoneClickHandler = () => {
    history.push('/settings/milestones');
  };

  const usersClickHandler = () => {
    history.push('/settings/users');
  };

  return (
    <>
      <Grid container className='justify-end'>
        <Stack className='w-4/5' spacing={3}>
          <BackButton buttonText='Home' onClickHandler={homeButtonClickHandler} />
          <Stack>
            <SettingButton buttonText='Account Details' isClicked={isClicked.account} handleOnClick={accountClickHandler} />
            <SettingButton buttonText='My Resources' isClicked={isClicked.resource} handleOnClick={resourceClickHandler} />
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
