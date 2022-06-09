import React from 'react';
import { Grid } from '@mui/material';
import LandingImage from '@/assets/images/Landing-Sample.png';
import LoginForm from '@/components/Landing/Forms/LoginForm/LoginForm';
import LandingFormWrapper from '@/components/Landing/LandingFormWrapper/LandingFormWrapper';

const Landing = () => {
  return (
    <Grid container direction='row' className='h-screen'>
      <Grid item className='laptop:block hidden' xs={0} md={6}>
        <img className='object-none h-screen' width='100%' src={LandingImage} />
      </Grid>
      <Grid item xs={12} md={6}>
        <LandingFormWrapper>
          <LoginForm />
        </LandingFormWrapper>
      </Grid>
    </Grid>
  );
};

export default Landing;
