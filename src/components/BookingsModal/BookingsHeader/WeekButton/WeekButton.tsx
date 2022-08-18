import React from 'react';

import { Box, Typography } from '@mui/material';

type Props = {
  weekProfile: 'Weekly' | 'BiWeekly';
};

const WeekButton = ({ weekProfile }: Props) => {
  return (
    <>
      {weekProfile === 'BiWeekly' && (
        <Box className='rounded-2xl px-3 py-1 bg-dulwichRed text-bgWhite'>
          <Typography className=''>{weekProfile}</Typography>
        </Box>
      )}
    </>
  );
};

export default WeekButton;
