import React from 'react';
import IsTemporaryUserForm from '@/components/Landing/Forms/IsTemporaryUserForm/IsTemporaryUserForm';
import LandingWrapper from '@components/Landing/LandingWrapper/LandingWrapper';

const IsTemporaryUser = () => {
  return <LandingWrapper showSelectLocation={false} Form={IsTemporaryUserForm} />;
};

export default IsTemporaryUser;
