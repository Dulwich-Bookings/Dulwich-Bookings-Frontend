import React from 'react';
import { Radio, RadioGroup, FormControlLabel, FormControl } from '@mui/material';
import TailWindTheme from '@/tailwind.config';

import { BookingTypes, BookingType } from '@/modules/Bookings/Types';

const { colors } = TailWindTheme.theme;

type Props = {
  bookingType: BookingTypes;
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
          color: colors.bgBlack,
          '&.Mui-checked': {
            color: colors.dulwichRed,
          },
        }}
        row
      >
        <FormControlLabel
          value={BookingType.BOOKING}
          className='pr-4'
          control={
            <Radio
              sx={{
                color: colors.bgBlack,
                '&.Mui-checked': {
                  color: colors.dulwichRed,
                },
              }}
            />
          }
          label={BookingType.BOOKING}
        />
        <FormControlLabel
          value={BookingType.LESSON}
          control={
            <Radio
              sx={{
                color: colors.bgBlack,
                '&.Mui-checked': {
                  color: colors.dulwichRed,
                },
              }}
            />
          }
          label={BookingType.LESSON}
        />
      </RadioGroup>
    </FormControl>
  );
}
