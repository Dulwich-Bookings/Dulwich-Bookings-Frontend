import React, { useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import FullCalendar, { EventClickArg } from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import DayHeaderContent from '@/components/BookingsModal/Calendar/DayHeaderContent/DayHeaderContent';
import SlotLabelContent from '@/components/BookingsModal/Calendar/SlotLabelContent/SlotLabelContent';
import BookingForm from '@components/BookingsModal/BookingForm/BookingForm';
import moment from 'moment';
import styled from '@emotion/styled';
import './Calendar.css';

export const StyleWrapper = styled.div`
  .fc .fc-timegrid-slot-minor {
    border-top: none;
    border-bottom: none;
  }
`;

export type EventData = {
  // id: number;
  title: string;
  start: string;
  end: string;
  description: string;
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  editable: boolean;
  rrule?: string;
  bookingType: 'Booked' | 'Lesson';
  bookingState: 'Approved' | 'Pending';
};

type Props = {
  data: EventData[];
};

const Calendar = ({ data }: Props) => {
  const [openBookingModal, setOpenBookingModal] = useState<boolean>(false);
  const [bookingTitle, setBookingTitle] = useState<string>('');
  const [bookingTime, setBookingTime] = useState<string>('');
  const [startBook, setStartBook] = useState<string>('');
  const [endBook, setEndBook] = useState<string>('');
  const [bookingDescription, setBookingDescription] = useState<string>('');
  const [editable, setEditable] = useState<string>('');
  const [recurring, setRecurring] = useState<string>('');
  const theme = useTheme();
  const isMobile = !useMediaQuery(theme.breakpoints.up('sm'));

  const handleDateClick = (e: DateClickArg) => {
    const time = moment(e.dateStr).format('dddd, MMMM D');
    const startTime = moment(e.dateStr).format('HH:mm');
    const endTime = moment(e.dateStr).add(15, 'm').format('HH:mm');
    setBookingTitle('');
    setBookingDescription('');
    setEditable('new');
    setRecurring('none');
    setBookingTime(time);
    setStartBook(startTime);
    setEndBook(endTime);
    setOpenBookingModal(true);
  };
  const handleEventClick = (e: EventClickArg) => {
    console.log(e.event._instance?.range);
    const start = moment(e.event._instance?.range.start).format('dddd, MMMM D');
    const startTime = moment(e.event._instance?.range.start).format('HH:mm');
    const endTime = moment(e.event._instance?.range.end).format('HH:mm');
    setBookingTime(start);
    setStartBook(startTime);
    setEndBook(endTime);
    setBookingTitle(e.event.title);
    setBookingDescription(e.event.extendedProps.description);
    e.event.startEditable ? setEditable('editable') : setEditable('noneditable');
    setOpenBookingModal(true);
    setRecurring('none');
  };

  return (
    <>
      <BookingForm
        bookingTitle={bookingTitle}
        bookingDescription={bookingDescription}
        openState={openBookingModal}
        handleCloseModal={() => {
          setOpenBookingModal(false);
        }}
        time={bookingTime}
        editable={editable}
        start={startBook}
        end={endBook}
        recurring={recurring}
      />
      <Box className='h-full'>
        <FullCalendar
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
          plugins={[timeGridPlugin, interactionPlugin]}
          initialView={isMobile ? 'timeGridDay' : 'timeGridWeek'}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          editable={true}
          events={data}
        />
      </Box>
    </>
  );
};

export default Calendar;
