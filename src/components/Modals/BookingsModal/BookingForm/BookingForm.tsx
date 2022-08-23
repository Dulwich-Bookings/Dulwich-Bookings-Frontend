import React, { useState, useRef, useEffect } from 'react';
import { Modal, createTheme, Stack, ThemeProvider, Box, Input } from '@mui/material';
import { FormatAlignLeft, Close } from '@mui/icons-material';
import BookingFormFooter from '@/components/Modals/BookingsModal/BookingForm/BookingFormFooter/BookingFormFooter';
import InputWithIcon from '@/components/Modals/BookingsModal/BookingForm/InputWithIcon/InputWithIcon';
import TimePickerWrapper from '@/components/Modals/BookingsModal/BookingForm/TimePickerWrapper/TimePickerWrapper';
import RecurringBookingWrapper from '@/components/Modals/BookingsModal/BookingForm/RecurringBookingWrapper/RecurringBookingWrapper';
import BookingTypeWrapper from '@/components/Modals/BookingsModal/BookingForm/BookingTypeWrapper/BookingTypeWrapper';

import { isAdmin } from '@/utilities/authorisation';
import { UserData } from '@/modules/user/types';
import { EventData, BookingTypes, RecurringTypes, BookingType, BookingState, RecurringType } from '@/modules/Bookings/Types';
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
  onDeleteBooking: (id: string) => void;
  onSaveBooking: (data: EventData) => void;
  onContact: () => void;
  id: string;
  bookingTitle: string;
  bookingDescription: string;
  editable: boolean;
  newBooking: boolean;
  start: Date;
  end: Date;
  rrule: RRule | null;
  bookingType: BookingTypes;
  currentUser: UserData;
  bookingUser: number;
  weekProfile: RecurringTypes;
  school: SchoolData;
};

const BookingForm = (props: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [formLabel, setFormLabel] = useState<string>(props.bookingTitle);
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  const [description, setDescription] = useState<string>(props.bookingDescription);
  const [rrule, setRrule] = useState<RRule | null>(props.rrule);
  const [startTime, setStartTime] = useState<Date>(props.start);
  const [endTime, setEndTime] = useState<Date>(props.end);
  const [multiline, setMultiline] = useState<boolean>(false);
  const [rows, setRows] = useState<number>(1);
  const [bookingType, setBookingType] = useState<BookingTypes>(props.bookingType);

  const handleTitleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormLabel(event.target.value);
  };

  const handleDescriptionChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleOnFocus = async () => {
    setMultiline(true);
    setRows(4);
  };

  const onChangeTime = (time: Date, isStart: boolean) => {
    isStart ? setStartTime(time) : setEndTime(time);
  };

  const onChangeBookingType = (value: string) => {
    props.editable
      ? value === BookingType.BOOKING
        ? setBookingType(BookingType.BOOKING)
        : setBookingType(BookingType.LESSON)
      : setBookingType(bookingType);
  };

  const handleChangeRRule = (rrule: RRule) => {
    setRrule(rrule);
    console.log(rrule);
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
                  disabled={!props.editable}
                  color='error'
                  placeholder='Add title'
                  value={formLabel}
                  className='w-full h-1/6 text-xxl font-Inter mb-1'
                  onChange={handleTitleChange}
                ></Input>
                <Stack direction='column' spacing={{ xs: 0, md: 0 }} alignItems='justified'>
                  <TimePickerWrapper
                    startTime={startTime}
                    endTime={endTime}
                    onChangeTime={onChangeTime}
                    editable={props.editable}
                    school={props.school}
                  />
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
                  {props.weekProfile === RecurringType.WEEKLY && (
                    <RecurringBookingWrapper handleChangeRRule={handleChangeRRule} rrule={rrule} date={props.start} />
                  )}
                  <BookingFormFooter
                    editable={props.editable}
                    newBooking={props.newBooking}
                    handleOnBook={() => {
                      props.onAddBooking({
                        id: Math.random().toString(),
                        userId: props.bookingUser,
                        title: bookingType === BookingType.BOOKING ? 'Booked' : BookingType.LESSON,
                        formLabel: formLabel,
                        start: startTime,
                        end: endTime,
                        description: description,
                        rrule: rrule?.toString() ?? undefined,
                        editable: true,
                        bookingType: bookingType,
                        bookingState: BookingState.PENDING,
                      });
                    }}
                    handleOnSave={() => {
                      props.onSaveBooking({
                        id: props.id,
                        userId: props.bookingUser,
                        title: bookingType === BookingType.BOOKING ? 'Booked' : BookingType.LESSON,
                        formLabel: formLabel,
                        start: startTime,
                        end: endTime,
                        description: description,
                        rrule: rrule?.toString() ?? undefined,
                        editable: true,
                        bookingType: bookingType,
                        bookingState: BookingState.PENDING,
                      });
                    }}
                    handleOnDelete={() => {
                      props.onDeleteBooking(props.id);
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
