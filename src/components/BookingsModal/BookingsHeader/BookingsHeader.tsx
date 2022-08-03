import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import AddCalendarButton from '@/components/BookingsModal/BookingsHeader/AddCalendarButton/AddCalendarButton';

export type BookingsHeaderData = {
  title: string;
  description: string;
};

type Props = {
  id: number;
  title: string;
  description: string;
};
const BookingsHeader = ({ id, title, description }: Props) => {
  return (
    <Box>
      <Stack direction='row' spacing={2} alignItems='center'>
        <Typography variant='h4'>{title}</Typography>
        <AddCalendarButton id={id} />
      </Stack>
      <Typography className='laptop:block hidden w-1/3 h-14 font-Inter pt-3' variant='subtitle2'>
        {description}
      </Typography>
    </Box>
  );
};

export default BookingsHeader;
