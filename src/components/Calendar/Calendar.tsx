import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import DayHeaderContent from '@components/Calendar/DayHeaderContent/DayHeaderContent';
import SlotLabelContent from '@components/Calendar/SlotLabelContent/SlotLabelContent';
import './Calendar.css';

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
        dayHeaderContent={obj => <DayHeaderContent obj={obj} />}
        slotLabelContent={obj => <SlotLabelContent obj={obj} />}
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
