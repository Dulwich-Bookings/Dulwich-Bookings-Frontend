import React from 'react';
import { Box } from '@mui/material';

import SchoolLogoImage from '@/assets/dulwich_college.jpeg';

const SchoolLogo = () => {
  return (
    <Box>
      <img className=' h-[65px]' src={SchoolLogoImage} />
    </Box>
  );
};

export default SchoolLogo;
