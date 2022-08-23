import React, { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import TailWindTheme from '@/tailwind.config';

import RecurringBooking from '@/components/Modals/BookingsModal/BookingForm/RecurringBookingWrapper/RecurringBooking/RecurringBooking';
import { RecurringTypes, RecurringType } from '@/modules/Bookings/Types';
import { RRule } from 'rrule';

const { colors } = TailWindTheme.theme;

type Props = {
  handleChangeRRule: (rrule: RRule) => void;
  rrule: RRule | null;
  date: Date;
  weekProfile: RecurringTypes;
};

export default function RecurringBookingWrapper(props: Props) {
  const [recurring, setRecurring] = useState<RecurringTypes>(
    props.rrule === null ? RecurringType.NONE : props.rrule.options.interval === 1 ? RecurringType.WEEKLY : RecurringType.BIWEEKLY,
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
      {recurring === RecurringType.NONE ? (
        <></>
      ) : (
        <RecurringBooking handleChangeRRule={props.handleChangeRRule} rrule={props.rrule} recurring={recurring} date={props.date} />
      )}
    </>
  );
}
