import React from 'react';

import { Box, Typography } from '@mui/material';
import { RecurringTypes, RecurringType } from '@/modules/Bookings/Types';

type Props = {
  weekProfile: RecurringTypes;
};

const WeekButton = ({ weekProfile }: Props) => {
  return (
    <>
      {weekProfile === RecurringType.BIWEEKLY && (
        <Box className='rounded-2xl px-3 py-1 bg-dulwichRed text-bgWhite'>
          <Typography className=''>{weekProfile}</Typography>
        </Box>
      )}
    </>
  );
};

export default WeekButton;
