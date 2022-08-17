import React, { useState, useRef, useEffect } from 'react';
import { Modal, createTheme, Stack, ThemeProvider, Box, Input } from '@mui/material';
import { FormatAlignLeft, Close } from '@mui/icons-material';
import BookingFormFooter from '@components/BookingsModal/BookingForm/BookingFormFooter/BookingFormFooter';
import InputWithIcon from '@/components/BookingsModal/BookingForm/InputWithIcon/InputWithIcon';
import TimePickerWrapper from '@components/BookingsModal/BookingForm/TimePickerWrapper/TimePickerWrapper';
import RecurringBookingWrapper from '@components/BookingsModal/BookingForm/RecurringBookingWrapper/RecurringBookingWrapper';
import BookingTypeWrapper from '@components/BookingsModal/BookingForm/BookingTypeWrapper/BookingTypeWrapper';

import { isAdmin } from '@/utilities/authorisation';
import { UserData } from '@/modules/user/types';
import { EventData } from '@/modules/Bookings/Types';

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
  handleCloseModal: () => void;
  onAddBooking: (data: EventData) => void;
  onDeleteBooking: (id: string) => void;
  onSaveBooking: (data: EventData) => void;
  onContact: () => void;
  id: string;
  bookingTitle: string;
  bookingDescription: string;
  editable: boolean;
  newBooking: boolean;
  start: string;
  end: string;
  recurring: 'Weekly' | 'BiWeekly' | 'None';
  bookingType: 'Booking' | 'Lesson';
  currentUser: UserData;
  bookingUser: number;
  weekProfile: 'Weekly' | 'BiWeekly';
};

const BookingForm = (props: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [title, setTitle] = useState<string>(props.bookingTitle);
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  const [description, setDescription] = useState<string>(props.bookingDescription);
  const [startTime, setStartTime] = useState<string>(props.start);
  const [endTime, setEndTime] = useState<string>(props.end);
  const [multiline, setMultiline] = useState<boolean>(false);
  const [rows, setRows] = useState<number>(1);
  const [recurring, setRecurring] = useState<'Weekly' | 'BiWeekly' | 'None'>(props.recurring);
  const [bookingType, setBookingType] = useState<'Booking' | 'Lesson'>(props.bookingType);

  const handleTitleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleOnFocus = async () => {
    setMultiline(true);
    setRows(4);
  };

  const onChangeTime = (time: string, isStart: boolean) => {
    isStart ? setStartTime(time) : setEndTime(time);
  };

  const onChangeRecurring = (value: string) => {
    props.editable
      ? value === 'Weekly'
        ? setRecurring('Weekly')
        : value === 'BiWeekly'
        ? setRecurring('BiWeekly')
        : setRecurring('None')
      : setRecurring(recurring);
  };

  const onChangeBookingType = (value: string) => {
    props.editable ? (value === 'Booking' ? setBookingType('Booking') : setBookingType('Lesson')) : setBookingType(bookingType);
  };

  useEffect(() => {
    console.log(props.editable);
  }, []);
  return (
    <>
      <ThemeProvider theme={theme}>
        <Modal
          className='flex justify-center items-center'
          open={true}
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
                disabled={!props.editable}
                color='error'
                placeholder='Add title'
                value={title}
                className='w-full h-1/6 text-xxl ml-2 font-Inter mb-1'
                onChange={handleTitleChange}
              ></Input>
              <Stack direction='column' spacing={{ xs: 0, md: 0 }} alignItems='justified'>
                <TimePickerWrapper startTime={startTime} endTime={endTime} onChangeTime={onChangeTime} editable={props.editable} />
                <div ref={ref} className='w-full'>
                  <InputWithIcon
                    inputType='string'
                    inputPlaceholder={props.editable ? 'Add description' : ''}
                    inputValue={description}
                    inputClassname='w-full color-bgWhite font-Inter font-light px-0'
                    inputVariant='outlined'
                    multiline={multiline}
                    rows={rows}
                    icon={<FormatAlignLeft className='ml-2 text-lg' />}
                    spacing={0.5}
                    inputHandleOnChange={handleDescriptionChange}
                    acceptInput={props.editable}
                    onFocus={handleOnFocus}
                    onBlur={() => setMultiline(false)}
                  />
                </div>
                {isAdmin(props.currentUser) && <BookingTypeWrapper bookingType={bookingType} onChangeBookingType={onChangeBookingType} />}
                {props.weekProfile === 'Weekly' && <RecurringBookingWrapper onChangeRecurring={onChangeRecurring} recurring={recurring} />}
                <BookingFormFooter
                  editable={props.editable}
                  newBooking={props.newBooking}
                  handleOnBook={() => {
                    props.onAddBooking({
                      id: Math.random().toString(),
                      userId: props.bookingUser,
                      title: title,
                      start: startTime,
                      end: endTime,
                      description: description,
                      editable: true,
                      bookingType: bookingType,
                      bookingState: 'Pending',
                    });
                  }}
                  handleOnSave={() => {
                    props.onSaveBooking({
                      id: props.id,
                      userId: props.bookingUser,
                      title: title,
                      start: startTime,
                      end: endTime,
                      description: description,
                      editable: true,
                      bookingType: bookingType,
                      bookingState: 'Pending',
                    });
                  }}
                  handleOnDelete={() => {
                    props.onDeleteBooking(props.id);
                  }}
                  handleOnContact={props.onContact}
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
