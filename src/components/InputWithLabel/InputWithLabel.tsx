import React from 'react';
import { Typography, TextField, Stack } from '@mui/material';

export type InputValidation = {
  isError: boolean;
  errorHelperText: string;
};

type Props = {
  spacing?: number; // Optional definition for the space between Label and Input
  labelText: string;
  labelClassName?: string; // Optional ClassNames for Label
  inputPlaceholder: string;
  inputType: string;
  inputClassName?: string; // Optional ClassNames for Input
  inputValidation?: InputValidation;
  inputVariant?: 'outlined' | 'standard' | 'filled';
  inputValue?: string;
  inputHandleOnChange?: () => void; // Use with InputValue (Double Binding)
  required?: boolean;
};

const InputWithLabel = (props: Props) => {
  const { inputValidation } = props;
  const colSpacing = props.spacing ? props.spacing : 0.5;
  const isError = inputValidation ? inputValidation.isError : false;
  const errorHelperText = isError ? inputValidation?.errorHelperText : '';

  return (
    <Stack direction='column' spacing={colSpacing}>
      <Typography className={props.labelClassName} variant='h6'>
        {props.labelText}
        {props.required && <label className='text-dulwichRed'> *</label>}
      </Typography>
      <TextField
        error={isError}
        helperText={errorHelperText}
        value={props.inputValue}
        onChange={props.inputHandleOnChange}
        type={props.inputType}
        id='outlined-basic'
        label={props.inputPlaceholder}
        variant={props.inputVariant ? props.inputVariant : 'outlined'}
        className={props.inputClassName}
      />
    </Stack>
  );
};

export default InputWithLabel;
