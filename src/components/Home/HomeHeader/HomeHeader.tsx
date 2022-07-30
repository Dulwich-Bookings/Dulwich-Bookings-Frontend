import React from 'react';

import { AppBar, Grid } from '@mui/material';
import { Add, FormatListBulleted } from '@mui/icons-material';

import SchoolLogo from '@components/Home/HomeHeader/SchoolLogo/SchoolLogo';
import UserProfileCircle from '@components/Home/HomeHeader/UserProfileCircle/UserProfileCircle';
import HeaderButton from '@/components/Home/HomeHeader/HeaderButton/HeaderButton';

import { UserData } from '@/modules/user/types';
import { SchoolData } from '@/modules/school/types';
import { useHistory } from 'react-router-dom';
import { isTeacher } from '@/utilities/authorisation';

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

  const handleAddResource = () => {
    history.push('/addResource');
  };

  return (
    <AppBar elevation={0} className='bg-bgWhite border-b-[1px] border-bgBlack border-opacity-25 w-screen' position='sticky'>
      <Grid container className='w-screen h-20 items-center flex ' direction='row'>
        <Grid container className='w-1/2  justify-start ' direction='row'>
          <Grid item className='cursor-pointer' onClick={handleSchoolLogoClick}>
            <SchoolLogo name={currentSchool.name} alternativeName={currentSchool.alternativeName} />
          </Grid>
        </Grid>
        <Grid container className='w-1/2  justify-end' direction='row'>
          <Grid item className='flex items-center '>
            {Teacher && (
              <HeaderButton
                handleOnClick={handleAddResource}
                className='mr-3'
                title='Resources'
                Icon={<Add className='stroke-0 stroke-black' />}
              />
            )}

            <HeaderButton title='View All' className='mr-6' Icon={<FormatListBulleted className='w-5' />} />
            <UserProfileCircle email={currentUser?.email} className='mr-8' />
          </Grid>
        </Grid>
      </Grid>
    </AppBar>
  );
};

export default HomeHeader;
