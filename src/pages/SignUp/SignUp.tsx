import React from 'react';
import SignupForm from '@/components/Landing/SignupForm/SignupForm';
import LocationSelect from '@/components/LocationSelect/LocationSelect';
import { Grid } from '@mui/material';

const signUp = () => {
  return (
    <>
      <Grid container direction='row' className='h-screen'>
        <Grid item xs={0} md={6} className='bg-dulwichLanding bg-cover'>
          <LocationSelect />
        </Grid>
        <Grid item xs={12} md={6}>
          <SignupForm />
        </Grid>
      </Grid>
    </>
  );
};

export default signUp;
