import React, { useState } from 'react';

import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

import FullCalendar, { EventClickArg } from '@fullcalendar/react';
import momentTimezonePlugin from '@fullcalendar/moment-timezone';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import moment from 'moment';

import DayHeaderContent from '@/components/BookingsModal/Calendar/DayHeaderContent/DayHeaderContent';
import SlotLabelContent from '@/components/BookingsModal/Calendar/SlotLabelContent/SlotLabelContent';
import BookingForm from '@components/BookingsModal/BookingForm/BookingForm';

import styled from '@emotion/styled';
import './Calendar.css';

import { UserData } from '@/modules/user/types';
import { SchoolData } from '@/modules/school/types';
import { ResourceData } from '@/modules/resource/types';
import { EventData } from '@/modules/Bookings/Types';
// import { isTeacher, isAdmin } from '@/utilities/authorisation';

import { dummyCalendarData } from '@/consts/dummyData';
import { isAdmin, isTeacher } from '@/utilities/authorisation';

export const StyleWrapper = styled.div`
  .fc .fc-timegrid-slot-minor {
    border-top: none;
    border-bottom: none;
  }
`;

type Props = {
  currentUser: UserData;
  currentSchool: SchoolData;
  resourceData: ResourceData;
};

const Calendar = (props: Props) => {
  const [openBookingModal, setOpenBookingModal] = useState<boolean>(false);
  const [bookings, setBookings] = useState<EventData[]>(dummyCalendarData);
  const [bookingTitle, setBookingTitle] = useState<string>('');
  const [startBook, setStartBook] = useState<string>('');
  const [endBook, setEndBook] = useState<string>('');
  const [bookingDescription, setBookingDescription] = useState<string>('');
  const [editable, setEditable] = useState<string>('');
  const [recurring, setRecurring] = useState<'Weekly' | 'BiWeekly' | 'None'>('None');
  const [bookingType, setBookingType] = useState<'Booking' | 'Lesson'>('Booking');
  const [bookingId, setBookingId] = useState<string>('');

  const theme = useTheme();
  const isMobile = !useMediaQuery(theme.breakpoints.up('sm'));

  const handleDateClick = (e: DateClickArg) => {
    const startTime = moment(e.dateStr).format();
    const endTime = moment(e.dateStr).add(15, 'm').format();
    setBookingTitle('');
    setBookingDescription('');
    setEditable('new');
    setRecurring('None');
    setBookingType('Booking');
    setStartBook(startTime);
    setEndBook(endTime);
    setOpenBookingModal(true);
    console.log(bookingType);
  };

  const handleEventClick = (e: EventClickArg) => {
    console.log(e.event._instance?.range);
    const startTime = moment(e.event._instance?.range.start).format();
    const endTime = moment(e.event._instance?.range.end).format();
    setStartBook(startTime);
    setEndBook(endTime);
    setBookingTitle(e.event.title);
    setBookingDescription(e.event.extendedProps.description);
    e.event.startEditable ? setEditable('editable') : setEditable('noneditable');
    setOpenBookingModal(true);
    setRecurring(e.event.extendedProps.recurring);
    setBookingType(e.event.extendedProps.bookingType);
    setBookingId(e.event.id);
  };

  const getBookingState = () => {
    if (isAdmin(props.currentUser)) {
      return 'Approved';
    } else if (isTeacher(props.currentUser) && props.resourceData.accessRights.includes('Teacher')) {
      return 'Approved';
    } else if (props.resourceData.accessRights.includes('Student')) {
      return 'Approved';
    } else {
      return 'Pending';
    }
  };

  const getBlurredBackground = (BackgroundColor: string) => {
    if (getBookingState() === 'Pending') {
      if (BackgroundColor === '#FFF') {
        return '#A9A9A9';
      } else {
        return '#E6AEAE';
      }
    } else {
      return BackgroundColor;
    }
  };

  const onAddBooking = async (data: EventData): Promise<void> => {
    console.log('add booking');

    const newBooking: EventData = {
      id: data.id,
      title: data.title,
      start: data.start,
      end: data.end,
      description: data.description,
      backgroundColor: getBlurredBackground(data.backgroundColor ?? ''),
      borderColor: getBlurredBackground(data.backgroundColor ?? ''),
      textColor: data.textColor,
      editable: data.editable,
      bookingType: data.bookingType,
      bookingState: getBookingState(),
    };
    const newBookingsList: EventData[] = [...bookings, newBooking];
    setBookings(newBookingsList);
    setOpenBookingModal(false);
  };

  const onDeleteBooking = async (id: string): Promise<void> => {
    console.log('delete booking');
    const newBookingsList = bookings.filter(booking => booking.id != id);
    setBookings(newBookingsList);
    setOpenBookingModal(false);
  };

  const onSaveBooking = async (data: EventData): Promise<void> => {
    console.log('save booking');
    const newBooking: EventData = {
      id: data.id,
      title: data.title,
      start: data.start,
      end: data.end,
      description: data.description,
      backgroundColor: getBlurredBackground(data.backgroundColor ?? ''),
      borderColor: getBlurredBackground(data.backgroundColor ?? ''),
      textColor: data.textColor,
      editable: data.editable,
      bookingType: data.bookingType,
      bookingState: getBookingState(),
    };
    console.log(newBooking);
    const newBookingsList = bookings.map(booking => {
      return booking.id === data.id ? newBooking : booking;
    });
    setBookings(newBookingsList);
    setOpenBookingModal(false);
  };

  const onContact = async (): Promise<void> => {
    console.log('contact');
  };

  // if (isAdmin(props.currentUser)) {
  //   const pending = 'Approved';
  // } else if (isTeacher(props.currentUser)) {
  //   if (props.resourceData.bookingRights.includes('Teacher')) {
  //     const pending = 'Approved';
  //   } else {
  //     const pending = 'Pending';
  //   }
  // } else {
  //   if (props.resourceData.bookingRights.includes('Student')) {
  //     const pending = 'Approved';
  //   } else {
  //     const pending = 'Pending';
  //   }
  // }

  return (
    <>
      {openBookingModal && (
        <BookingForm
          bookingTitle={bookingTitle}
          bookingDescription={bookingDescription}
          handleCloseModal={() => {
            setOpenBookingModal(false);
          }}
          onAddBooking={onAddBooking}
          onDeleteBooking={onDeleteBooking}
          onSaveBooking={onSaveBooking}
          onContact={onContact}
          editable={editable}
          start={startBook}
          end={endBook}
          recurring={recurring}
          bookingType={bookingType}
          currentUser={props.currentUser}
          weekProfile={props.resourceData.weekProfile}
          id={bookingId}
        />
      )}
      <Box className='h-full'>
        <FullCalendar
          plugins={[timeGridPlugin, interactionPlugin, momentTimezonePlugin, dayGridPlugin]}
          timeZone={props.currentSchool.timezone}
          headerToolbar={{
            start: '',
            center: '',
            end: 'today prev title next',
          }}
          dayHeaderContent={obj => <DayHeaderContent obj={obj} />}
          slotLabelContent={obj => <SlotLabelContent obj={obj} />}
          height={'95%'}
          allDaySlot={false}
          nowIndicator={true}
          slotMinTime='07:00:00'
          slotMaxTime='22:00:00'
          scrollTime='08:00:00'
          slotDuration='00:15:00'
          slotLabelInterval={{ hours: 1 }}
          eventMinHeight={20}
          slotEventOverlap={false}
          initialView={isMobile ? 'timeGridDay' : 'timeGridWeek'}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          editable={true}
          events={bookings}
        />
      </Box>
    </>
  );
};

export default Calendar;
