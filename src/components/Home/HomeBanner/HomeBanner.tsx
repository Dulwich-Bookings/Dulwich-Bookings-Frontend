import React from 'react';
import { Stack } from '@mui/material';

import HomeBannerImage from '@/assets/landscapeImage.jpg';

const HomeBanner = () => {
  return (
    <Stack
      direction='row'
      justifyContent='end'
      sx={{
        pt: 24,
        backgroundImage: `url(${HomeBannerImage})`,
      }}
    ></Stack>
  );
};

export default HomeBanner;
