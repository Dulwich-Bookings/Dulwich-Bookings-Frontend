import React, { useEffect, useState } from 'react';

import { SettingState, settingStateMap } from '@/consts/constants';

import { Grid, Stack } from '@mui/material';
import BackButton from '@/components/AddResource/BackButton/BackButton';
import SettingButton from '@/components/Settings/SettingNavigation/SettingButton/SettingButton';
import { useHistory } from 'react-router-dom';

type Props = {
  stateChangeHandler: (input: SettingState) => void;
};

const SettingNavigation = ({ stateChangeHandler }: Props) => {
  const [isClicked, setIsClicked] = useState<SettingState>(settingStateMap.ACCOUNT);

  const history = useHistory();

  const homeButtonClickHandler = () => {
    history.push('/home');
  };

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

  useEffect(() => {
    stateChangeHandler(isClicked);
  }, [isClicked]);

  return (
    <>
      <Grid container className='justify-end'>
        <Stack className='w-3/4' spacing={3}>
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
