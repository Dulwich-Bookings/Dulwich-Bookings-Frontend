import React from 'react';
import { Typography, TextField, Stack, RadioGroup, FormControlLabel, Radio, FormControl, FormGroup, Checkbox } from '@mui/material';
import { InputValidation } from '@/modules/inputValidation/types';

type Props<inputType> = {
  spacing?: number; // Optional definition for the space between Label and Input
  labelText: string;
  labelClassName?: string; // Optional ClassNames for Label
  inputClassName?: string; // Optional ClassNames for Input
  inputValidation?: InputValidation;
  inputValue?: inputType;
  inputHandleOnChange?: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void; // Use with InputValue (Double Binding)
  required?: boolean;
};

// eslint-disable-next-line @typescript-eslint/ban-types
const InputWithCheckBox = <T extends Object>(props: Props<T>) => {
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

      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              onChange={props.inputHandleOnChange}
              name='student'
              disableRipple
              sx={{
                color: '#BFBFBF',
                '&.Mui-checked': {
                  color: '#E33939',
                },
              }}
            />
          }
          label='Students'
        />
        <FormControlLabel
          control={
            <Checkbox
              onChange={props.inputHandleOnChange}
              name='teacher'
              disableRipple
              sx={{
                color: '#BFBFBF',
                '&.Mui-checked': {
                  color: '#E33939',
                },
              }}
            />
          }
          label='Teachers'
        />
      </FormGroup>
    </Stack>
  );
};

export default InputWithCheckBox;
