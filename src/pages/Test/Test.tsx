import React, { useState, useEffect } from 'react';
import { useApi } from '@/api/ApiHandler';
import AuthService from '@/api/auth/AuthService';
import UserService from '@/api/user/UserService';
import TagService from '@/api/tag/TagService';
import { styled } from '@mui/material/styles';
import { Button, Stack, Typography } from '@mui/material';
import { ApiData } from '@/api/ApiService';
import { isSuccess } from '@/api/ApiHandler';

const Input = styled('input')({
  display: 'none',
});

let isFirstLoaded = true;

const Test = () => {
  const [loginStudent] = useApi(() => AuthService.login('student23@stu.dulwich.org', 'asdasd', 1), true, true);
  const [loginTeacher] = useApi(() => AuthService.login('teacher@dulwich.org', 'asdasd', 1), true, true);
  const [loginAdmin] = useApi(() => AuthService.login('admin@dulwich.org', 'asdasd', 1), true, true);
  const [bulkSignUp] = useApi(() => AuthService.bulkRegister(bulkSignUpForm), true, true);
  const [getAllUsers] = useApi(() => UserService.getAllUsers(), true, true);
  const [getAllTags] = useApi(() => TagService.getAllTags(), true, true);

  const [bulkSignUpForm, setBulkSignUpForm] = useState<FormData>(new FormData());

  const handleButtonClick = async (func: () => Promise<ApiData & isSuccess>) => {
    const res = await func();
    if (res.isSuccess) {
      console.log(res.data);
    }
  };

  const handleBulkSignUp = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (!file) {
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    setBulkSignUpForm(formData);
  };

  useEffect(() => {
    if (isFirstLoaded) {
      isFirstLoaded = false;
      return;
    }
    bulkSignUp();
  }, [bulkSignUpForm]);

  return (
    <>
      <div className='pt-6 pl-6'>
        <Typography className='pb-6' variant='h3'>
          Add your own test components below!
        </Typography>
        <Typography variant='h4'>APIs</Typography>
        <Stack spacing={2} direction='column'>
          <Typography variant='h5'>Auth</Typography>
          <Stack spacing={2} direction='row'>
            <Button variant='contained' onClick={() => handleButtonClick(loginStudent)}>
              Sign In Student
            </Button>
            <Button variant='contained' onClick={() => handleButtonClick(loginTeacher)}>
              Sign In Teacher
            </Button>
            <Button variant='contained' onClick={() => handleButtonClick(loginAdmin)}>
              Sign In Admin
            </Button>
            <label htmlFor='bulk-sign-up'>
              <Input accept='.csv' id='bulk-sign-up' type='file' onChange={e => handleBulkSignUp(e)} />
              <Button variant='contained' component='span'>
                Bulk Sign Up
              </Button>
            </label>
            <Button variant='contained' onClick={() => AuthService.logout()}>
              Logout
            </Button>
          </Stack>
          <Typography variant='h5'>Tag</Typography>
          <Stack spacing={2} direction='row'>
            <Button variant='contained' onClick={() => handleButtonClick(getAllTags)}>
              Get All Tags
            </Button>
          </Stack>
          <Typography variant='h5'>User</Typography>
          <Stack spacing={2} direction='row'>
            <Button variant='contained' onClick={() => handleButtonClick(getAllUsers)}>
              Get All Users
            </Button>
          </Stack>
        </Stack>
        <br />
      </div>
    </>
  );
};

export default Test;
