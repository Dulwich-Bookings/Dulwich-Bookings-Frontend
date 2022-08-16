import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import RecurringBooking from '@components/BookingsModal/BookingForm/RecurringBookingWrapper/RecurringBooking/RecurringBooking';

type Props = {
  onChangeRecurring: (value: string) => void;
  recurring: 'Weekly' | 'BiWeekly' | 'None';
};

export default function RecurringBookingWraooer(props: Props) {
  const [recurring, setRecurring] = React.useState<'Weekly' | 'BiWeekly' | 'None'>(props.recurring);

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
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            props.onChangeRecurring(event.target.defaultValue);
            setRecurring(props.recurring);
          }}
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
      {recurring == 'None' ? <></> : <RecurringBooking />}
    </>
  );
}
