import React from 'react';
import { Typography, TextField, Stack, TextFieldProps } from '@mui/material';
import { InputValidation } from '@/modules/inputValidation/types';

type Props<inputType> = {
  spacing?: number; // Optional definition for the space between Label and Input
  labelText: string;
  labelClassName?: string; // Optional ClassNames for Label
  inputPlaceholder?: string;
  inputType: string;
  inputClassName?: string; // Optional ClassNames for Input
  inputProps?: TextFieldProps;
  inputValidation?: InputValidation;
  inputVariant?: 'outlined' | 'standard' | 'filled';
  inputValue?: inputType;
  inputSize?: 'small' | 'medium' | undefined;
  inputRow?: number;
  inputHandleOnChange?: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void; // Use with InputValue (Double Binding)
  inputHandleOnFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  inputHandleOnBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  multiline?: boolean;
  required?: boolean;
};

// eslint-disable-next-line @typescript-eslint/ban-types
const InputWithoutBorder = <T extends Object>(props: Props<T>) => {
  const { inputValidation, inputProps } = props;
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
        {...inputProps}
        error={isError}
        helperText={errorHelperText}
        value={props.inputValue}
        onChange={props.inputHandleOnChange}
        onFocus={props.inputHandleOnFocus}
        onBlur={props.inputHandleOnBlur}
        type={props.inputType}
        size={props.inputSize}
        rows={props.inputRow}
        multiline={props.multiline}
        id='outlined-basic'
        placeholder={props.inputPlaceholder}
        variant={props.inputVariant ? props.inputVariant : 'outlined'}
        className={props.inputClassName}
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderWidth: '0px',
            },
            '&.Mui-focused fieldset': {
              border: 1,
              borderColor: '#E33939',
            },
          },
          '& .Mui-error': {
            '& fieldset': {
              border: 1,
              borderColor: '#E33939',
            },
            '& input': {
              backgroundColor: 'white',
            },
            '&.MuiFormHelperText-root': {
              backgroundColor: 'white',
              marginX: '0',
              paddingX: '14px',
              zIndex: 0,
            },
          },
        }}
      />
    </Stack>
  );
};

export default InputWithoutBorder;
