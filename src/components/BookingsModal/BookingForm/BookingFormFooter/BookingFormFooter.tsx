import { Stack } from '@mui/material';
import React from 'react';
import BookingButton from '@components/BookingsModal/BookingForm/BookingFormFooter/BookingButton/BookingButton';

type Props = {
  type: string;
  handleOnBook: () => void;
  handleOnSave: () => void;
  handleOnDelete: () => void;
  handleOnContact: () => void;
};

const BookingFormFooter = (props: Props) => {
  if (props.type == 'editable') {
    return (
      <Stack direction='row' className='w-full' spacing={2}>
        <>
          <BookingButton buttonText='Save' handleOnClick={props.handleOnSave} />
          <BookingButton buttonText='Delete' handleOnClick={props.handleOnDelete} />
        </>
      </Stack>
    );
  }
  if (props.type == 'noneditable') {
    return (
      <div className='w-full'>
        <BookingButton buttonText='Contact' handleOnClick={props.handleOnContact} />
      </div>
    );
  }
  return (
    <div className='w-full'>
      <BookingButton buttonText='Book' handleOnClick={props.handleOnBook} />
    </div>
  );
};

export default BookingFormFooter;
