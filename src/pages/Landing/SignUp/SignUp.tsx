import React from 'react';
import LandingWrapper from '@/components/Landing/LandingWrapper/LandingWrapper';
import SignUpForm from '@/components/Landing/Forms/SignUpForm/SignUpForm';

const SignUp = () => {
  return <LandingWrapper Form={SignUpForm} spacing={4} />;
};

export default SignUp;
