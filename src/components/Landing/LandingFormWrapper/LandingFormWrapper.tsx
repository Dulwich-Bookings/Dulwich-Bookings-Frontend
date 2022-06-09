import React from 'react';
import { Grid, Stack, SelectChangeEvent } from '@mui/material';
import { SchoolLocation } from '@components/Landing/SelectSchoolInput/SelectSchoolInput';
import SelectSchoolInput from '@components/Landing/SelectSchoolInput/SelectSchoolInput';

type Props = {
  children: React.ReactNode;
  allLocations: SchoolLocation[];
  currentLocation: SchoolLocation;
  handleLocationChange: (event: SelectChangeEvent) => void;
};

const LandingFormWrapper = ({ children, allLocations, currentLocation, handleLocationChange }: Props) => {
  return (
    <Grid container className='h-screen' direction='column' alignItems='center' justifyContent='center'>
      <Grid item className='w-9/12'>
        <Stack direction='column' spacing={8}>
          <SelectSchoolInput
            allLocations={allLocations}
            currentLocation={currentLocation}
            handleLocationChange={handleLocationChange}
            className='laptop:absolute laptop:top-10 laptop:left-10 flex -top-10 h-11'
          />
          {children}
        </Stack>
      </Grid>
    </Grid>
  );
};

export default LandingFormWrapper;
