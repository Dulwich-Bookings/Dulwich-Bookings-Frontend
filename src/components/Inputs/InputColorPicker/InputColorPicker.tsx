import React, { useState } from 'react';

import { SketchPicker, ColorResult, HSLColor } from 'react-color';
import { InputAdornment, Stack, TextField, Typography } from '@mui/material';
import SquareIcon from '@mui/icons-material/Square';

type Props = {
  spacing?: number; // Optional definition for the space between Label and Input
  labelClassName?: string; // Optional ClassNames for Label
  inputClassName?: string; // Optional ClassNames for Input
  pickerClassName?: string; // Optional ClassNames for SketchPicker
  inputHandleOnChange: (input: string) => void; // Use with InputValue (Double Binding)
  inputValue?: string;
  required?: boolean;
};

// eslint-disable-next-line @typescript-eslint/ban-types
const InputColorPicker = (props: Props) => {
  const colSpacing = props.spacing ? props.spacing : 0.5;
  const defaultCursor: HSLColor = {
    a: 1,
    h: 249.99999999999994,
    l: 0.53021364,
    s: 0.6343018558478367,
  };

  const [cursor, setCursor] = useState<HSLColor>(defaultCursor);

  const handler = (val: ColorResult) => {
    setCursor(val.hsl);
    props.inputHandleOnChange(val.hex);
  };

  return (
    <>
      <Stack direction='column' spacing={colSpacing}>
        <Typography className={props.labelClassName} variant='h6'>
          {'Colour Picker'}
          {props.required && <label className='text-dulwichRed'> *</label>}
        </Typography>
        <TextField
          value={props.inputValue}
          InputProps={{
            endAdornment: (
              <InputAdornment className='cursor-pointer' position='end'>
                <SquareIcon
                  sx={{
                    color: `${props.inputValue}`,
                  }}
                />
              </InputAdornment>
            ),
          }}
          type='text'
          id='outlined-basic'
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
          }}
        />
        <Stack className='pt-1'>
          <SketchPicker className={props.pickerClassName} color={cursor} onChange={handler} />
        </Stack>
      </Stack>
    </>
  );
};

export default InputColorPicker;
