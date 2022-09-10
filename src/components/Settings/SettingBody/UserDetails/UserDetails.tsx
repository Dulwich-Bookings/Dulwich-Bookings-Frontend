import React, { useState } from 'react';

import SettingHeader from '@/components/Settings/SettingBody/SettingHeader/SettingHeader';
import { Button, Grid, Stack } from '@mui/material';
import { UserData } from '@/modules/user/types';

import UserTable from './UserTable/UserTable';
import TemplateSubmitButton from '@/components/AddResource/Forms/TemplateSubmitButton/TemplateSubmitButton';

type Props = {
  user: UserData;
  usersData: UserData[];
  handleRefresh: () => void;
};

const UserDetails = ({ user: userSelf, usersData, handleRefresh }: Props) => {
  const [placeholderMsg, setPlaceHolderMsg] = useState<string>(''); //Temporary.

  const uploadUserHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (!file) {
      return;
    }
    const message: string = 'Successfully uploaded ' + file.name;
    setPlaceHolderMsg(message);
  };

  const downloadTemplateHandler = () => {
    return;
  };

  return (
    <>
      <Stack className='w-full'>
        <Grid container className='justify-start'>
          <SettingHeader title={`User Management`} />
        </Grid>
        <Grid container className='pt-8'>
          <TemplateSubmitButton
            buttonClassName='w-40 h-10 bg-[#808080] rounded-lg text-bgWhite font-inter capitalize'
            buttonTextClassName='text-md'
            buttonText='Upload Users'
            helperText={placeholderMsg}
            handleOnClick={uploadUserHandler}
          />
          <Button
            className='w-48 h-10 bg-[#808080] rounded-lg text-bgWhite font-inter capitalize ml-4 text-md'
            onClick={downloadTemplateHandler}
          >
            Download Template
          </Button>
        </Grid>

        <Grid container className='justify-center pt-6'>
          <UserTable users={usersData.filter(u => u.id !== userSelf.id)} handleSuccess={handleRefresh} />
        </Grid>
      </Stack>
    </>
  );
};

export default UserDetails;
