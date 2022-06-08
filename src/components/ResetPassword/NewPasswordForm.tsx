import CredentialsInput from '../CredentialsInput/CredentialsInput';
import React from 'react';
import { Grid, Stack, Typography, Button } from '@mui/material';

const newPasswordForm = () => {
  return (
    <div>
      <Grid container className='h-screen' direction='column' alignItems='center' justifyContent='center'>
        <Grid item className='w 9/12'>
          <Stack direction='column' spacing={8}>
            <Stack direction='column' spacing={2}>
              <Typography variant='h2' align='left' className='font-inter'>
                New Password
              </Typography>
              <Typography variant='h6' align='left' className='font-inter'>
                Create a new password. It must be different from your old password.
              </Typography>
            </Stack>
            <Stack direction='column' spacing={4}>
              <Stack direction='column' spacing={2}>
                <CredentialsInput title='Email code' placeholder='Code' />
                <CredentialsInput title='New Password' placeholder='6+ characters, 1 special character' />
                <CredentialsInput title='Confirm Password' placeholder='6+ characters, 1 special character' />
              </Stack>
              <Stack alignItems='center'>
                <Button variant='contained' className='bg-redBg text-XXL normal-case font-inter w-24 h-9'>
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

export default newPasswordForm;
