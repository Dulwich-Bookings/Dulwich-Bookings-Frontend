import React, { useState, useEffect } from 'react';
import { Stack, Input, Typography, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import TailWindTheme from '@/tailwind.config';
import { RecurringTypes, RecurringType } from '@/modules/Bookings/Types';
import { RRule } from 'rrule';

const { colors } = TailWindTheme.theme;

type Props = {
  recurring: RecurringTypes;
  rrule: RRule | null;
  handleChangeRRule: (rrule: RRule) => void;
  date: Date;
};

export type RecurrenceTypes = 'On' | 'After';
export const RecurrenceType = { ON: 'On' as RecurrenceTypes, AFTER: 'After' as RecurrenceTypes };

export default function RecurringBooking(props: Props) {
  const [recurrence, setRecurrence] = useState<RecurrenceTypes>(RecurrenceType.ON);
  const [endDate, setEndDate] = useState<Date>(props.rrule?.options.until ?? new Date());
  const [frequency, setFrequency] = useState<number>(props.rrule?.options.count ?? 1);

  const handleRecurringChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.defaultValue);
    setRecurrence(event.target.defaultValue === 'On' ? RecurrenceType.ON : RecurrenceType.AFTER);
  };

  useEffect(() => {
    const newRrule = new RRule({
      freq: RRule.WEEKLY,
      interval: props.recurring === RecurringType.WEEKLY ? 1 : 2,
      until: recurrence === RecurrenceType.ON ? endDate : null,
      count: recurrence === RecurrenceType.AFTER ? frequency : null,
      dtstart: props.date,
    });
    props.handleChangeRRule(newRrule);
  }, [recurrence, endDate, frequency, props.recurring]);

  const endDatePicker: JSX.Element = (
    <Stack direction='row' spacing={9} className='h-8 items-center'>
      <Typography className='font-Inter'>On</Typography>
      {recurrence === RecurrenceType.ON && (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            label='Enter Date'
            inputFormat='MM/dd/yyyy'
            value={endDate}
            onChange={newValue => {
              setEndDate(newValue as Date);
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
      {recurrence === RecurrenceType.AFTER && (
        <Stack direction='row' spacing={0} className='h-8 items-center'>
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
        value={recurrence}
      >
        <FormControlLabel
          value={RecurrenceType.ON}
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
          label={endDatePicker}
        />
        <FormControlLabel
          value={RecurrenceType.AFTER}
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
          label={ocurrences}
        />
      </RadioGroup>
    </FormControl>
  );
}
