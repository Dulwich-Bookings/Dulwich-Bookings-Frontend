import Form from '../Form/Form';
import React from 'react';
import { Grid, Stack, Typography } from '@mui/material';
import SubmitButton from '../Buttons/SubmitButton';

const Login = () => {
  return (
    <div>
      <Grid container className='h-screen' direction='column' alignItems='center' justifyContent='center'>
        <Grid item className='w 9/12'>
          <Stack direction='column' spacing={8}>
            <Stack direction='column' spacing={2}>
              <Typography variant='h2' align='left' className='font-inter'>
                Welcome back
              </Typography>
              <Typography variant='h6' align='left' className='font-inter'>
                Need to make an account?{' '}
                {
                  <a className='text-redbg font-inter underline underline-offset-6' href='#'>
                    Sign up
                  </a>
                }
              </Typography>
            </Stack>
            <Stack direction='column' spacing={4}>
              <Stack direction='column' spacing={2}>
                <Form content='Email' label='name@dulwich.com' />
                <Form content='Password' label='6+ characters, 1 special character' />
              </Stack>
              <Stack alignItems='center'>
                <SubmitButton content='Sign In' />
                <a className='font-inter underline underline-offset-6 text-dwgrey' href='#'>
                  Reset your password
                </a>
              </Stack>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
