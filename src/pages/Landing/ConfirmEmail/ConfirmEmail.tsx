import React from 'react';
import ConfirmEmailForm from '@components/Landing/Forms/ConfirmEmailForm/ConfirmEmailForm';
import LandingWrapper from '@components/Landing/LandingWrapper/LandingWrapper';

const ConfirmEmail = () => {
  return <LandingWrapper showSelectLocation={false} Form={ConfirmEmailForm} />;
};

export default ConfirmEmail;
