import React from 'react';

import SettingHeader from '@/components/Settings/SettingBody/SettingHeader/SettingHeader';
import { Button, Grid, Stack } from '@mui/material';
import { UserData } from '@/modules/user/types';

import UserTable from './UserTable/UserTable';
import TemplateSubmitButton from '@/components/AddResource/Forms/TemplateSubmitButton/TemplateSubmitButton';
import AuthService from '@/api/auth/AuthService';
import { useApi } from '@/api/ApiHandler';

type Props = {
  user: UserData;
  usersData: UserData[];
  handleRefresh: () => void;
};

const UserDetails = ({ user: userSelf, usersData, handleRefresh }: Props) => {
  const [bulkSignUp] = useApi((form: FormData) => AuthService.bulkRegister(form), true, true);

  const uploadUserHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (!file) {
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    await bulkSignUp(formData);
    window.location.reload();
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
            helperText={''}
            handleOnClick={uploadUserHandler}
          />
          <a
            className='w-48 h-10 bg-[#808080] rounded-lg text-bgWhite capitalize ml-4 text-md flex items-center justify-center'
            href='data:text/csv;charset=utf-8,
                  exampleStudent@dulwich.org,Student,2000%0A
                  exampleTeacher@dulwich.com,Teacher,'
            target='_blank'
            download='bulk-signup-example.csv'
            rel='noreferrer'
          >
            <div className='font-Inter'>Download Template</div>
          </a>
        </Grid>

        <Grid container className='pt-6'>
          <UserTable users={usersData.filter(u => u.id !== userSelf.id)} handleSuccess={handleRefresh} />
        </Grid>
      </Stack>
    </>
  );
};

export default UserDetails;
