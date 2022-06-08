import React from 'react';
import ResetForm from '@/components/ResetPassword/ResetForm';
import LocationSelect from '@/components/LocationSelect/LocationSelect';
import { Grid } from '@mui/material';

const resetPassword = () => {
  return (
    <>
      <Grid container direction='row' className='h-screen'>
        <Grid item xs={0} md={6} className='bg-dulwichLanding bg-cover'>
          <LocationSelect />
        </Grid>
        <Grid item xs={12} md={6}>
          <ResetForm />
        </Grid>
      </Grid>
    </>
  );
};

export default resetPassword;
