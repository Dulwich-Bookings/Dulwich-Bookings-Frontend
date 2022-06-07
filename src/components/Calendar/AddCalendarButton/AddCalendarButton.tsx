import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const AddCalendarButton = () => {
  return (
    <Box className='rounded-2xl px-3 py-1 bg-grayLight cursor-pointer'>
      <Stack direction='row' alignItems='center' spacing={1}>
        <CalendarMonthIcon />{' '}
        <Typography className='text-center mt-0.5' variant='caption'>
          Add to calendar
        </Typography>
      </Stack>
    </Box>
  );
};

export default AddCalendarButton;
