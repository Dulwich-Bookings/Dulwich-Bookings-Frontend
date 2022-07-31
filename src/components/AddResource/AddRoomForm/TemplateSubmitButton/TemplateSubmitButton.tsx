import React from 'react';
import { CircularProgress, FormHelperText } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { styled } from '@mui/material/styles';

const Input = styled('input')({
  display: 'none',
});

type Props = {
  buttonText: string;
  helperText: string;
  handleOnClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  loading?: boolean;
};

const TemplateSubmitButton = ({ buttonText, helperText, handleOnClick, loading }: Props) => {
  return (
    <label htmlFor={buttonText}>
      <Input accept='.csv' id={buttonText} type='file' onChange={e => handleOnClick(e)} />
      <LoadingButton
        loading={loading}
        component='span'
        className='w-72 h-16 bg-dulwichRed rounded-xl text-bgWhite font-inter text-xl'
        variant='contained'
        loadingIndicator={<CircularProgress size={16} className='text-bgWhite' />}
      >
        {buttonText}
      </LoadingButton>
      <FormHelperText className='text-center'>{helperText}</FormHelperText>
    </label>
  );
};

export default TemplateSubmitButton;
