import React from 'react';
import { Stack } from '@mui/material';

import SchoolLogoImage from '@/assets/dulwich_college.jpeg';

const SchoolLogo = () => {
  return (
    <Stack
      direction='row'
      justifyContent='end'
      sx={{
        pt: 10,
        backgroundImage: `url(${SchoolLogoImage})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        height: '100%',
      }}
    ></Stack>
  );
};

export default SchoolLogo;
