import React, { useEffect, useState, useRef } from 'react';
import { Modal, createTheme, Stack, ThemeProvider, Box, Input } from '@mui/material';
import { FormatAlignLeft, Close } from '@mui/icons-material';
import BookingFormFooter from '../BookingFormFooter/BookingFormFooter';
import InputWithIcon from '../InputWithIcon/InputWithIcon';
import TimePickerWrapper from '../BookingTimePicker/TimePickerWrapper';
import RecurringBookingWrapper from '../RecurringBooking/RecurringBookingWrapper';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1200,
      xl: 1536,
    },
  },
});

type Props = {
  openState: boolean;
  handleCloseModal: () => void;
  bookingTitle: string;
  bookingDescription: string;
  time: string;
  editable: string;
  start: string;
  end: string;
  recurring: string;
};

const BookingForm = (props: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [title, setTitle] = useState<string>('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [time, setTime] = useState<string>(props.time);
  const [description, setDescription] = useState<string>(props.bookingDescription);
  const [multiline, setMultiline] = useState<boolean>(false);
  const [rows, setRows] = useState<number>(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [recurring, setRecurring] = useState<string>(props.recurring);

  const handleOnBook = async () => {
    setIsLoading(true);
  };

  const handleOnSave = async () => {
    null;
  };

  const handleOnDelete = async () => {
    null;
  };

  const handleOnContact = async () => {
    null;
  };

  const handleTitleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (props.editable == 'editable' || props.editable == 'new') {
      console.log(event.target.value);
      setTitle(event.target.value);
    }
  };

  const handleDescriptionChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (props.editable == 'editable' || props.editable == 'new') {
      console.log(event.target.value);
      setDescription(event.target.value);
    }
  };

  const handleOnFocus = async () => {
    setMultiline(true);
    setRows(4);
  };

  useEffect(() => {
    setTime(props.time);
  }, [props.time]);

  useEffect(() => {
    setTitle(props.bookingTitle);
  }, [props.bookingTitle]);

  useEffect(() => {
    setDescription(props.bookingDescription);
  }, [props.bookingDescription]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Modal
          className='flex justify-center items-center'
          open={props.openState}
          onClose={props.handleCloseModal}
          BackdropProps={{ style: { backgroundColor: 'transparent' } }}
          disableAutoFocus
        >
          <Box className='laptop:rounded-lg w-96 h-fit pl-5 pr-3 pt-2 pb-6 bg-bgWhite shadow-lg  ring-0'>
            <Close onClick={props.handleCloseModal} fontSize='small' className='float-right cursor-pointer hover:text-grayAccent' />
            <Stack direction='column' className='h-full' spacing={{ xs: 2, md: 2 }} alignItems='justified'>
              <Input
                color='error'
                placeholder='Add title'
                value={title}
                className='w-full h-1/6 text-xxl ml-2 font-Inter'
                onChange={handleTitleChange}
              ></Input>
              <Stack direction='column' spacing={{ xs: 0, md: 0 }} alignItems='justified'>
                <TimePickerWrapper bookingDate={time} startTime={props.start} endTime={props.end} />
                <div ref={ref} className='w-full'>
                  <InputWithIcon
                    inputType='string'
                    inputPlaceholder='Add description'
                    inputValue={description}
                    inputClassname='w-full color-bgWhite font-Inter font-light px-0'
                    inputVariant='outlined'
                    multiline={multiline}
                    rows={rows}
                    icon={<FormatAlignLeft className='ml-2' />}
                    spacing={1}
                    inputHandleOnChange={handleDescriptionChange}
                    acceptInput={true}
                    onFocus={handleOnFocus}
                    onBlur={() => setMultiline(false)}
                  />
                </div>
                <RecurringBookingWrapper />
                <BookingFormFooter
                  type={props.editable}
                  handleOnBook={handleOnBook}
                  handleOnSave={handleOnSave}
                  handleOnDelete={handleOnDelete}
                  handleOnContact={handleOnContact}
                />
              </Stack>
            </Stack>
          </Box>
        </Modal>
      </ThemeProvider>
    </>
  );
};

export default BookingForm;
