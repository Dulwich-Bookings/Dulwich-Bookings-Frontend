import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RecurringBooking from './RecurringBooking';

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
          className='font-Inter font-light px-2 align-center text-bgGray'
          aria-labelledby='demo-radio-buttons-group-label'
          name='radio-buttons-group'
          color='error'
          row
          onChange={handleRecurringChange}
        >
          <FormControlLabel value='weekly' control={<Radio color='error' />} label='Weekly' />
          <FormControlLabel value='biweekly' control={<Radio color='error' />} label='Biweekly' />
        </RadioGroup>
      </FormControl>
      {recurring == 'weekly' || recurring == 'biweekly' ? <RecurringBooking /> : <></>}
    </>
  );
}
