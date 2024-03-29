import React from 'react';

import { AppBar, Grid, IconButton } from '@mui/material';
import { Add, FormatListBulleted, Logout } from '@mui/icons-material';

import SchoolLogo from '@components/Home/HomeHeader/SchoolLogo/SchoolLogo';
import UserProfileCircle from '@components/Home/HomeHeader/UserProfileCircle/UserProfileCircle';
import HeaderButton from '@/components/Home/HomeHeader/HeaderButton/HeaderButton';

import { UserData } from '@/modules/user/types';
import { SchoolData } from '@/modules/school/types';
import { useHistory } from 'react-router-dom';
import { isTeacher } from '@/utilities/authorisation';
import AuthService from '@/api/auth/AuthService';

type Props = {
  currentUser: UserData;
  currentSchool: SchoolData;
};

const HomeHeader = ({ currentUser, currentSchool }: Props) => {
  const history = useHistory();
  const Teacher = isTeacher(currentUser);

  const handleSchoolLogoClick = () => {
    history.push('/home');
  };

  const handleProfileIconClick = () => {
    history.push('/settings');
  };

  const handleViewAll = () => {
    history.push('/home/viewAll');
  };

  const handleAddResource = () => {
    history.push('/addResource');
  };

  const handleLogOut = () => {
    AuthService.logout();
    history.push('/login');
  };

  return (
    <AppBar elevation={0} className='bg-bgWhite border-b-[1px] border-bgBlack border-opacity-25 w-screen' position='sticky'>
      <Grid container className='w-screen h-20 items-center flex' direction='row'>
        <Grid container className='w-1/2  justify-start' direction='row'>
          <Grid item className='cursor-pointer' onClick={handleSchoolLogoClick}>
            <SchoolLogo name={currentSchool.name} alternativeName={currentSchool.alternativeName} />
          </Grid>
        </Grid>
        <Grid container className='w-1/2 justify-end' direction='row'>
          <Grid item className='flex items-center '>
            {Teacher && (
              <HeaderButton
                handleOnClick={handleAddResource}
                title='Resources'
                mobileTitle='Reso'
                className='mr-3'
                Icon={<Add className='stroke-0 stroke-black' />}
              />
            )}

            <HeaderButton
              handleOnClick={handleViewAll}
              title='View All'
              mobileTitle='All'
              className='mr-6'
              Icon={<FormatListBulleted className='w-5' />}
            />
            <UserProfileCircle email={currentUser?.email} className='mr-4 h-12 w-12' handleOnClick={handleProfileIconClick} />
            <IconButton className='mt-2 mr-6' onClick={handleLogOut}>
              <Logout className=' text-textGray' />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </AppBar>
  );
};

export default HomeHeader;
