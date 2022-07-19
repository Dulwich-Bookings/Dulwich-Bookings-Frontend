import React from 'react';
import { Typography, Stack, RadioGroup, FormControlLabel, Radio, FormControl } from '@mui/material';
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
  inputLabels: string[];
};

// eslint-disable-next-line @typescript-eslint/ban-types
const InputWithRadio = <T extends Object>(props: Props<T>) => {
  const { inputValidation } = props;
  const colSpacing = props.spacing ? props.spacing : 0.5;
  const isError = inputValidation ? inputValidation.isError : false;

  return (
    <Stack direction='column' spacing={colSpacing}>
      <Typography className={props.labelClassName} variant='h6'>
        {props.labelText}
        {props.required && <label className='text-dulwichRed'> *</label>}
      </Typography>

      <FormControl error={isError}>
        <RadioGroup defaultValue={props.inputLabels[0]} row onChange={props.inputHandleOnChange} value={props.inputValue}>
          <FormControlLabel
            value={props.inputLabels[0]}
            control={
              <Radio
                disableRipple={true}
                sx={{
                  color: '#202020',
                  '&.Mui-checked': {
                    color: '#E33939',
                  },
                }}
              />
            }
            label={props.inputLabels[0]}
            color='dulwichRed'
          ></FormControlLabel>
          <FormControlLabel
            value={props.inputLabels[1]}
            control={
              <Radio
                disableRipple={true}
                sx={{
                  color: '#202020',
                  '&.Mui-checked': {
                    color: '#E33939',
                  },
                }}
              />
            }
            label={props.inputLabels[1]}
          ></FormControlLabel>
        </RadioGroup>
      </FormControl>
    </Stack>
  );
};

export default InputWithRadio;
