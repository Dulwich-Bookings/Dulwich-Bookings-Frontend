import React, { useState } from 'react';
import { Stack } from '@mui/material';
import InputWithLabel from '@/components/InputWithLabel/InputWithLabel';
import LandingFormHeader from '@components/Landing/LandingFormHeader/LandingFormHeader';
import LandingFormFooter from '@components/Landing/LandingFormFooter/LandingFormFooter';
import { LandingRoute } from '@/consts/constants';
import Routes from '@/utilities/routes';

const SignUpForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loginRoute: LandingRoute = {
    route: Routes.authentication.login,
    routeText: 'Sign In',
  };

  const handleSignUp = () => {
    console.log('Signing Up');
    setIsLoading(true);
  };

  return (
    <>
      <LandingFormHeader title='Sign Up' description='Already have an account?' route={loginRoute} />
      <form autoComplete='off'>
        <Stack direction='column' spacing={2}>
          <InputWithLabel labelText='Email' inputPlaceholder='name@dulwich.org' inputType='text' />
          <InputWithLabel labelText='Password' inputPlaceholder='6+ characters, 1 special character' inputType='password' />
          <InputWithLabel labelText='Confirm Password' inputPlaceholder='6+ characters, 1 special character' inputType='password' />
        </Stack>
      </form>
      <LandingFormFooter handleOnClick={handleSignUp} buttonText='Sign Up' loading={isLoading} />
    </>
  );
};

export default SignUpForm;
