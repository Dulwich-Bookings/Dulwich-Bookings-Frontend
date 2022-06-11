import React, { useState } from 'react';
import { Stack } from '@mui/material';
import InputWithLabel from '@/components/InputWithLabel/InputWithLabel';
import LandingFormHeader from '@components/Landing/LandingFormHeader/LandingFormHeader';
import LandingFormFooter from '@components/Landing/LandingFormFooter/LandingFormFooter';
import { InputValidation } from '@/components/InputWithLabel/InputWithLabel';
import { LandingRoute } from '@/consts/constants';
import Routes from '@/utilities/routes';
import { useApi } from '@/api/ApiHandler';
import AuthService from '@/api/auth/AuthService';

type Props = {
  schoolId: number;
};

const ForgetPasswordForm = ({ schoolId }: Props) => {
  const noError: InputValidation = { isError: false, errorHelperText: '' };
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<InputValidation>(noError);
  const [sendForgetPasswordEmail] = useApi(() => AuthService.createForgotPasswordUrl(email, schoolId));

  const loginRoute: LandingRoute = {
    route: Routes.authentication.login,
    routeText: 'Sign In',
  };

  const formValidation = () => {
    const emptyFieldError: InputValidation = {
      isError: true,
      errorHelperText: 'Field Cannot be Empty',
    };

    const isValidEmail = email.length !== 0;
    setEmailError(isValidEmail ? noError : emptyFieldError);

    if (!isValidEmail) {
      throw new Error('Form Invalid');
    }
  };

  const handleSendForgetEmail = async () => {
    setIsLoading(true);
    try {
      formValidation();
      await sendForgetPasswordEmail();
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  return (
    <>
      <LandingFormHeader title='Forgot Password' description='Remember your password?' route={loginRoute} />
      <form autoComplete='false'>
        <Stack direction='column' spacing={2}>
          <InputWithLabel
            inputValue={email}
            inputHandleOnChange={input => setEmail(input.target.value)}
            labelText='Email'
            inputPlaceholder='name@dulwich.org'
            inputType='text'
            inputValidation={emailError}
          />
        </Stack>
      </form>
      <LandingFormFooter handleOnClick={handleSendForgetEmail} buttonText='Send' loading={isLoading} />
    </>
  );
};

export default ForgetPasswordForm;
