import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleShowNotification } from '@/modules/ui/uiSlice';
import { copyToClipboard } from '@/utilities/clipboard';
import { severity } from '@/consts/constants';
import { Box, Typography, Stack } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

type Props = {
  id: number;
};

const AddCalendarButton = ({ id }: Props) => {
  const dispatch = useDispatch();

  const handleAddToClipboard = () => {
    const url = `http://www.testURL/${id}`;
    try {
      copyToClipboard(url);
      dispatch(toggleShowNotification({ message: 'This Feature Has Yet to be Implemented', severity: severity.INFO }));
    } catch (err: unknown) {
      const error = err as Error;
      dispatch(toggleShowNotification({ message: error.message, severity: severity.ERROR }));
    }
  };

  return (
    <Box
      onClick={handleAddToClipboard}
      className='laptop:block hidden rounded-2xl px-3 py-1 border-2 border-bgBlack text-bgBlack cursor-pointer'
    >
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
