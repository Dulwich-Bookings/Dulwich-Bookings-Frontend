import React from 'react';
import { Typography, Stack, FormControlLabel, FormControl, FormGroup, Checkbox, FormHelperText } from '@mui/material';
import { InputValidation } from '@/modules/inputValidation/types';
import { useState } from 'react';

import TailWindTheme from '@/tailwind.config';

const { colors } = TailWindTheme.theme;

type Props<inputType> = {
  spacing?: number; // Optional definition for the space between Label and Input
  labelText: string;
  inputLabelText: string[];
  labelClassName?: string; // Optional ClassNames for Label
  inputClassName?: string; // Optional ClassNames for Input
  inputValidation?: InputValidation;
  inputValue?: inputType;
  inputHandleOnChange: (option1: boolean, option2: boolean) => void; // Use with InputValue (Double Binding)
  required?: boolean;
};

// eslint-disable-next-line @typescript-eslint/ban-types
const InputCheckBox = <T extends Object>(props: Props<T>) => {
  const [options, setOptions] = useState({ option1: false, option2: false });
  const { option1, option2 } = options;

  const { inputValidation } = props;
  const isError = inputValidation ? inputValidation.isError : false;

  const optionChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const data = { ...options, [event.target.name]: event.target.checked };
    setOptions(data);
    props.inputHandleOnChange(data.option1, data.option2);
  };

  return (
    <Stack className={props.inputClassName}>
      <Stack direction='row' spacing={1}>
        <Typography className='text-[#404040] text-xl font-inter'>{props.labelText}</Typography>
        {props.required && <Typography className='text-dulwichRed text-xxl font-inter'>*</Typography>}
      </Stack>
      <FormControl error={isError}>
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                name='option1'
                checked={option1}
                onChange={event => {
                  optionChangeHandler(event);
                }}
                disableRipple
                sx={{
                  color: '#BFBFBF',
                  '&.Mui-checked': {
                    color: colors.dulwichRed,
                  },
                }}
              />
            }
            label={props.inputLabelText[0]}
          />
          <FormControlLabel
            control={
              <Checkbox
                name='option2'
                checked={option2}
                onChange={event => {
                  optionChangeHandler(event);
                }}
                disableRipple
                sx={{
                  color: '#BFBFBF',
                  '&.Mui-checked': {
                    color: colors.dulwichRed,
                  },
                }}
              />
            }
            label={props.inputLabelText[1]}
          />
        </FormGroup>
        {isError && <FormHelperText className='m-0'>Please select at least one option</FormHelperText>}
      </FormControl>
    </Stack>
  );
};

export default InputCheckBox;
