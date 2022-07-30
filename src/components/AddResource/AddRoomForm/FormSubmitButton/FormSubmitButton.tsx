import React from 'react';
import { CircularProgress } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

type Props = {
  buttonText: string;
  handleOnClick: () => void;
  loading?: boolean;
};

const FormSubmitButton = ({ buttonText, handleOnClick, loading }: Props) => {
  return (
    <LoadingButton
      loading={loading}
      onClick={handleOnClick}
      className='w-56 h-16 bg-dulwichRed rounded-xl text-bgWhite font-inter text-xl'
      variant='contained'
      loadingIndicator={<CircularProgress size={16} className='text-bgWhite' />}
    >
      {buttonText}
    </LoadingButton>
  );
};

export default FormSubmitButton;
