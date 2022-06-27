import React from 'react';
import { AppBar, Button, Grid } from '@mui/material';
import { Add } from '@mui/icons-material';
import SchoolLogo from '@components/Home/HomeHeader/SchoolLogo/SchoolLogo';
import UserProfileCircle from '@components/Home/HomeHeader/UserProfileCircle/UserProfileCircle';

import { useSelector } from 'react-redux';
import { getCurrentUser } from '@/modules/user/userSlice';

const HomeHeader = () => {
  const currentUser = useSelector(getCurrentUser);

  return (
    <AppBar elevation={0} className='bg-bgWhite' position='relative'>
      <Grid container className='w-screen h-20 items-center flex justify-end laptop:justify-between' direction='row'>
        <Grid item className='laptop:block hidden'>
          <SchoolLogo />
        </Grid>
        <Grid item className='flex items-center'>
          <Button className='bg-dulwichRed normal-case rounded-lg mr-7 mt-2.5' variant='contained' size='small' disableElevation>
            <Add className='stroke-0 stroke-black' />
            <p className='font-Inter text-md tracking-tight py-0.5 px-1'>Resource</p>
          </Button>
          <UserProfileCircle email={currentUser?.email} className='mr-8' />
        </Grid>
      </Grid>
    </AppBar>
  );
};

export default HomeHeader;
