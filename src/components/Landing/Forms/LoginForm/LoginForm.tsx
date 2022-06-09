import React from 'react';
import { Grid, Stack } from '@mui/material';
import InputWithLabel from '@/components/InputWithLabel/InputWithLabel';
import LandingFormHeader from '@components/Landing/LandingFormHeader/LandingFormHeader';
import { LandingRoute } from '@/consts/constants';
import LandingFormFooter from '@components/Landing/LandingFormFooter/LandingFormFooter';
import Routes from '@/utilities/routes';

const LoginForm = () => {
  const signUpRoute: LandingRoute = {
    route: Routes.base,
    routeText: 'Sign Up',
  };

  const forgetPasswordRoute: LandingRoute = {
    route: Routes.base,
    routeText: 'Forgot your password',
  };

  return (
    <Grid container className='h-screen' direction='column' alignItems='center' justifyContent='center'>
      <Grid item className='w-9/12'>
        <Stack direction='column' spacing={8}>
          <LandingFormHeader title='Welcome back' description='Need to make an account?' route={signUpRoute} />
          <Stack direction='column' spacing={2}>
            <InputWithLabel labelText='Email' inputPlaceholder='name@dulwich.org' inputType='text' />
            <InputWithLabel labelText='Password' inputPlaceholder='6+ characters, 1 special character' inputType='password' />
          </Stack>
          <LandingFormFooter handleOnClick={() => ''} buttonText='Sign in' footerLink={forgetPasswordRoute} />
        </Stack>
      </Grid>
    </Grid>
  );
};

export default LoginForm;
