import React from 'react';
import { Radio, RadioGroup, FormControlLabel, FormControl } from '@mui/material';

type Props = {
  bookingType: 'Booking' | 'Lesson';
  onChangeBookingType: (value: string) => void;
};

export default function BookingTypeWrapper(props: Props) {
  return (
    <FormControl>
      <RadioGroup
        className='font-Inter font-light px-2 align-center text-grayAccent mb-1'
        aria-labelledby='demo-radio-buttons-group-label'
        name='radio-buttons-group'
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          props.onChangeBookingType(event.target.defaultValue);
        }}
        value={props.bookingType}
        sx={{
          color: '#202020',
          '&.Mui-checked': {
            color: '#E33939',
          },
        }}
        row
      >
        <FormControlLabel
          value='Booking'
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
          label='Booking'
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
