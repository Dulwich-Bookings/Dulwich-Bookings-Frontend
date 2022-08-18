import React from 'react';
import { Typography, TextField, Stack } from '@mui/material';
import { InputValidation } from '@/modules/inputValidation/types';

import TailWindTheme from '@/tailwind.config';

const { colors } = TailWindTheme.theme;

type Props<inputType> = {
  spacing?: number; // Optional definition for the space between Label and Input
  labelText: string;
  labelClassName?: string; // Optional ClassNames for Label
  inputPlaceholder: string;
  inputType: string;
  inputClassName?: string; // Optional ClassNames for Input
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
              borderColor: colors.dulwichRed,
            },
          },
          '& .Mui-error': {
            '& fieldset': {
              border: 1,
              borderColor: colors.dulwichRed,
            },
            '& input': {
              backgroundColor: colors.white,
            },
            '&.MuiFormHelperText-root': {
              backgroundColor: colors.white,
              marginX: '0',
              paddingX: '14px',
            },
          },
        }}
      />
    </Stack>
  );
};

export default InputWithoutBorder;
