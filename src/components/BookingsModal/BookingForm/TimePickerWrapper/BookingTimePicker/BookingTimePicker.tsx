import React, { useState } from 'react';
import { TextField, Modal } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';

type Props = {
  openState: boolean;
  handleOnClose: () => void;
  handleOnChange: (time: string) => void;
  time: string;
};

const BookingTimePicker = (props: Props) => {
  const [time, setTime] = useState<string>('');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOnChange = (time: any) => {
    setTime(time);
    props.handleOnChange(time);
  };
  return (
    <Modal
      className='flex justify-center items-center shadow-lg border-2 border-dulwichRed'
      open={props.openState}
      onClose={props.handleOnClose}
    >
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <StaticTimePicker
          displayStaticWrapperAs='desktop'
          showToolbar={true}
          closeOnSelect={true}
          onAccept={props.handleOnClose}
          value={time}
          onChange={handleOnChange}
          renderInput={params => <TextField {...params} />}
        />
      </LocalizationProvider>
    </Modal>
  );
};

export default BookingTimePicker;
