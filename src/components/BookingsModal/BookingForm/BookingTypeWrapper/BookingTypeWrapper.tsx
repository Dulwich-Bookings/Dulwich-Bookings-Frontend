import * as React from 'react';
import { Radio, RadioGroup, FormControlLabel, FormControl } from '@mui/material';

export default function BookingTypeWrapper() {
  return (
    <FormControl>
      <RadioGroup
        className='font-Inter font-light px-2 align-center text-grayAccent mb-1'
        aria-labelledby='demo-radio-buttons-group-label'
        name='radio-buttons-group'
        sx={{
          color: '#202020',
          '&.Mui-checked': {
            color: '#E33939',
          },
        }}
        row
      >
        <FormControlLabel
          value='Booked'
          className='pr-4'
          control={
            <Radio
              sx={{
                color: '#202020',
                '&.Mui-checked': {
                  color: '#E33939',
                },
              }}
            />
          }
          label='Booked'
        />
        <FormControlLabel
          value='Lesson'
          control={
            <Radio
              sx={{
                color: '#202020',
                '&.Mui-checked': {
                  color: '#E33939',
                },
              }}
            />
          }
          label='Lesson'
        />
      </RadioGroup>
    </FormControl>
  );
}
