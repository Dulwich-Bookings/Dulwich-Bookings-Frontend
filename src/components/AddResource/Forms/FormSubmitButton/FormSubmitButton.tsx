import React from 'react';
import { CircularProgress } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

type Props = {
  buttonClassName?: string; //Optional for Button Styling
  textClassName?: string; //Optional for Text Styling
  buttonText: string;
  handleOnClick: () => void;
  loading?: boolean;
};

const FormSubmitButton = ({ buttonClassName, textClassName, buttonText, handleOnClick, loading }: Props) => {
  return (
    <LoadingButton
      loading={loading}
      onClick={handleOnClick}
      className={buttonClassName}
      variant='contained'
      loadingIndicator={<CircularProgress size={16} className='text-bgWhite' />}
    >
      <p className={`font-Inter text-xl capitalize ${textClassName}`}>{buttonText}</p>
    </LoadingButton>
  );
};

export default FormSubmitButton;
