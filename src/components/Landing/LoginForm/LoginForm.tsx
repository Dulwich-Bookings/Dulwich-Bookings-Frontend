import CredentialsInput from '@/components/CredentialsInput/CredentialsInput';
import React from 'react';
import { Grid, Stack, Typography, Button } from '@mui/material';

const loginForm = () => {
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
                  <a className='text-redBg font-inter underline underline-offset-6' href='signup'>
                    Sign up
                  </a>
                }
              </Typography>
            </Stack>
            <Stack direction='column' spacing={4}>
              <Stack direction='column' spacing={2}>
                <CredentialsInput title='Email' placeholder='name@dulwich.com' />
                <CredentialsInput title='Password' placeholder='6+ characters, 1 special character' />
              </Stack>
              <Stack alignItems='center'>
                <Button variant='contained' className='bg-redBg text-XXL normal-case font-inter w-24 h-9'>
                  Sign In
                </Button>
                <a className='font-inter underline underline-offset-6 text-dwgrey' href='resetPassword'>
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

export default loginForm;
