import * as React from 'react';
import ReactDOM from 'react-dom';
import Button from '@mui/material/Button';

const SignInButt = () => {
  return (
    <div>
      <Button
        variant='contained'
        className='absolute top-660 left-1063 bg-butt text-XXL capitalized font-inter leading-7 text-center flex-row items-start pl-18 pt-53 gap-10 w-195 h-65
    shadow-[0_4px_4px-10px_rgba(0,0,0,0.25)]'
      >
        sign in
      </Button>
    </div>
  );
};

export default SignInButt;
