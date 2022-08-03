import * as React from 'react';
import { Stack, Input, Typography, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

export default function RecurringBooking() {
  const [recurrence, setRecurrence] = React.useState<string>('');
  const [endDate, setEndDate] = React.useState<string>('');
  const [frequency, setFrequency] = React.useState<number>(0);

  const handleRecurringChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.defaultValue);
    setRecurrence(event.target.defaultValue);
  };
  const endDatePicker: JSX.Element = (
    <Stack direction='row' spacing={9} className='h-8 items-center'>
      <Typography className='font-Inter'>On</Typography>
      {recurrence == 'on' && (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            label='Enter Date'
            inputFormat='MM/dd/yyyy'
            value={endDate}
            onChange={newValue => {
              setEndDate(newValue as string);
            }}
            renderInput={params => <TextField size='small' color='info' {...params} />}
          />
        </LocalizationProvider>
      )}
    </Stack>
  );

  const ocurrences: JSX.Element = (
    <Stack direction='row' spacing={7} className='h-8 items-center'>
      <Typography className='font-Inter align-center'>After</Typography>
      {recurrence == 'after' && (
        <Stack direction='row' spacing={-2} className='h-8 items-center'>
          <Input
            type='number'
            className='font-Inter object-right align-center box-content rounded-md w-10 bg-bgWhiteDim h-auto hover:bg-bgGray focus-within:bg-gray'
            value={frequency}
            disableUnderline
            onChange={event => {
              setFrequency(parseInt(event.target.value));
              console.log(event);
            }}
          />
          <Typography className='font-Inter align-center'>occurrences</Typography>
        </Stack>
      )}
    </Stack>
  );

  return (
    <FormControl>
      <FormLabel className='font-Inter text-bgBlack px-2'>Ends</FormLabel>
      <RadioGroup
        className='font-Inter font-light px-2 align-center text-grayAccent'
        aria-labelledby='demo-radio-buttons-group-label'
        name='radio-buttons-group'
        onChange={handleRecurringChange}
        defaultValue='never'
      >
        <FormControlLabel
          value='on'
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
          label={endDatePicker}
        />
        <FormControlLabel
          value='after'
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
          label={ocurrences}
        />
      </RadioGroup>
    </FormControl>
  );
}
