import React, { useState } from 'react';

import { SettingState } from '@/consts/constants';

import { Divider, Drawer, Grid, Stack } from '@mui/material';
import BackButton from '@/components/AddResource/BackButton/BackButton';
import SettingButton from '@/components/Settings/SettingNavigation/SettingButton/SettingButton';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useHistory } from 'react-router-dom';

type Props = {
  isClicked: SettingState;
  customClassName?: string; //Optional for styling
};

const SettingNavigation = ({ isClicked, customClassName }: Props) => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

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

  const openDrawerHandler = () => {
    setOpenDrawer(true);
  };

  const closeDrawerHandler = () => {
    setOpenDrawer(false);
  };

  return (
    <>
      <Grid container className={`${customClassName} w-2/12 justify-end hidden settingLaptop:flex`}>
        <Stack className='w-4/5 pt-8' spacing={3}>
          <BackButton buttonText='Home' onClickHandler={homeButtonClickHandler} />
          <Stack>
            <SettingButton buttonText='Account Details' isClicked={isClicked.account} handleOnClick={accountClickHandler} />
            <SettingButton buttonText='My Resources' isClicked={isClicked.resource} handleOnClick={resourceClickHandler} />
            <SettingButton buttonText='Tag Management' isClicked={isClicked.tag} handleOnClick={tagClickHandler} />
            <SettingButton buttonText='User Management' isClicked={isClicked.users} handleOnClick={usersClickHandler} />
            <SettingButton buttonText='Milestones' isClicked={isClicked.milestone} handleOnClick={milestoneClickHandler} />
          </Stack>
        </Stack>
      </Grid>
      <Divider className='ml-4 mr-16 hidden settingLaptop:flex' orientation='vertical' variant='middle' flexItem />

      <Drawer
        className={`${customClassName} flex settingLaptop:hidden`}
        variant='temporary'
        open={openDrawer}
        onClose={closeDrawerHandler}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        <Grid container>
          <Stack className='w-full pt-8 pl-8' spacing={3}>
            <BackButton buttonText='Home' onClickHandler={homeButtonClickHandler} />
            <Stack>
              <SettingButton buttonText='Account Details' isClicked={isClicked.account} handleOnClick={accountClickHandler} />
              <SettingButton buttonText='My Resources' isClicked={isClicked.resource} handleOnClick={resourceClickHandler} />
              <SettingButton buttonText='Tag Management' isClicked={isClicked.tag} handleOnClick={tagClickHandler} />
              <SettingButton buttonText='User Management' isClicked={isClicked.users} handleOnClick={usersClickHandler} />
              <SettingButton buttonText='Milestones' isClicked={isClicked.milestone} handleOnClick={milestoneClickHandler} />
            </Stack>
          </Stack>
        </Grid>
      </Drawer>
      <Grid className='drop-shadow-2xl h-screen fixed settingLaptop:hidden '>
        <KeyboardArrowRightIcon
          className='cursor-pointer text-right text-[#808080] h-full mr-5 bg-[#404040] '
          onClick={openDrawerHandler}
        />
      </Grid>
    </>
  );
};

export default SettingNavigation;
