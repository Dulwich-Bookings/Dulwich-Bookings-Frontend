import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { severity } from '@/consts/constants';

import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

import FullCalendar, { createDuration, EventClickArg } from '@fullcalendar/react';
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
import { EventData, BookingType, BookingState, EventType } from '@/modules/Bookings/Types';
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

const dateDuration = (start: Date, end: Date): Duration => {
  const duration = createDuration(end.getTime() - start.getTime());
  if (duration === null) {
    const emptyDuration: Duration = {
      years: 0,
      months: 0,
      days: 0,
      minutes: 0,
    };
    return emptyDuration;
  }

  return duration;
};

const Calendar = (props: Props) => {
  const [openBookingModal, setOpenBookingModal] = useState<boolean>(false);

  const [bookingData, setBookingData] = useState<EventData>({
    id: '',
    userId: props.currentUser.id,
    title: '',
    formLabel: '',
    start: new Date(),
    end: new Date(),
    description: '',
    editable: true,
    bookingType: BookingType.BOOKING,
    bookingState: isAdmin(props.currentUser)
      ? BookingState.APPROVED
      : isTeacher(props.currentUser) && props.resourceData.accessRights.includes('Teacher')
      ? BookingState.APPROVED
      : props.resourceData.accessRights.includes('Student')
      ? BookingState.APPROVED
      : BookingState.PENDING,
  });

  const [bookings, setBookings] = useState<EventData[]>([]);
  const [newBooking, setNewBooking] = useState<boolean>(true);
  const [rrule, setRrule] = useState<RRule>();
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const dispatch = useDispatch();

  // for mobile responsiveness
  const theme = useTheme();
  const isMobile = !useMediaQuery(theme.breakpoints.up('sm'));

  const handleDateClick = (e: DateClickArg) => {
    const startTime = moment(e.dateStr).toDate();
    const endTime = moment(e.dateStr).add(15, 'm').toDate();
    setBookingData({
      ...bookingData,
      id: Math.random().toString(),
      formLabel: '',
      userId: props.currentUser.id,
      description: '',
      editable: true,
      rrule: undefined,
      bookingType: BookingType.BOOKING,
      start: startTime,
      end: endTime,
      eventType: EventType.NONE,
    });
    setNewBooking(true);
    setOpenBookingModal(true);
    setRrule(undefined);
  };

  const handleEventClick = (e: EventClickArg) => {
    const startTime = moment(e.event.start).toDate();
    const endTime = moment(e.event.end).toDate();
    setBookingData({
      ...bookingData,
      id: e.event.id,
      formLabel: e.event.extendedProps.formLabel,
      userId: e.event.extendedProps.userId,
      description: e.event.extendedProps.description,
      editable: e.event.startEditable,
      bookingType: e.event.extendedProps.bookingType,
      start: startTime,
      end: endTime,
      eventType: e.event.extendedProps.eventType,
    });
    setNewBooking(false);
    setOpenBookingModal(true);
    setRrule(e.event._def.recurringDef ? e.event._def.recurringDef?.typeData.rruleSet._rrule[0] : undefined);
  };

  const bookingState = isAdmin(props.currentUser)
    ? BookingState.APPROVED
    : isTeacher(props.currentUser) && props.resourceData.accessRights.includes('Teacher')
    ? BookingState.APPROVED
    : props.resourceData.accessRights.includes('Student')
    ? BookingState.APPROVED
    : BookingState.PENDING;

  const onAddBooking = async (data: EventData): Promise<void> => {
    if (data.formLabel.trim().length !== 0) {
      const newBooking: EventData = {
        ...data,
        backgroundColor:
          data.bookingType === BookingType.LESSON
            ? colors.bgLesson
            : bookingState === BookingState.PENDING
            ? colors.bgLightRed
            : colors.dulwichRed,
        borderColor:
          data.bookingType === BookingType.LESSON
            ? colors.bgLesson
            : bookingState === BookingState.PENDING
            ? colors.bgLightRed
            : colors.dulwichRed,
        textColor: data.bookingType === BookingType.LESSON ? colors.bgBlack : colors.white,
        editable: isAdmin(props.currentUser)
          ? true
          : props.resourceMaps.filter(r => r.resourceId === props.resourceData.id).filter(r => r.userId === props.currentUser.id).length !==
            0
          ? true
          : data.userId === props.currentUser.id
          ? true
          : false,
        duration: dateDuration(data.start, data.end),
        eventType: data.rrule ? EventType.RECURRING : EventType.SINGLE,
      };
      const newBookingsList: EventData[] = [...bookings, newBooking];
      setBookings(newBookingsList);
      setOpenBookingModal(false);
    } else {
      dispatch(toggleShowNotification({ message: 'Title cannot be empty', severity: severity.ERROR }));
    }
  };

  const onDeleteBooking = async (id: string): Promise<void> => {
    const newBookingsList = bookings.filter(booking => booking.id != id);
    setBookings(newBookingsList);
    setOpenBookingModal(false);
  };

  const onSaveBooking = async (data: EventData): Promise<void> => {
    if (data.formLabel.trim().length !== 0) {
      if (data.eventType === EventType.SINGLE) {
        const newBooking: EventData = {
          ...data,
          backgroundColor:
            data.bookingType === BookingType.LESSON
              ? colors.bgLesson
              : data.userId === props.currentUser.id
              ? bookingState === BookingState.PENDING
                ? colors.bgLightRed
                : colors.dulwichRed
              : bookingState === BookingState.PENDING
              ? colors.bgBookingBlackPending
              : colors.bgBookingBlack,
          borderColor:
            data.bookingType === BookingType.LESSON
              ? colors.bgLesson
              : data.userId === props.currentUser.id
              ? bookingState === BookingState.PENDING
                ? colors.bgLightRed
                : colors.dulwichRed
              : bookingState === BookingState.PENDING
              ? colors.bgBookingBlackPending
              : colors.bgBookingBlack,
          textColor: data.bookingType === BookingType.LESSON ? colors.bgBlack : colors.white,
          editable: isAdmin(props.currentUser)
            ? true
            : props.resourceMaps.filter(r => r.resourceId === props.resourceData.id).filter(r => r.userId === props.currentUser.id)
                .length !== 0
            ? true
            : data.userId === props.currentUser.id
            ? true
            : false,
          duration: dateDuration(data.start, data.end),
          eventType: data.rrule ? EventType.RECURRING : EventType.SINGLE,
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
          handleCloseModal={() => {
            setOpenBookingModal(false);
          }}
          onAddBooking={onAddBooking}
          onDeleteBooking={onDeleteBooking}
          onSaveBooking={onSaveBooking}
          onContact={onContact}
          newBooking={newBooking}
          rrule={rrule}
          currentUser={props.currentUser}
          weekProfile={props.resourceData.weekProfile}
          school={props.currentSchool}
          bookingData={bookingData}
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
              eventType: e.event.extendedProps.eventType,
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
              eventType: e.event.extendedProps.eventType,
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
