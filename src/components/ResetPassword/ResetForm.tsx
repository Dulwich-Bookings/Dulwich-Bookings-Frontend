import CredentialsInput from '../CredentialsInput/CredentialsInput';
import React from 'react';
import { Grid, Stack, Typography, Button } from '@mui/material';

const resetForm = () => {
  return (
    <div>
      <Grid container className='h-screen' direction='column' alignItems='center' justifyContent='center'>
        <Grid item className='w 9/12'>
          <Stack direction='column' spacing={8}>
            <Stack direction='column' spacing={2}>
              <Typography variant='h2' align='left' className='font-inter'>
                Reset Password
              </Typography>
              <Typography variant='h6' align='left' className='font-inter'>
                Remember your password?{' '}
                {
                  <a className='text-redBg font-inter underline underline-offset-6' href='/'>
                    Sign In
                  </a>
                }
              </Typography>
            </Stack>
            <Stack direction='column' spacing={4}>
              <Stack direction='column' spacing={2}>
                <CredentialsInput title='Email' placeholder='name@dulwich.com' />
              </Stack>
              <Stack alignItems='center'>
                <Button variant='contained' className='bg-redBg text-XXL normal-case font-inter w-24 h-9' href='newPassword'>
                  Send
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </div>
  );
};

export default resetForm;
