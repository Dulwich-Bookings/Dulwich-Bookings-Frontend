import React, { useState } from 'react';
import { Stack } from '@mui/material';
import InputWithLabel from '@/components/InputWithLabel/InputWithLabel';
import LandingFormHeader from '@components/Landing/LandingFormHeader/LandingFormHeader';
import LandingFormFooter from '@components/Landing/LandingFormFooter/LandingFormFooter';

const ResetPasswordForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleResetPassword = () => {
    console.log('Resetting Password');
    setIsLoading(true);
  };

  return (
    <>
      <LandingFormHeader title='New Password' description='Create a new password. It must be different from your old password.' />
      <form autoComplete='off'>
        <Stack direction='column' spacing={2}>
          <InputWithLabel labelText='New Password' inputPlaceholder='6+ characters, 1 special character' inputType='password' />
          <InputWithLabel labelText='Confirm Password' inputPlaceholder='6+ characters, 1 special character' inputType='password' />
        </Stack>
      </form>
      <LandingFormFooter handleOnClick={handleResetPassword} buttonText='Reset' loading={isLoading} />
    </>
  );
};

export default ResetPasswordForm;
