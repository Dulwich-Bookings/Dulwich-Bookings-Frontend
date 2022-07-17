import React from 'react';
import { CircularProgress } from '@mui/material';
import { LoadingButton } from '@mui/lab';

type Props = {
  buttonText: string;
  handleOnClick?: () => void;
  loading?: boolean;
};

const BookingButton = ({ buttonText, handleOnClick, loading }: Props) => {
  return (
    <LoadingButton
      loading={loading}
      onClick={handleOnClick}
      className='bg-dulwichRed normal-case w-72 h-8 font-Inter font-light text-lg w-full drop-shadow-none'
      variant='contained'
      loadingIndicator={<CircularProgress size={16} className='text-bgWhite text-s' />}
    >
      {buttonText}
    </LoadingButton>
  );
};

export default BookingButton;
