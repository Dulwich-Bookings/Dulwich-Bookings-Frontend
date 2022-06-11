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
import { UserSignUpData } from '@/modules/user/types';

type Props = {
  schoolId: number;
};

const SignUpForm = ({ schoolId }: Props) => {
  const noError: InputValidation = { isError: false, errorHelperText: '' };
  const currentYear = new Date().getFullYear();
  const initSignUp: UserSignUpData = {
    email: '',
    password: '',
    passwordConfirmation: '',
    class: currentYear,
    schoolId: schoolId,
  };
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [signUpData, setSetUpData] = useState<UserSignUpData>(initSignUp);
  const [emailError, setEmailError] = useState<InputValidation>(noError);
  const [gradYearError, setGradYearError] = useState<InputValidation>(noError);
  const [passwordError, setPasswordError] = useState<InputValidation>(noError);
  const [passwordConfirmationError, setPasswordConfirmationError] = useState<InputValidation>(noError);

  const [signUp] = useApi(() => AuthService.register(signUpData), true, true, false);

  const loginRoute: LandingRoute = {
    route: Routes.authentication.login,
    routeText: 'Sign In',
  };

  const isFormValid = () => {
    const isYear = new RegExp('^(19|20)[\\d]{2,2}$');
    const emptyFieldError: InputValidation = {
      isError: true,
      errorHelperText: 'Field Cannot be Empty',
    };
    const yearInvalidError: InputValidation = {
      isError: true,
      errorHelperText: 'Given year is invalid',
    };
    const isValidEmail = signUpData.email.length !== 0;
    const isValidPassword = signUpData.password.length !== 0;
    const isValidConfirmPassword = signUpData.passwordConfirmation.length !== 0;
    const year = signUpData.class ? signUpData.class.toString() : '';
    const isValidYear = isYear.test(year);

    setEmailError(isValidEmail ? noError : emptyFieldError);
    setPasswordError(isValidPassword ? noError : emptyFieldError);
    setGradYearError(isValidYear ? noError : yearInvalidError);
    setPasswordConfirmationError(isValidConfirmPassword ? noError : emptyFieldError);

    if (!isValidEmail || !isValidPassword || !isValidYear) {
      throw new Error('Form Invalid');
    }
  };

  const handleSignUp = async () => {
    setIsLoading(true);
    try {
      isFormValid();
      await signUp();
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  return (
    <>
      <LandingFormHeader title='Sign Up' description='Already have an account?' route={loginRoute} />
      <form autoComplete='off'>
        <Stack direction='column' spacing={2}>
          <InputWithLabel
            inputValue={signUpData.email}
            inputHandleOnChange={input => setSetUpData({ ...signUpData, email: input.target.value })}
            labelText='Email'
            inputPlaceholder='name@dulwich.org'
            inputType='text'
            inputValidation={emailError}
          />
          <InputWithLabel
            inputValue={signUpData.class}
            inputHandleOnChange={input => setSetUpData({ ...signUpData, class: parseInt(input.target.value) })}
            labelText='Graduation Year'
            inputPlaceholder={currentYear.toString()}
            inputType='number'
            inputValidation={gradYearError}
          />
          <InputWithLabel
            inputValue={signUpData.password}
            inputHandleOnChange={input => setSetUpData({ ...signUpData, password: input.target.value })}
            labelText='Password'
            inputPlaceholder='6+ characters, 1 special character'
            inputType='password'
            inputValidation={passwordError}
          />
          <InputWithLabel
            inputValue={signUpData.passwordConfirmation}
            inputHandleOnChange={input => setSetUpData({ ...signUpData, passwordConfirmation: input.target.value })}
            labelText='Confirm Password'
            inputPlaceholder='6+ characters, 1 special character'
            inputType='password'
            inputValidation={passwordConfirmationError}
          />
        </Stack>
      </form>
      <LandingFormFooter handleOnClick={handleSignUp} buttonText='Sign Up' loading={isLoading} />
    </>
  );
};

export default SignUpForm;
