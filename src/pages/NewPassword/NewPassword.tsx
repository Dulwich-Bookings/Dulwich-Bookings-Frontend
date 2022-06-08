import React from 'react';
import NewPasswordForm from '@/components/ResetPassword/NewPasswordForm';
import LocationSelect from '@/components/LocationSelect/LocationSelect';
import { Grid } from '@mui/material';

const newPassword = () => {
  return (
    <>
      <Grid container direction='row' className='h-screen'>
        <Grid item xs={0} md={6} className='bg-dulwichLanding bg-cover'>
          <LocationSelect />
        </Grid>
        <Grid item xs={12} md={6}>
          <NewPasswordForm />
        </Grid>
      </Grid>
    </>
  );
};

export default newPassword;
