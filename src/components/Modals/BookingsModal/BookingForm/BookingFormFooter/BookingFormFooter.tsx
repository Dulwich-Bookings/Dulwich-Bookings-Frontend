import { Stack } from '@mui/material';
import React from 'react';
import BookingButton from '@components/BookingsModal/BookingForm/BookingFormFooter/BookingButton/BookingButton';

type Props = {
  editable: boolean;
  newBooking: boolean;
  handleOnBook: () => void;
  handleOnSave: () => void;
  handleOnDelete: () => void;
  handleOnContact: () => void;
};

const BookingFormFooter = (props: Props) => {
  return (
    <>
      {!props.newBooking && props.editable && (
        <Stack direction='row' className='w-full' spacing={2}>
          <>
            <BookingButton buttonText='Save' handleOnClick={props.handleOnSave} />
            <BookingButton buttonText='Delete' handleOnClick={props.handleOnDelete} />
          </>
        </Stack>
      )}
      {!props.newBooking && !props.editable && (
        <div className='w-full'>
          <BookingButton buttonText='Contact' handleOnClick={props.handleOnContact} />
        </div>
      )}
      {props.newBooking && (
        <div className='w-full'>
          <BookingButton buttonText='Book' handleOnClick={props.handleOnBook} />
        </div>
      )}
    </>
  );
};

export default BookingFormFooter;
