import React from 'react';
import SelectSchoolInput from '@components/Landing/SelectSchoolInput/SelectSchoolInput';
import { Grid, Stack } from '@mui/material';

type Props = {
  children?: React.ReactNode;
};

const LandingFormWrapper = ({ children }: Props) => {
  return (
    <Grid container className='h-screen' direction='column' alignItems='center' justifyContent='center'>
      <Grid item className='w-9/12'>
        <Stack direction='column' spacing={8}>
          <SelectSchoolInput className='laptop:hidden flex -top-10 h-11' />
          {children}
        </Stack>
      </Grid>
    </Grid>
  );
};

export default LandingFormWrapper;
