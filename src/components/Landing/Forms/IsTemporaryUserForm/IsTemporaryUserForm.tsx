import React from 'react';
import LandingFormHeader from '@components/Landing/LandingFormHeader/LandingFormHeader';

const IsTemporaryUserForm = () => {
  return (
    <LandingFormHeader
      title='Temporary User'
      description='You have either not set your password or not confirmed your email. Please check your email (and junk) for a link!'
    />
  );
};

export default IsTemporaryUserForm;
