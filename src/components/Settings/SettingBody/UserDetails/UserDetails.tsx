import React from 'react';

import SettingHeader from '@/components/Settings/SettingBody/SettingHeader/SettingHeader';
import { Grid, Stack } from '@mui/material';
import { UserData } from '@/modules/user/types';

import UserTable from './UserTable/UserTable';

type Props = {
  user: UserData;
  usersData: UserData[];
  handleRefresh: () => void;
};

const UserDetails = ({ user: userSelf, usersData, handleRefresh }: Props) => {
  return (
    <>
      <Stack className='w-full'>
        <Grid container className='justify-start'>
          <SettingHeader title={`User Management`} />
        </Grid>

        <Grid container className='justify-center pt-10'>
          <UserTable users={usersData.filter(u => u.id !== userSelf.id)} handleSuccess={handleRefresh} />
        </Grid>
      </Stack>
    </>
  );
};

export default UserDetails;
