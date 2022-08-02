import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import RecurringBooking from '@components/BookingsModal/BookingForm/RecurringBookingWrapper/RecurringBooking/RecurringBooking';

export default function RecurringBookingWraooer() {
  const [recurring, setRecurring] = React.useState<string>('');

  const handleRecurringChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.defaultValue);
    setRecurring(event.target.defaultValue);
  };
  return (
    <>
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
          onChange={handleRecurringChange}
        >
          <FormControlLabel
            value='weekly'
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
            label='Weekly'
          />
          <FormControlLabel
            value='biweekly'
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
            label='Biweekly'
          />
        </RadioGroup>
      </FormControl>
      {recurring == 'weekly' || recurring == 'biweekly' ? <RecurringBooking /> : <></>}
    </>
  );
}
