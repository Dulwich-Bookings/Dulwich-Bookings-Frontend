import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { severity } from '@/consts/constants';

import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

import FullCalendar, { EventClickArg } from '@fullcalendar/react';
import momentTimezonePlugin from '@fullcalendar/moment-timezone';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import rrulePlugin from '@fullcalendar/rrule';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import moment from 'moment-timezone';
import { RRule } from 'rrule';

import DayHeaderContent from '@/components/Modals/BookingsModal/Calendar/DayHeaderContent/DayHeaderContent';
import SlotLabelContent from '@/components/Modals/BookingsModal/Calendar/SlotLabelContent/SlotLabelContent';
import BookingForm from '@/components/Modals/BookingsModal/BookingForm/BookingForm';
import Dialog, { RecurringModificationTypes } from '@/components/Modals/BookingsModal/Calendar/Dialog/Dialog';

import styled from '@emotion/styled';
import './Calendar.css';
import TailWindTheme from '@/tailwind.config';

import { UserData } from '@/modules/user/types';
import { SchoolData } from '@/modules/school/types';
import { ResourceData } from '@/modules/resource/types';
import { EventData, BookingTypes, BookingType, BookingState } from '@/modules/Bookings/Types';
import { ResourceMapData } from '@/modules/resourceMap/types';
import { toggleShowNotification } from '@/modules/ui/uiSlice';
import { isAdmin, isTeacher } from '@/utilities/authorisation';

const { colors } = TailWindTheme.theme;

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
  resourceMaps: ResourceMapData[];
};

