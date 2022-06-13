import React, { useState } from 'react';
import { Stack } from '@mui/material';
import InputWithLabel from '@/components/InputWithLabel/InputWithLabel';
import LandingFormHeader from '@components/Landing/LandingFormHeader/LandingFormHeader';
import LandingFormFooter from '@components/Landing/LandingFormFooter/LandingFormFooter';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { InputValidation } from '@/components/InputWithLabel/InputWithLabel';
import { toggleShowNotification } from '@/modules/ui/uiSlice';
import { severity } from '@/consts/constants';
import { useApi } from '@/api/ApiHandler';
import AuthService from '@/api/auth/AuthService';

const ResetPasswordForm = () => {
  const noError: InputValidation = { isError: false, errorHelperText: '' };
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
  const [passwordError, setPasswordError] = useState<InputValidation>(noError);
  const [passwordConfirmationError, setPasswordConfirmationError] = useState<InputValidation>(noError);
  const search = useLocation().search;
  const queryToken = new URLSearchParams(search).get('token');
  const token = queryToken ? queryToken : '';
  const [resetPassword] = useApi(() => AuthService.setPassword(password, passwordConfirmation, token), true, true, false);

  const formValidation = () => {
    const emptyFieldError: InputValidation = {
      isError: true,
      errorHelperText: 'Field Cannot be Empty',
    };

    const isPasswordValid = password.length !== 0;
    const isPasswordConfirmationValid = passwordConfirmation.length !== 0;
    setPasswordError(isPasswordValid ? noError : emptyFieldError);
    setPasswordConfirmationError(isPasswordConfirmationValid ? noError : emptyFieldError);

    if (!queryToken) {
      dispatch(toggleShowNotification({ message: 'Invalid link! Check your email for a set password link', severity: severity.WARNING }));
      throw new Error('Invalid Token');
    }

    if (!isPasswordValid || !isPasswordConfirmationValid) {
      throw new Error('Form Invalid');
    }
  };

  const handleResetPassword = async () => {
    setIsLoading(true);
    try {
      formValidation();
      await resetPassword();
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  return (
    <>
      <LandingFormHeader title='New Password' description='Create a new password. It must be different from your old password.' />
      <form autoComplete='off'>
        <Stack direction='column' spacing={2}>
          <InputWithLabel
            inputValue={password}
            inputHandleOnChange={input => setPassword(input.target.value)}
            labelText='New Password'
            inputPlaceholder='6+ characters, 1 special character'
            inputType='password'
            inputValidation={passwordError}
          />
          <InputWithLabel
            inputValue={passwordConfirmation}
            inputHandleOnChange={input => setPasswordConfirmation(input.target.value)}
            labelText='Confirm Password'
            inputPlaceholder='6+ characters, 1 special character'
            inputType='password'
            inputValidation={passwordConfirmationError}
          />
        </Stack>
      </form>
      <LandingFormFooter handleOnClick={handleResetPassword} buttonText='Reset' loading={isLoading} />
    </>
  );
};

export default ResetPasswordForm;
