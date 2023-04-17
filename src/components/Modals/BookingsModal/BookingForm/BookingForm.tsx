import React, { useEffect, useState } from 'react';
import { Modal, createTheme, Stack, ThemeProvider, Box, Input } from '@mui/material';
import { FormatAlignLeft, Close } from '@mui/icons-material';
import BookingFormFooter from '@/components/Modals/BookingsModal/BookingForm/BookingFormFooter/BookingFormFooter';
import InputWithIcon from '@/components/Modals/BookingsModal/BookingForm/InputWithIcon/InputWithIcon';
import TimePickerWrapper from '@/components/Modals/BookingsModal/BookingForm/TimePickerWrapper/TimePickerWrapper';
import RecurringBookingWrapper from '@/components/Modals/BookingsModal/BookingForm/RecurringBookingWrapper/RecurringBookingWrapper';
import BookingTypeWrapper from '@/components/Modals/BookingsModal/BookingForm/BookingTypeWrapper/BookingTypeWrapper';

import { isAdmin } from '@/utilities/authorisation';
import { UserData } from '@/modules/user/types';
import { EventData, RecurringTypes, BookingType, BookingState } from '@/modules/Bookings/Types';
import { SchoolData } from '@/modules/school/types';
import { RRule } from 'rrule';

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
  onDeleteBooking: (data: EventData) => void;
  onCloseBooking: (data: EventData) => void;
  onContact: () => void;
  newBooking: boolean;
  rrule?: RRule;
  currentUser: UserData;
  weekProfile: RecurringTypes;
  school: SchoolData;
  bookingData: EventData;
};

const BookingForm = (props: Props) => {
  const [rrule, setRrule] = useState<RRule | undefined>(props.rrule ?? undefined);
  const [multiline, setMultiline] = useState<boolean>(false);
  const [rows, setRows] = useState<number>(1);
  const [bookingData, setBookingData] = useState<EventData>(props.bookingData);

  useEffect(() => {
    if (props.newBooking) {
      return;
    }
    setMultiline(true);
    setRows(4);
  }, [props.newBooking]);

  const handleTitleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setBookingData({ ...bookingData, formLabel: event.target.value });
  };

  const handleDescriptionChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setBookingData({ ...bookingData, description: event.target.value });
  };

  const handleOnFocus = async () => {
    setMultiline(true);
    setRows(4);
  };

  const onChangeTime = (time: Date, isStart: boolean) => {
    isStart ? setBookingData({ ...bookingData, start: time }) : setBookingData({ ...bookingData, end: time });
  };

  const onChangeBookingType = (value: string) => {
    bookingData.isEditable
      ? value === BookingType.BOOKING
        ? setBookingData({ ...bookingData, bookingType: BookingType.BOOKING })
        : setBookingData({ ...bookingData, bookingType: BookingType.LESSON })
      : null;
  };

  const handleChangeRRule = (rrule: RRule) => {
    setRrule(rrule);
  };

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
          <Box className='rounded-2xl w-96 h-fit  bg-bgWhite shadow-[0_4px_15px_0px_rgba(0,0,0,0.25)] ring-0'>
            <Stack className='w-full pl-7 pt-4 pb-6' spacing={-0.5}>
              <div className='w-full'>
                <Close
                  onClick={props.handleCloseModal}
                  fontSize='small'
                  className='float-right cursor-pointer hover:text-grayAccent text-lg pr-4 w-10'
                />
              </div>
              <Stack direction='column' className='h-full w-11/12 ' spacing={{ xs: 1, md: 1 }} alignItems='justified'>
                <Input
                  disabled={true}
                  color='error'
                  placeholder='Add title'
                  value={
                    bookingData.bookingState === BookingState.APPROVED
                      ? bookingData.bookingType === BookingType.LESSON
                        ? 'Lesson'
                        : 'Booked'
                      : 'Pending Booking'
                  }
                  className='w-full h-1/6 text-xxl font-Inter mb-1'
                  onChange={handleTitleChange}
                ></Input>
                {!props.newBooking && <div className='text-bgDarkGray'>{props.currentUser.email}</div>}
                <Stack direction='column' spacing={{ xs: 0, md: 0 }} alignItems='justified'>
                  <TimePickerWrapper
                    startTime={bookingData.start}
                    endTime={bookingData.end}
                    onChangeTime={onChangeTime}
                    isEditable={bookingData.isEditable}
                    school={props.school}
                    newBooking={props.newBooking}
                  />
                  <div className='w-full'>
                    <InputWithIcon
                      newBooking={props.newBooking}
                      inputType='string'
                      inputPlaceholder={bookingData.isEditable ? 'Add description' : ''}
                      inputValue={bookingData.description}
                      inputClassname='w-full color-bgWhite font-Inter font-light px-0'
                      inputVariant='outlined'
                      multiline={multiline}
                      rows={rows}
                      icon={<FormatAlignLeft className='ml-2 text-lg' />}
                      spacing={0.5}
                      inputHandleOnChange={handleDescriptionChange}
                      acceptInput={bookingData.isEditable}
                      onFocus={handleOnFocus}
                      onBlur={() => setMultiline(false)}
                    />
                  </div>
                  {isAdmin(props.currentUser) && (
                    <BookingTypeWrapper
                      bookingType={bookingData.bookingType}
                      onChangeBookingType={onChangeBookingType}
                      newBooking={props.newBooking}
                    />
                  )}

                  <RecurringBookingWrapper
                    handleChangeRRule={handleChangeRRule}
                    rrule={rrule}
                    date={bookingData.start}
                    weekProfile={props.weekProfile}
                    newBooking={props.newBooking}
                  />

                  <BookingFormFooter
                    isEditable={bookingData.isEditable}
                    newBooking={props.newBooking}
                    handleOnBook={() => {
                      props.onAddBooking({
                        ...bookingData,
                        id: Math.random().toString(),
                        title: bookingData.bookingType === BookingType.BOOKING ? 'Booked' : BookingType.LESSON,
                        rrule: rrule?.toString(),
                      });
                    }}
                    handleOnSave={() => {
                      props.onCloseBooking({
                        ...bookingData,
                        title: bookingData.bookingType === BookingType.BOOKING ? 'Booked' : BookingType.LESSON,
                        rrule: rrule?.toString(),
                      });
                    }}
                    handleOnDelete={() => {
                      props.onDeleteBooking({
                        ...bookingData,
                        title: bookingData.bookingType === BookingType.BOOKING ? 'Booked' : BookingType.LESSON,
                        rrule: rrule?.toString(),
                      });
                    }}
                    handleOnContact={props.onContact}
                  />
                </Stack>
              </Stack>
            </Stack>
          </Box>
        </Modal>
      </ThemeProvider>
    </>
  );
};

export default BookingForm;
