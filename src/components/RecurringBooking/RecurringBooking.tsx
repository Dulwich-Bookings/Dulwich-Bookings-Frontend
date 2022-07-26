import * as React from 'react';
import { Stack, Input, Typography, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function RecurringBooking() {
  const [recurrence, setRecurrence] = React.useState<string>('');
  const [endDate, setEndDate] = React.useState<string>('');
  const [frequency, setFrequency] = React.useState<number>(0);

  const handleRecurringChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.defaultValue);
    setRecurrence(event.target.defaultValue);
  };
  const endDatePicker: JSX.Element = (
    <Stack direction='row' spacing={4}>
      <Typography className='font-Inter text-bgGray'>On</Typography>
      {recurrence == 'on' ? (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            disableFuture
            label='Responsive'
            openTo='year'
            views={['year', 'month', 'day']}
            value={endDate}
            onChange={newValue => {
              setEndDate(newValue as string);
            }}
            renderInput={({ inputRef, inputProps }) => (
              <input
                ref={inputRef}
                {...inputProps}
                className='font-Inter object-right align-center box-content rounded-md w-6/12 bg-bgWhiteDim'
              />
            )}
          />
        </LocalizationProvider>
      ) : (
        <></>
      )}
    </Stack>
  );

  const ocurrences: JSX.Element = (
    <Stack direction='row' spacing={2}>
      <Typography className='font-Inter text-bgGray'>After</Typography>
      {recurrence == 'after' ? (
        <Stack direction='row' spacing={0}>
          <Input
            type='number'
            className='font-Inter object-right align-center box-content rounded-md w-2/6 bg-bgWhiteDim h-auto'
            value={frequency}
            disableUnderline
            onChange={event => {
              setFrequency(parseInt(event.target.value));
              console.log(event);
            }}
          />
          <Input
            type='string'
            className='font-Inter object-right align-center box-content rounded-md w-1/2 bg-bgWhiteDim h-auto'
            value='ocurrances'
            disableUnderline
            readOnly
          />
        </Stack>
      ) : (
        <></>
      )}
    </Stack>
  );

  return (
    <FormControl>
      <FormLabel className='font-Inter text-bgGray px-2 '>Ends</FormLabel>
      <RadioGroup
        className='font-Inter font-light px-2 align-center text-bgGray'
        aria-labelledby='demo-radio-buttons-group-label'
        name='radio-buttons-group'
        color='error'
        onChange={handleRecurringChange}
        defaultValue='never'
      >
        <FormControlLabel value='never' control={<Radio color='error' />} label='Never' />
        <FormControlLabel value='on' control={<Radio color='error' />} label={endDatePicker} />
        <FormControlLabel value='after' control={<Radio color='error' />} label={ocurrences} />
      </RadioGroup>
    </FormControl>
  );
}
