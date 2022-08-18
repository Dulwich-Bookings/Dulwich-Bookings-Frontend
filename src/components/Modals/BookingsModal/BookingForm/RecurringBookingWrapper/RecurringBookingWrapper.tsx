import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import RecurringBooking from '@/components/Modals/BookingsModal/BookingForm/RecurringBookingWrapper/RecurringBooking/RecurringBooking';
import { Recurring } from '@/modules/Bookings/Types';

type Props = {
  onChangeRecurring: (value: string) => void;
  recurring: Recurring;
};

export default function RecurringBookingWrapper(props: Props) {
  return (
    <>
      <FormControl>
        <RadioGroup
          value={props.recurring}
          className='font-Inter font-light pl-2 align-center text-grayAccent mb-1'
          aria-labelledby='demo-radio-buttons-group-label'
          name='radio-buttons-group'
          sx={{
            color: '#202020',
            '&.Mui-checked': {
              color: '#E33939',
            },
          }}
          row
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            props.onChangeRecurring(event.target.defaultValue);
          }}
        >
          <FormControlLabel
            value='Weekly'
            className='pr-5'
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
            label='Weekly'
          />
          <FormControlLabel
            value='BiWeekly'
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
            label='BiWeekly'
          />
        </RadioGroup>
      </FormControl>
      {props.recurring === 'None' ? <></> : <RecurringBooking />}
    </>
  );
}
