import React, { useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import FullCalendar, { EventClickArg } from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import DayHeaderContent from '@components/Calendar/DayHeaderContent/DayHeaderContent';
import SlotLabelContent from '@components/Calendar/SlotLabelContent/SlotLabelContent';
import BookingForm from '../BookingForm/BookingForm';
import moment from 'moment';
import './Calendar.css';

export type EventData = {
  title: string;
  start: string;
  end: string;
  description: string;
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  editable: boolean;
};

type Props = {
  data: EventData[];
};

const Calendar = ({ data }: Props) => {
  const [openBookingModal, setOpenBookingModal] = useState<boolean>(false);
  const [bookingTitle, setBookingTitle] = useState<string>('');
  const [bookingTime, setBookingTime] = useState<string>('');
  const [bookingDescription, setBookingDescription] = useState<string>('');
  const [bookingAddOthers, setBookingAddOthers] = useState<string>('');
  const theme = useTheme();
  const isMobile = !useMediaQuery(theme.breakpoints.up('sm'));

  const handleDateClick = (e: DateClickArg) => {
    const start = moment(e.dateStr).format('dddd, MMMM D');
    const startTime = moment(e.dateStr).format('HH:mm');
    const endTime = moment(e.dateStr).add(15, 'm').format('HH:mm');
    setBookingTitle('');
    setBookingDescription('');
    setBookingAddOthers('');
    setBookingTime(start + '\n' + startTime + ' - ' + endTime);
    setOpenBookingModal(true);
  };
  const handleEventClick = (e: EventClickArg) => {
    console.log(e.event._instance?.range);
    const start = moment(e.event._instance?.range.start).format('dddd, MMMM D');
    const startTime = moment(e.event._instance?.range.start).format('HH:mm');
    const endTime = moment(e.event._instance?.range.end).format('HH:mm');
    setBookingTime(start + '\n' + startTime + ' - ' + endTime);
    setBookingTitle(e.event.title);
    setBookingDescription(e.event.extendedProps.description);
    setBookingAddOthers(e.event.extendedProps.addOthers);
    e.event.startEditable ? setOpenBookingModal(true) : setOpenBookingModal(false);
  };

  return (
    <>
      <BookingForm
        bookingTitle={bookingTitle}
        bookingDescription={bookingDescription}
        bookingAddOthers={bookingAddOthers}
        openState={openBookingModal}
        handleCloseModal={() => {
          setOpenBookingModal(false);
        }}
        time={bookingTime}
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
