import React from 'react';
import { Typography, Stack, RadioGroup, FormControlLabel, Radio, FormControl } from '@mui/material';
import { InputValidation } from '@/modules/inputValidation/types';

import TailWindTheme from '@/tailwind.config';

const { colors } = TailWindTheme.theme.extend;

type Props<inputType> = {
  spacing?: number; // Optional definition for the space between Label and Input
  labelText?: string;
  labelClassName?: string; // Optional ClassNames for Label
  inputClassName?: string; // Optional ClassNames for Input
  inputValidation?: InputValidation;
  inputValue?: inputType;
  inputHandleOnChange: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void; // Use with InputValue (Double Binding)
  required?: boolean;
  inputLabels: string[];
  disabled?: boolean;
};

// eslint-disable-next-line @typescript-eslint/ban-types
const InputWithRadio = <T extends Object>(props: Props<T>) => {
  const { inputValidation } = props;
  const colSpacing = props.spacing ? props.spacing : 0.5;
  const isError = inputValidation ? inputValidation.isError : false;

  const optionChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.inputHandleOnChange(event);
  };

  return (
    <Stack direction='column' spacing={colSpacing}>
      <Typography className={props.labelClassName} variant='h6'>
        {props.labelText}
        {props.required && <label className='text-dulwichRed'> *</label>}
      </Typography>

      <FormControl error={isError}>
        <RadioGroup
          defaultValue={props.inputLabels[0]}
          row
          onChange={optionChangeHandler}
          value={props.inputValue}
          className={props.inputClassName}
        >
          <FormControlLabel
            value={props.inputLabels[0]}
            control={
              <Radio
                disableRipple={true}
                sx={{
                  color: colors.bgDarkGray,
                  '&.Mui-checked': {
                    color: colors.dulwichRed,
                  },
                }}
              />
            }
            label={props.inputLabels[0]}
            disabled={props.disabled}
          ></FormControlLabel>
          <FormControlLabel
            value={props.inputLabels[1]}
            control={
              <Radio
                disableRipple={true}
                sx={{
                  color: colors.bgDarkGray,
                  '&.Mui-checked': {
                    color: colors.dulwichRed,
                  },
                }}
              />
            }
            label={props.inputLabels[1]}
            disabled={props.disabled}
          ></FormControlLabel>
        </RadioGroup>
      </FormControl>
    </Stack>
  );
};

export default InputWithRadio;
