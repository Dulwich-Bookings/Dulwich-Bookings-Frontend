import React, { useEffect, useState } from 'react';
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
import Dialog, { RecurringModificationType, RecurringModificationTypes } from '@/components/Modals/BookingsModal/Calendar/Dialog/Dialog';

import { UserData } from '@/modules/user/types';
import { SchoolData } from '@/modules/school/types';
import { ResourceData } from '@/modules/resource/types';
import { EventData, BookingType, EventType, BookingData, CreateBookingData, DeleteBookingData } from '@/modules/Bookings/Types';
import { ResourceMapData } from '@/modules/resourceMap/types';
import { toggleShowNotification } from '@/modules/ui/uiSlice';
import {
  getBookingState,
  getBgColor,
  getIsEditable,
  getTextColor,
  getEventType,
  eventDateDuration,
  getEventData,
  mapBookingDataToEventData,
} from '@/utilities/bookings';

import styled from '@emotion/styled';
import './Calendar.css';
import { useApi } from '@/api/ApiHandler';
import BookingService from '@/api/booking/BookingService';
import { retrieveAllData } from '@/utilities/api';

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
  const emptyEvent = {
    id: '',
    userId: props.currentUser.id,
    title: '',
    formLabel: '',
    start: new Date(),
    end: new Date(),
    description: '',
    editable: true,
    bookingType: BookingType.BOOKING,
    bookingState: getBookingState(props.currentUser, props.resourceData),
  };

  const [getBookingData] = useApi(() => BookingService.getBookingById(props.resourceData.id), false, true, false);
  const [createBooking] = useApi((data: CreateBookingData) => BookingService.createBooking(data ?? null), true, true);
  const [deleteBooking] = useApi((id: number) => BookingService.deleteAllBookingById(id), true, true);
  const [deleteRecurringBookingOnly] = useApi((data: DeleteBookingData) => BookingService.deleteCurrBookingById(data.id, data), true, true);
  const [deleteRecurringBookingFuture] = useApi(
    (data: DeleteBookingData) => BookingService.deleteFollowingBookingById(data.id, data),
    true,
    true,
  );

  const fetchData = async () => {
    const bookingData = await retrieveAllData<BookingData[]>(getBookingData);

    const eventData = mapBookingDataToEventData(bookingData ?? [], props.currentUser, props.resourceMaps, props.resourceData);
    setBookings(eventData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [openBookingModal, setOpenBookingModal] = useState<boolean>(false);
  const [bookingData, setBookingData] = useState<EventData>(emptyEvent);
  const [bookings, setBookings] = useState<EventData[]>([]);
  const [newBooking, setNewBooking] = useState<boolean>(true);
  const [rrule, setRrule] = useState<RRule>();
  const [updateDialog, setUpdateDialog] = useState<boolean>(false);
  const [deleteDialog, setDeleteDialog] = useState<boolean>(false);
  const dispatch = useDispatch();

  // for mobile responsiveness
  const theme = useTheme();
  const isMobile = !useMediaQuery(theme.breakpoints.up('sm'));

  // Open New Booking Modal
  const handleDateClick = (e: DateClickArg) => {
    const startTime = moment(e.dateStr).toDate();
    const endTime = moment(e.dateStr).add(15, 'm').toDate();
    const templateBooking = {
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
    };

    setBookingData(templateBooking);
    setNewBooking(true);
    setOpenBookingModal(true);
    setRrule(undefined);
  };

  // Handle Exisiting Event Click
  const handleEventClick = (e: EventClickArg) => {
    const startTime = moment(e.event.start).toDate();
    const endTime = moment(e.event.end).toDate();
    const currentEvent = {
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
    };

    const currentRRule = e.event._def.recurringDef ? e.event._def.recurringDef?.typeData.rruleSet._rrule[0] : undefined;
    setBookingData(currentEvent);
    setNewBooking(false);
    setOpenBookingModal(true);
    setRrule(currentRRule);
  };

  // On Create New Booking
  // TODO: Don't allow end time to be before start time. Also don't allow time slots before 7am and after 10pm.
  const onAddBooking = async (data: EventData): Promise<void> => {
    if (data.formLabel.trim().length == 0) {
      dispatch(toggleShowNotification({ message: 'Title cannot be empty', severity: severity.ERROR }));
      return;
    }

    if (data.end <= data.start) {
      dispatch(toggleShowNotification({ message: 'End time has to be after Start time', severity: severity.ERROR }));
      return;
    }

    if (data.start.getHours() < 7 || data.start.getHours() > 22 || data.end.getHours() < 7 || data.end.getHours() > 22) {
      dispatch(toggleShowNotification({ message: 'Start and End times have to be in between 7am to 10pm', severity: severity.ERROR }));
      return;
    }
    const createBookingData: CreateBookingData = {
      resourceId: props.resourceData.id,
      description: data.description,
      bookingState: data.bookingState,
      bookingType: data.bookingType,
      startDateTime: data.start.toISOString(),
      endDateTime: data.end.toISOString(),
      RRULE: data.rrule?.toString() ?? undefined,
    };

    await createBooking(createBookingData);

    fetchData();
    setOpenBookingModal(false);
  };

  // On Delete Booking
  const onDeleteBooking = async (data: EventData): Promise<void> => {
    if (data.eventType === EventType.SINGLE) {
      await deleteBooking(data.id as unknown as number);
      fetchData();
      setOpenBookingModal(false);
    } else {
      setDeleteDialog(true);
    }
  };

  // On Save Booking
  const onSaveBooking = async (data: EventData): Promise<void> => {
    if (data.formLabel.trim().length !== 0) {
      if (data.eventType === EventType.SINGLE) {
        const newBooking: EventData = {
          ...data,
          backgroundColor: getBgColor(data.bookingType, data.bookingState, props.resourceMaps, props.resourceData, props.currentUser),
          borderColor: getBgColor(data.bookingType, data.bookingState, props.resourceMaps, props.resourceData, props.currentUser),
          textColor: getTextColor(data.bookingType),
          editable: getIsEditable(props.resourceMaps, props.resourceData, props.currentUser),
          duration: eventDateDuration(data.start, data.end),
          eventType: getEventType(data),
        };
        const newBookingsList = bookings.map(booking => {
          return booking.id === data.id ? newBooking : booking;
        });
        setBookings(newBookingsList);
        setOpenBookingModal(false);
      } else {
        setUpdateDialog(true);
      }
    } else {
      dispatch(toggleShowNotification({ message: 'Title cannot be empty', severity: severity.ERROR }));
    }
  };

  const onSaveUpdateRecurringBooking = (modificationType: RecurringModificationTypes) => {
    console.log(modificationType);
  };
  const onSaveDeleteRecurringBooking = async (modificationType: RecurringModificationTypes): Promise<void> => {
    const selectedBooking: EventData = bookingData;
    const data: DeleteBookingData = {
      id: selectedBooking.id as unknown as number,
      body: {
        startDateTime: selectedBooking.start.toISOString(),
      },
    };

    if (modificationType === RecurringModificationType.ONLY) {
      await deleteRecurringBookingOnly(data);
    }

    if (modificationType === RecurringModificationType.FUTURE) {
      await deleteRecurringBookingFuture(data);
    }

    fetchData();
    setOpenBookingModal(false);
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
          eventDrop={e => onSaveBooking(getEventData(e))}
          eventResize={e => onSaveBooking(getEventData(e))}
        />
      </Box>
      <Dialog
        title='Update Recurring Booking'
        openDialog={updateDialog}
        handleDialogClose={() => {
          setUpdateDialog(false);
        }}
        onSaveRecurringBooking={onSaveUpdateRecurringBooking}
        handleCloseBookingModal={() => {
          setOpenBookingModal(false);
        }}
      />
      <Dialog
        title='Delete Recurring Booking'
        openDialog={deleteDialog}
        handleDialogClose={() => {
          setDeleteDialog(false);
        }}
        onSaveRecurringBooking={onSaveDeleteRecurringBooking}
        handleCloseBookingModal={() => {
          setOpenBookingModal(false);
        }}
      />
    </>
  );
};

export default Calendar;
