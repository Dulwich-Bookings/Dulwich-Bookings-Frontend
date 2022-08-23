import React from 'react';
import { TextField, Modal } from '@mui/material';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';
import moment, { Moment } from 'moment-timezone';

type Props = {
  openState: boolean;
  handleOnClose: () => void;
  handleOnChange: (time: Date) => void;
  time: Date;
  timezone: string;
};

const BookingTimePicker = (props: Props) => {
  const momentTime = moment(props.time).tz(props.timezone);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOnChange = (time: Moment | null) => {
    if (time === null) {
      return;
    }
    props.handleOnChange(time.toDate());
  };

  return (
    <Modal
      className='flex justify-center items-center shadow-lg border-2 border-dulwichRed'
      open={props.openState}
      onClose={props.handleOnClose}
    >
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <StaticTimePicker
          displayStaticWrapperAs='desktop'
          showToolbar={true}
          closeOnSelect={true}
          onAccept={props.handleOnClose}
          value={momentTime}
          onChange={handleOnChange}
          renderInput={params => <TextField {...params} />}
          minutesStep={5}
        />
      </LocalizationProvider>
    </Modal>
  );
};

export default BookingTimePicker;
