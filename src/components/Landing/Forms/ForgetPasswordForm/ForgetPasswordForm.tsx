import React, { useState } from 'react';
import { Stack } from '@mui/material';
import InputWithLabel from '@/components/InputWithLabel/InputWithLabel';
import LandingFormHeader from '@components/Landing/LandingFormHeader/LandingFormHeader';
import LandingFormFooter from '@components/Landing/LandingFormFooter/LandingFormFooter';
import { LandingRoute } from '@/consts/constants';
import Routes from '@/utilities/routes';

const ForgetPasswordForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loginRoute: LandingRoute = {
    route: Routes.authentication.login,
    routeText: 'Sign In',
  };

  const handleSendForgetEmail = () => {
    console.log('Sending Email');
    setIsLoading(true);
  };

  return (
    <>
      <LandingFormHeader title='Forgot Password' description='Remember your password?' route={loginRoute} />
      <form autoComplete='false'>
        <Stack direction='column' spacing={2}>
          <InputWithLabel labelText='Email' inputPlaceholder='name@dulwich.org' inputType='text' />
        </Stack>
      </form>
      <LandingFormFooter handleOnClick={handleSendForgetEmail} buttonText='Send' loading={isLoading} />
    </>
  );
};

export default ForgetPasswordForm;
