import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Stack, Input, Typography, Box, TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InputAdornment from '@mui/material/InputAdornment';

export default function RecurringBooking() {
  const [recurring, setRecurring] = React.useState<string>('');
  const [endDate, setEndDate] = React.useState<string>('');
  const [frequency, setFrequency] = React.useState<number>();

  const handleRecurringChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.defaultValue);
    setRecurring(event.target.defaultValue);
  };
  const endDatePicker: JSX.Element = (
    <Stack direction='row' spacing={4}>
      <Typography className='font-Inter text-bgGray'>On</Typography>
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
              className='font-Inter object-right align-center box-content rounded-md w-4/12 bg-bgWhiteDim'
            />
          )}
        />
      </LocalizationProvider>
    </Stack>
  );

  const ocurrences: JSX.Element = (
    <Stack direction='row' spacing={2}>
      <Typography className='font-Inter text-bgGray'>After</Typography>
      <Input
        type='number'
        className='font-Inter object-right align-center box-content rounded-md w-5/12 bg-bgWhiteDim'
        defaultValue={0}
        disableUnderline
        endAdornment={
          <InputAdornment position='end' className='font-Inter text-sm'>
            occuranes
          </InputAdornment>
        }
      />
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
