import React from 'react';
import { AppBar, Grid } from '@mui/material';
import SchoolLogo from '@components/Home/HomeHeader/SchoolLogo/SchoolLogo';
import UserProfileCircle from '@components/Home/HomeHeader/UserProfileCircle/UserProfileCircle';
import AddResourceButton from '@components/Home/HomeHeader/AddResourceButton/AddResourceButton';

import { UserData } from '@/modules/user/types';
import { SchoolData } from '@/modules/school/types';
import { useHistory } from 'react-router-dom';

type Props = {
  currentUser: UserData;
  currentSchool: SchoolData;
};

const HomeHeader = ({ currentUser, currentSchool }: Props) => {
  const history = useHistory();
  const handleAddResource = () => {
    history.push('/addResource');
  };

  return (
    <AppBar elevation={0} className='bg-bgWhite border-b-[1px] border-bgBlack border-opacity-25' position='relative'>
      <Grid container className='w-screen h-20 items-center flex justify-end md:justify-between' direction='row'>
        <Grid item className='md:block hidden'>
          <SchoolLogo name={currentSchool.name} alternativeName={currentSchool.alternativeName} />
        </Grid>
        <Grid item className='flex items-center'>
          <AddResourceButton handleOnClick={handleAddResource} />
          <UserProfileCircle email={currentUser?.email} className='mr-8' />
        </Grid>
      </Grid>
    </AppBar>
  );
};

export default HomeHeader;
