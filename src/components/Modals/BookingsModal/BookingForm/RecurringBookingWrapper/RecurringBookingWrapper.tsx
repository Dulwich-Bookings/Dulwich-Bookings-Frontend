import React, { useState } from 'react';

import { Radio, RadioGroup, FormControlLabel, FormControl, Grid, Typography } from '@mui/material';
import TailWindTheme from '@/tailwind.config';

import RecurringBooking from '@/components/Modals/BookingsModal/BookingForm/RecurringBookingWrapper/RecurringBooking/RecurringBooking';
import { RecurringTypes, RecurringType } from '@/modules/Bookings/Types';
import { RRule } from 'rrule';

const { colors } = TailWindTheme.theme.extend;

type Props = {
  handleChangeRRule: (rrule: RRule) => void;
  rrule?: RRule;
  date: Date;
  weekProfile: RecurringTypes;
  newBooking: boolean;
};

export default function RecurringBookingWrapper(props: Props) {
  const [recurring, setRecurring] = useState<RecurringTypes>(
    props.rrule ? (props.rrule?.options.interval === 1 ? RecurringType.WEEKLY : RecurringType.BIWEEKLY) : RecurringType.NONE,
  );

  const onChangeRecurring = (value: string) => {
    value === RecurringType.WEEKLY
      ? setRecurring(RecurringType.WEEKLY)
      : value === RecurringType.BIWEEKLY
      ? setRecurring(RecurringType.BIWEEKLY)
      : setRecurring(RecurringType.NONE);
  };

  return (
    <>
      <Grid container className='w-full items-center'>
        <Grid item>
          <FormControl>
            <RadioGroup
              value={recurring}
              className='font-Inter font-light pl-2 align-center text-grayAccent mb-1'
              aria-labelledby='demo-radio-buttons-group-label'
              name='radio-buttons-group'
              sx={{
                color: colors.bgBlack,
                '&.Mui-checked': {
                  color: colors.dulwichRed,
                },
              }}
              row
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                onChangeRecurring(event.target.defaultValue);
              }}
            >
              {props.weekProfile === RecurringType.WEEKLY && (
                <FormControlLabel
                  value={RecurringType.WEEKLY}
                  className='pr-5'
                  control={
                    <Radio
                      disabled={props.newBooking ? false : true}
                      sx={{
                        color: colors.bgBlack,
                        '&.Mui-checked': {
                          color: colors.dulwichRed,
                        },
                      }}
                    />
                  }
                  label={RecurringType.WEEKLY}
                />
              )}
              <FormControlLabel
                value={RecurringType.BIWEEKLY}
                control={
                  <Radio
                    disabled={props.newBooking ? false : true}
                    sx={{
                      color: colors.bgBlack,
                      '&.Mui-checked': {
                        color: colors.dulwichRed,
                      },
                    }}
                  />
                }
                label={RecurringType.BIWEEKLY}
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        {recurring !== RecurringType.NONE && (
          <Grid item className='h-full'>
            {props.newBooking && (
              <Typography
                className='text-dulwichRed hover:underline pl-2 mb-1'
                onClick={() => {
                  setRecurring(RecurringType.NONE);
                }}
              >
                Undo
              </Typography>
            )}
          </Grid>
        )}
      </Grid>
      {recurring === RecurringType.NONE ? (
        <></>
      ) : (
        <RecurringBooking
          handleChangeRRule={props.handleChangeRRule}
          rrule={props.rrule}
          recurring={recurring}
          date={props.date}
          newBooking={props.newBooking}
        />
      )}
    </>
  );
}