const Calendar = (props: Props) => {
  const [openBookingModal, setOpenBookingModal] = useState<boolean>(false);
  const [bookings, setBookings] = useState<EventData[]>([]);
  const [bookingTitle, setBookingTitle] = useState<string>('');
  const [startBook, setStartBook] = useState<Date>(new Date());
  const [endBook, setEndBook] = useState<Date>(new Date());
  const [bookingDescription, setBookingDescription] = useState<string>('');
  const [editable, setEditable] = useState<boolean>(true);
  const [newBooking, setNewBooking] = useState<boolean>(true);
  const [rrule, setRrule] = useState<RRule | null>(null);
  const [bookingType, setBookingType] = useState<BookingTypes>(BookingType.BOOKING);
  const [bookingId, setBookingId] = useState<string>('');
  const [bookingUserId, setBookingUserId] = useState<number>(0);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const dispatch = useDispatch();

  // for mobile responsiveness
  const theme = useTheme();
  const isMobile = !useMediaQuery(theme.breakpoints.up('sm'));

  const handleDateClick = (e: DateClickArg) => {
    const startTime = moment(e.dateStr).toDate();
    const endTime = moment(e.dateStr).add(15, 'm').toDate();
    setBookingTitle('');
    setBookingDescription('');
    setEditable(true);
    setNewBooking(true);
    setRrule(null);
    setBookingType(BookingType.BOOKING);
    setStartBook(startTime);
    setEndBook(endTime);
    setOpenBookingModal(true);
    setBookingUserId(props.currentUser.id);
  };

  const handleEventClick = (e: EventClickArg) => {
    const startTime = moment(e.event.start).toDate();
    const endTime = moment(e.event.end).toDate();
    setStartBook(startTime);
    setEndBook(endTime);
    setBookingTitle(e.event.extendedProps.formLabel);
    setBookingDescription(e.event.extendedProps.description);
    setEditable(e.event.startEditable);
    setNewBooking(false);
    setOpenBookingModal(true);
    setRrule(e.event._def.recurringDef !== null ? e.event._def.recurringDef?.typeData.rruleSet._rrule[0] : null);
    setBookingType(e.event.extendedProps.bookingType);
    setBookingId(e.event.id);
    setBookingUserId(e.event.extendedProps.userId);
  };

  const getBookingState = () => {
    if (isAdmin(props.currentUser)) {
      return BookingState.APPROVED;
    } else if (isTeacher(props.currentUser) && props.resourceData.accessRights.includes('Teacher')) {
      return BookingState.APPROVED;
    } else if (props.resourceData.accessRights.includes('Student')) {
      return BookingState.APPROVED;
    } else {
      return BookingState.PENDING;
    }
  };

  const getEditable = (data: EventData) => {
    if (isAdmin(props.currentUser)) {
      return true;
    } else if (
      props.resourceMaps.filter(r => r.resourceId === props.resourceData.id).filter(r => r.userId === props.currentUser.id).length !== 0
    ) {
      return true;
    } else if (data.userId === props.currentUser.id) {
      return true;
    } else {
      return false;
    }
  };

  const onAddBooking = async (data: EventData): Promise<void> => {
    console.log('add booking');
    if (data.formLabel.trim().length !== 0) {
      const newBooking: EventData = {
        id: data.id,
        userId: data.userId,
        title: data.title,
        formLabel: data.formLabel,
        start: data.start,
        end: data.end,
        description: data.description,
        rrule: data.rrule ?? undefined,
        backgroundColor:
          data.bookingType === BookingType.LESSON
            ? colors.bgLesson
            : getBookingState() === BookingState.PENDING
            ? colors.bgLightRed
            : colors.dulwichRed,
        borderColor:
          data.bookingType === BookingType.LESSON
            ? colors.bgLesson
            : getBookingState() === BookingState.PENDING
            ? colors.bgLightRed
            : colors.dulwichRed,
        textColor: data.bookingType === BookingType.LESSON ? colors.bgBlack : colors.white,
        editable: getEditable(data),
        bookingType: data.bookingType,
        bookingState: getBookingState(),
      };
      const newBookingsList: EventData[] = [...bookings, newBooking];
      setBookings(newBookingsList);
      setOpenBookingModal(false);
    } else {
      dispatch(toggleShowNotification({ message: 'Title cannot be empty', severity: severity.ERROR }));
    }
  };

  const onDeleteBooking = async (id: string): Promise<void> => {
    console.log('delete booking');
    const newBookingsList = bookings.filter(booking => booking.id != id);
    setBookings(newBookingsList);
    setOpenBookingModal(false);
  };

  const onSaveBooking = async (data: EventData): Promise<void> => {
    console.log('save booking');
    if (data.formLabel.trim().length !== 0) {
      if (data.rrule === undefined) {
        const newBooking: EventData = {
          id: data.id,
          userId: data.userId,
          title: data.title,
          formLabel: data.formLabel,
          start: data.start,
          end: data.end,
          description: data.description,
          rrule: data.rrule ?? undefined,
          backgroundColor:
            data.bookingType === BookingType.LESSON
              ? colors.bgLesson
              : data.userId === props.currentUser.id
              ? getBookingState() === BookingState.PENDING
                ? colors.bgLightRed
                : colors.dulwichRed
              : getBookingState() === BookingState.PENDING
              ? colors.bgBookingBlackPending
              : colors.bgBookingBlack,
          borderColor:
            data.bookingType === BookingType.LESSON
              ? colors.bgLesson
              : data.userId === props.currentUser.id
              ? getBookingState() === BookingState.PENDING
                ? colors.bgLightRed
                : colors.dulwichRed
              : getBookingState() === BookingState.PENDING
              ? colors.bgBookingBlackPending
              : colors.bgBookingBlack,
          textColor: data.bookingType === BookingType.LESSON ? colors.bgBlack : colors.white,
          editable: getEditable(data),
          bookingType: data.bookingType,
          bookingState: getBookingState(),
        };
        const newBookingsList = bookings.map(booking => {
          return booking.id === data.id ? newBooking : booking;
        });
        setBookings(newBookingsList);
        setOpenBookingModal(false);
      } else {
        setOpenDialog(true);
      }
    } else {
      dispatch(toggleShowNotification({ message: 'Title cannot be empty', severity: severity.ERROR }));
    }
  };

  const onSaveRecurringBooking = (modificationType: RecurringModificationTypes) => {
    console.log(modificationType);
  };

  const onContact = async (): Promise<void> => {
    console.log('contact');
  };

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
          newBooking={newBooking}
          start={startBook}
          end={endBook}
          rrule={rrule}
          bookingType={bookingType}
          currentUser={props.currentUser}
          bookingUser={bookingUserId}
          weekProfile={props.resourceData.weekProfile}
          id={bookingId}
          school={props.currentSchool}
        />
      )}
      <Box className='h-full'>
        <FullCalendar
          plugins={[timeGridPlugin, interactionPlugin, momentTimezonePlugin, dayGridPlugin, rrulePlugin]}
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
          scrollTime='07:00:00'
          slotDuration='00:15:00'
          slotLabelInterval={{ hours: 1 }}
          eventMinHeight={20}
          eventOverlap={false}
          initialView={isMobile ? 'timeGridDay' : 'timeGridWeek'}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          editable={true}
          events={bookings}
          eventDrop={e => {
            onSaveBooking({
              id: e.event.id,
              userId: e.event.extendedProps.userId,
              title: e.event.title,
              formLabel: e.event.extendedProps.formLabel,
              start: moment(e.event.start).toDate(),
              end: moment(e.event.end).toDate(),
              description: e.event.extendedProps.description,
              rrule: e.event._def.recurringDef?.typeData.rruleSet._rrule[0] ?? undefined,
              editable: e.event.startEditable,
              bookingType: e.event.extendedProps.bookingType,
              bookingState: e.event.extendedProps.bookingState,
            });
          }}
          eventResize={e => {
            onSaveBooking({
              id: e.event.id,
              userId: e.event.extendedProps.userId,
              title: e.event.title,
              formLabel: e.event.extendedProps.formLabel,
              start: moment(e.event.start).toDate(),
              end: moment(e.event.end).toDate(),
              description: e.event.extendedProps.description,
              rrule: e.event._def.recurringDef?.typeData.rruleSet._rrule[0] ?? undefined,
              editable: e.event.startEditable,
              bookingType: e.event.extendedProps.bookingType,
              bookingState: e.event.extendedProps.bookingState,
            });
          }}
        />
      </Box>
      <Dialog
        openDialog={openDialog}
        handleDialogClose={() => {
          setOpenDialog(false);
        }}
        onSaveRecurringBooking={onSaveRecurringBooking}
        handleCloseBookingModal={() => {
          setOpenBookingModal(false);
        }}
      />
    </>
  );
};

export default Calendar;
