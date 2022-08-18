import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import AddCalendarButton from '@/components/Modals/BookingsModal/BookingsHeader/AddCalendarButton/AddCalendarButton';
import WeekButton from '@/components/Modals/BookingsModal/BookingsHeader/WeekButton/WeekButton';
import { ResourceData } from '@/modules/resource/types';

type Props = {
  id: number;
  resourceData: ResourceData;
};
const BookingsHeader = ({ id, resourceData }: Props) => {
  return (
    <Box>
      <Stack direction='row' spacing={2} alignItems='center'>
        <Typography variant='h4'>{resourceData.name}</Typography>
        <AddCalendarButton id={id} />
        <WeekButton weekProfile={resourceData.weekProfile} />
      </Stack>
      <Typography className='laptop:block hidden w-1/3 h-14 font-Inter pt-3' variant='subtitle2'>
        {resourceData.description}
      </Typography>
    </Box>
  );
};

export default BookingsHeader;
