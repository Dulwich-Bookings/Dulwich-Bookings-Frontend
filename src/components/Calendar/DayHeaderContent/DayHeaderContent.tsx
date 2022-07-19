import React from 'react';
import Moment from 'react-moment';
import moment from 'moment';
import { DayHeaderContentArg } from '@fullcalendar/react';
import { Typography } from '@mui/material';

type Props = {
  obj: DayHeaderContentArg;
};

const DayHeaderContent = ({ obj }: Props) => {
  const { date } = obj;
  const dateString = date.toString();
  const day = moment(dateString).format('ddd').toUpperCase();
  return (
    <div className='flex flex-col'>
      <Typography className='text-grayAccent font-Inter' variant='caption'>
        {day}
      </Typography>
      <Typography variant='h5'>
        <Moment format='DD'>{dateString}</Moment>
      </Typography>
    </div>
  );
};

export default DayHeaderContent;
