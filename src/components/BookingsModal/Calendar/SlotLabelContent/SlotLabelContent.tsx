import React from 'react';
import moment from 'moment-timezone';

import { SlotLabelContentArg } from '@fullcalendar/react';
import { Typography } from '@mui/material';

import { useSelector } from 'react-redux';
import { getCurrentSchool } from '@/modules/school/schoolSlice';
type Props = {
  obj: SlotLabelContentArg;
};

const SlotLabelContent = ({ obj }: Props) => {
  const { date } = obj;
  const currentSchool = useSelector(getCurrentSchool);
  const dateString = date.toString();
  const time = moment(dateString)
    .tz(currentSchool?.timezone ?? 'Asia/Shanghai')
    .format('h:mm a')
    .toUpperCase();

  return (
    <Typography className='text-grayAccent' variant='caption'>
      {time}
    </Typography>
  );
};

export default SlotLabelContent;
