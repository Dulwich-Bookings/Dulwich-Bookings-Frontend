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
    <Stack direction='row' spacing={9}>
      <Typography className='font-Inter'>On</Typography>
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
    <Stack direction='row' spacing={6} className='h-6'>
      <Typography className='font-Inter align-center'>After</Typography>
      {recurrence == 'after' ? (
        <Stack direction='row' spacing={-2}>
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
      ) : (
        <></>
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
        sx={{
          color: '#202020',
          '&.Mui-checked': {
            color: '#E33939',
          },
        }}
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
