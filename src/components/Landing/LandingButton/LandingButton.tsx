import React from 'react';
import { Button } from '@mui/material';

type Props = {
  buttonText: string;
  handleOnClick: () => void;
};

const LandingButton = ({ buttonText, handleOnClick }: Props) => {
  return (
    <Button onClick={handleOnClick} className='bg-dulwichRed normal-case w-32 h-11 text-lg' variant='contained'>
      {buttonText}
    </Button>
  );
};

export default LandingButton;
