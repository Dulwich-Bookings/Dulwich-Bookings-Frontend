import React from 'react';
import LoginForm from '@/components/Landing/LoginForm/LoginForm';
import LocationSelect from '@/components/LocationSelect/LocationSelect';
import { Grid } from '@mui/material';

const landing = () => {
  return (
    <>
      <Grid container direction='row' className='h-screen'>
        <Grid item xs={0} md={6} className='bg-dulwichLanding bg-cover'>
          <LocationSelect />
        </Grid>
        <Grid item xs={12} md={6}>
          <LoginForm />
        </Grid>
      </Grid>
    </>
  );
};

export default landing;
