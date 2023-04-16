import React from 'react';

import HomeHeader from '@/components/Home/HomeHeader/HomeHeader';
import HomeViewAllBody from '@/components/Home/HomeViewAllBody/HomeViewAllBody';
import { Stack } from '@mui/material';

import { useSelector } from 'react-redux';
import { getCurrentSchool } from '@/modules/school/schoolSlice';
import { getCurrentUser } from '@/modules/user/userSlice';

const HomeViewAll = () => {
  const currentUser = useSelector(getCurrentUser);
  const currentSchool = useSelector(getCurrentSchool);

  return (
    <>
      {currentUser && currentSchool && (
        <main>
          <Stack spacing={3}>
            <HomeHeader currentSchool={currentSchool} currentUser={currentUser} />
            <HomeViewAllBody currentSchool={currentSchool} currentUser={currentUser} />
          </Stack>
        </main>
      )}
    </>
  );
};

export default HomeViewAll;
