import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import DayHeaderContent from '@components/Calendar/DayHeaderContent/DayHeaderContent';
import SlotLabelContent from '@components/Calendar/SlotLabelContent/SlotLabelContent';
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
  const theme = useTheme();
  const isMobile = !useMediaQuery(theme.breakpoints.up('sm'));

  const handleDateClick = (e: DateClickArg) => {
    console.log(e.dateStr);
  };

  return (
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
        editable={true}
        events={data}
      />
    </Box>
  );
};

export default Calendar;
