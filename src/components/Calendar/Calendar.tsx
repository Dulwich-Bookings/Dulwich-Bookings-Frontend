import React from 'react';
import Moment from 'react-moment';
import moment from 'moment';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import FullCalendar, { DayHeaderContentArg, SlotLabelContentArg } from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Typography } from '@mui/material';
import './Calendar.css';

const DayHeaderContent = (obj: DayHeaderContentArg) => {
  const { date } = obj;
  const dateString = date.toString();
  const day = moment(dateString).format('ddd').toUpperCase();
  return (
    <div className='flex flex-col'>
      <Typography className='text-[#4D4D4D]' variant='caption'>
        {day}
      </Typography>
      <Typography variant='h5'>
        <Moment format='DD'>{dateString}</Moment>
      </Typography>
    </div>
  );
};

const SlotLabelContent = (obj: SlotLabelContentArg) => {
  const { date } = obj;
  const dateString = date.toString();
  const time = moment(dateString).format('h a').toUpperCase();
  return (
    <Typography className='text-[#4D4D4D]' variant='caption'>
      {time}
    </Typography>
  );
};

const Calendar = () => {
  const theme = useTheme();
  const isMobile = !useMediaQuery(theme.breakpoints.up('sm'));
  return (
    <>
      <FullCalendar
        headerToolbar={{
          start: '',
          center: '',
          end: 'today prev title next',
        }}
        dayHeaderContent={DayHeaderContent}
        slotLabelContent={SlotLabelContent}
        height={'90%'}
        allDaySlot={false}
        nowIndicator={true}
        slotMinTime='07:00:00'
        slotMaxTime='22:00:00'
        scrollTime='08:00:00'
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView={isMobile ? 'timeGridDay' : 'timeGridWeek'}
      />
    </>
  );
};

export default Calendar;
