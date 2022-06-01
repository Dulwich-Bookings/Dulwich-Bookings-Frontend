import React from 'react';
import SignInButt from '@/modules/ui/SignInButt';
import Form from '@/modules/ui/Form';
import { Sign } from 'crypto';

const Landing = () => {
  return (
    <div>
      <Form />
      <SignInButt />
    </div>
  );
};

export default Landing;
