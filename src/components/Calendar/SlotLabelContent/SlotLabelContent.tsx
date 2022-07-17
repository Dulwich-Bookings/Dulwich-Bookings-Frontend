import React from 'react';
import moment from 'moment';
import { SlotLabelContentArg } from '@fullcalendar/react';
import { Typography } from '@mui/material';

type Props = {
  obj: SlotLabelContentArg;
};

const SlotLabelContent = ({ obj }: Props) => {
  const { date } = obj;
  const dateString = date.toString();
  const time = moment(dateString).format('h a').toUpperCase();
  return (
    <Typography className='text-gray-700 font-Inter' variant='caption'>
      {time}
    </Typography>
  );
};

export default SlotLabelContent;
