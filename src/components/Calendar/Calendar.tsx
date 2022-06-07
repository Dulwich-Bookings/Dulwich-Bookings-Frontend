import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import DayHeaderContent from '@components/Calendar/DayHeaderContent/DayHeaderContent';
import SlotLabelContent from '@components/Calendar/SlotLabelContent/SlotLabelContent';
import './Calendar.css';

const dummyData = [
  {
    title: 'Form',
    start: '2022-06-06T08:15:00',
    end: '2022-06-06T08:30:00',
    description: 'Lecture',
    backgroundColor: '#D9D9D9',
    borderColor: '#D9D9D9',
    textColor: 'black',
  },
  {
    title: 'Lesson [Period 1]',
    start: '2022-06-06T08:35:00',
    end: '2022-06-06T09:30:00',
    description: 'Lecture',
    backgroundColor: '#D9D9D9',
    borderColor: '#D9D9D9',
    textColor: 'black',
    editable: true,
  },
  {
    title: 'Lesson [Period 2]',
    start: '2022-06-06T09:35:00',
    end: '2022-06-06T10:30:00',
    description: 'Lecture',
    backgroundColor: '#D9D9D9',
    borderColor: '#D9D9D9',
    textColor: 'black',
  },
  {
    title: 'MIT Meeting',
    start: '2022-06-06T10:30:00',
    end: '2022-06-06T11:00:00',
    description: 'Meeting',
  },
];

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
        events={dummyData}
      />
    </>
  );
};

export default Calendar;
