import React from 'react';
import { CircularProgress, FormHelperText } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { styled } from '@mui/material/styles';

const Input = styled('input')({
  display: 'none',
});

type Props = {
  buttonClassName?: string; //Optional for Button Styling
  buttonTextClassName?: string;
  buttonText: string;
  helperText: string;
  handleOnClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  loading?: boolean;
};

const TemplateSubmitButton = ({ buttonClassName, buttonTextClassName, buttonText, helperText, handleOnClick, loading }: Props) => {
  return (
    <label htmlFor={buttonText}>
      <Input accept='.csv' id={buttonText} type='file' onChange={e => handleOnClick(e)} />
      <LoadingButton
        loading={loading}
        component='span'
        className={buttonClassName}
        variant='contained'
        loadingIndicator={<CircularProgress size={16} className='text-bgWhite' />}
      >
        <p className={`font-Inter text-xl capitalize ${buttonTextClassName}`}>{buttonText}</p>
      </LoadingButton>
      <FormHelperText className='text-center'>{helperText}</FormHelperText>
    </label>
  );
};

export default TemplateSubmitButton;
