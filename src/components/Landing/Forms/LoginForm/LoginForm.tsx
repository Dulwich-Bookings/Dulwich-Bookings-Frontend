import React from 'react';
import { Stack } from '@mui/material';
import InputWithLabel from '@/components/InputWithLabel/InputWithLabel';
import LandingFormHeader from '@components/Landing/LandingFormHeader/LandingFormHeader';
import LandingFormFooter from '@components/Landing/LandingFormFooter/LandingFormFooter';
import { LandingRoute } from '@/consts/constants';
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
    <>
      <LandingFormHeader title='Welcome back' description='Need to make an account?' route={signUpRoute} />
      <Stack direction='column' spacing={2}>
        <InputWithLabel labelText='Email' inputPlaceholder='name@dulwich.org' inputType='text' />
        <InputWithLabel labelText='Password' inputPlaceholder='6+ characters, 1 special character' inputType='password' />
      </Stack>
      <LandingFormFooter handleOnClick={() => ''} buttonText='Sign in' footerLink={forgetPasswordRoute} />
    </>
  );
};

export default LoginForm;
