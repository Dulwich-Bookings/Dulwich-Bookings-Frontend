import React from 'react';
import { Button } from '@mui/material';
import { Add } from '@mui/icons-material';

export type Props = {
  handleOnClick?: () => void;
};

const AddResourceButton = ({ handleOnClick }: Props) => {
  return (
    <Button
      onClick={handleOnClick}
      className='bg-dulwichRed normal-case rounded-lg mr-7 mt-2.5'
      variant='contained'
      size='small'
      disableElevation
    >
      <Add className='stroke-0 stroke-black' />
      <p className='font-Inter text-md tracking-tight py-0.5 px-1'>Resource</p>
    </Button>
  );
};

export default AddResourceButton;
