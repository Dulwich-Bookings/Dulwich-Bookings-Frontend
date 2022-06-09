import React, { useState } from 'react';
import { Stack } from '@mui/material';
import InputWithLabel from '@/components/InputWithLabel/InputWithLabel';
import LandingFormHeader from '@components/Landing/LandingFormHeader/LandingFormHeader';
import LandingFormFooter from '@components/Landing/LandingFormFooter/LandingFormFooter';
import { LandingRoute } from '@/consts/constants';
import Routes from '@/utilities/routes';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { updateCurrentUser } from '@/modules/user/userSlice';
import AuthService from '@/api/auth/AuthService';
import UserService from '@/api/user/UserService';
import { useApi } from '@/api/ApiHandler';
import { InputValidation } from '@components/InputWithLabel/InputWithLabel';

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<InputValidation>({ isError: false, errorHelperText: '' });
  const [passwordError, setPasswordError] = useState<InputValidation>({ isError: false, errorHelperText: '' });
  const dispatch = useDispatch();
  const history = useHistory();
  const [login] = useApi(() => AuthService.login(email, password), true, true, false);
  const [getSelf] = useApi(() => UserService.getSelf(), true, true, false);

  const signUpRoute: LandingRoute = {
    route: Routes.authentication.signUp,
    routeText: 'Sign Up',
  };

  const forgetPasswordRoute: LandingRoute = {
    route: Routes.authentication.forgetPassword,
    routeText: 'Forgot your password',
  };

  const formValidation = () => {
    const errorText = 'Field Cannot be Empty';
    const errorObj: InputValidation = {
      isError: true,
      errorHelperText: errorText,
    };
    const noErrorObj: InputValidation = {
      isError: false,
      errorHelperText: '',
    };
    const isValidEmail = email.length !== 0;
    const isValidPassword = password.length !== 0;
    setEmailError(isValidEmail ? noErrorObj : errorObj);
    setPasswordError(isValidPassword ? noErrorObj : errorObj);

    if (!isValidEmail || !isValidPassword) {
      throw new Error('Form Invalid');
    }
  };

  const handleSignIn = async () => {
    try {
      setIsLoading(true);
      formValidation();
      await login();
      const res = await getSelf();
      if (res.isSuccess) {
        dispatch(updateCurrentUser(res.data));
        console.log(res.data);
        history.push('/home');
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  return (
    <>
      <LandingFormHeader title='Welcome back' description='Need to make an account?' route={signUpRoute} />
      <Stack direction='column' spacing={2}>
        <InputWithLabel
          inputHandleOnChange={input => setEmail(input.target.value)}
          inputValue={email}
          labelText='Email'
          inputPlaceholder='name@dulwich.org'
          inputType='text'
          inputValidation={emailError}
        />
        <InputWithLabel
          inputHandleOnChange={input => setPassword(input.target.value)}
          inputValue={password}
          labelText='Password'
          inputPlaceholder='6+ characters, 1 special character'
          inputType='password'
          inputValidation={passwordError}
        />
      </Stack>
      <LandingFormFooter handleOnClick={handleSignIn} buttonText='Sign in' footerLink={forgetPasswordRoute} loading={isLoading} />
    </>
  );
};

export default LoginForm;
