import React, { useEffect, useState, useRef } from 'react';
import { Modal, createTheme, Stack, ThemeProvider, Box, Input } from '@mui/material';
import { FormatAlignLeft, Close } from '@mui/icons-material';
import BookingFormFooter from '@components/BookingsModal/BookingForm/BookingFormFooter/BookingFormFooter';
import InputWithIcon from '@/components/BookingsModal/BookingForm/InputWithIcon/InputWithIcon';
import TimePickerWrapper from '@components/BookingsModal/BookingForm/TimePickerWrapper/TimePickerWrapper';
import RecurringBookingWrapper from '@components/BookingsModal/BookingForm/RecurringBookingWrapper/RecurringBookingWrapper';
import BookingTypeWrapper from '@components/BookingsModal/BookingForm/BookingTypeWrapper/BookingTypeWrapper';

import { isTeacher } from '@/utilities/authorisation';
import { UserData } from '@/modules/user/types';

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
  bookingType: string;
  currentUser: UserData;
  weekProfile: 'Weekly' | 'BiWeekly';
};

const BookingForm = (props: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [title, setTitle] = useState<string>('');
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  const [time, setTime] = useState<string>(props.time);
  const [description, setDescription] = useState<string>(props.bookingDescription);
  const [multiline, setMultiline] = useState<boolean>(false);
  const [rows, setRows] = useState<number>(1);
  // const [recurring, setRecurring] = useState<'Weekly' | 'BiWeekly'>(props.recurring);
  // const [bookingType, setBookingType] = useState<'Booked' | 'Lesson'>(props.bookingType);

  const Teacher = isTeacher(props.currentUser);

  const handleOnBook = async () => {
    // setIsLoading(true);
    null;
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
          <Box className='rounded-2xl w-96 h-fit pr-1 pl-6 pt-4 pb-6 bg-bgWhite shadow-[0_4px_15px_0px_rgba(0,0,0,0.25)] ring-0'>
            <Close
              onClick={props.handleCloseModal}
              fontSize='small'
              className='float-right cursor-pointer hover:text-grayAccent text-lg pr-2 w-10'
            />
            <Stack direction='column' className='h-full w-11/12' spacing={{ xs: 1, md: 1 }} alignItems='justified'>
              <Input
                color='error'
                placeholder='Add title'
                value={title}
                className='w-full h-1/6 text-xxl ml-2 font-Inter mb-1'
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
                    icon={<FormatAlignLeft className='ml-2 text-lg' />}
                    spacing={0.5}
                    inputHandleOnChange={handleDescriptionChange}
                    acceptInput={true}
                    onFocus={handleOnFocus}
                    onBlur={() => setMultiline(false)}
                  />
                </div>
                {props.weekProfile === 'Weekly' && <RecurringBookingWrapper />}
                {Teacher && <BookingTypeWrapper />}
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
