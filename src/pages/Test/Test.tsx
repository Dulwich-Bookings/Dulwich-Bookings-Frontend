import React, { useState, useEffect } from 'react';
import { useApi } from '@/api/ApiHandler';
import AuthService from '@/api/auth/AuthService';
import UserService from '@/api/user/UserService';
import TagService from '@/api/tag/TagService';
import CloseIcon from '@mui/icons-material/Close';
import Calendar from '@components/Calendar/Calendar';
import AddCalendarButton from '@/components/Calendar/AddCalendarButton/AddCalendarButton';
import { Button, Stack, Typography, Modal, Box } from '@mui/material';
import { ApiData } from '@/api/ApiService';
import { isSuccess } from '@/api/ApiHandler';

let isFirstLoaded = true;

const Test = () => {
  const [loginStudent] = useApi(() => AuthService.login('student23@stu.dulwich.org', 'asdasd'), true, true);
  const [loginTeacher] = useApi(() => AuthService.login('teacher@dulwich.org', 'asdasd'), true, true);
  const [loginAdmin] = useApi(() => AuthService.login('admin@dulwich.org', 'asdasd'), true, true);
  const [bulkSignUp] = useApi(() => AuthService.bulkRegister(bulkSignUpForm), true, true);
  const [getAllUsers] = useApi(() => UserService.getAllUsers(), true, true);
  const [getAllTags] = useApi(() => TagService.getAllTags(), true, true);

  const [bulkSignUpForm, setBulkSignUpForm] = useState<FormData>(new FormData());
  const [openCalendarModal, setOpenCalendarModal] = useState<boolean>(false);

  const handleCloseModal = () => {
    setOpenCalendarModal(false);
  };

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
      <Modal className='flex justify-center items-center' open={openCalendarModal} onClose={handleCloseModal}>
        <Box className='bg-white w-3/4 h-4/5 mt-20 px-14 pt-10 rounded-lg'>
          <CloseIcon onClick={handleCloseModal} className='float-right cursor-pointer hover:text-grayAccent' />
          <Stack className='h-full' spacing={{ xs: 1, md: -6 }}>
            <Box>
              <Stack direction='row' spacing={2} alignItems='center'>
                <Typography variant='h4'>Tech 4</Typography>
                <AddCalendarButton />
              </Stack>
              <Typography className='bookingSafe:block hidden w-1/3' variant='subtitle2'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris lorem nisl, vulputate non neque vel.
              </Typography>
            </Box>
            <Box className='h-full'>
              <Calendar />
            </Box>
          </Stack>
        </Box>
      </Modal>
      <div className='pt-6 pl-6'>
        <Typography className='pb-6' variant='h3'>
          Add your own test components below!
        </Typography>
        <Typography variant='h4'>APIs</Typography>

        <Stack spacing={4}>
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
                <input className='hidden' accept='.csv' id='bulk-sign-up' type='file' onChange={e => handleBulkSignUp(e)} />
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

          <Stack spacing={2} direction='column'>
            <Typography variant='h4'>Calendar Modal</Typography>
            <Stack spacing={2} direction='row'>
              <Button variant='contained' onClick={() => setOpenCalendarModal(true)}>
                Open Modal
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </div>
    </>
  );
};

export default Test;
