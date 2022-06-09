import React, { useState } from 'react';
import { Grid, SelectChangeEvent } from '@mui/material';
import LandingImage1 from '@/assets/images/Landing-Sample-1.png';
import LandingImage2 from '@/assets/images/Landing-Sample-2.png';
import LandingFormWrapper from '@/components/Landing/LandingFormWrapper/LandingFormWrapper';
import { SchoolLocation } from '@/components/Landing/SelectSchoolInput/SelectSchoolInput';

// TODO: Add API call to retrieve all schools
// TODO: Move to the consts/dummyData.ts file
const dummyLocations: SchoolLocation[] = [
  {
    text: 'Test',
    value: 1,
  },
  {
    text: 'Beijing',
    value: 2,
  },
  {
    text: 'Shanghai Pudong',
    value: 3,
  },
];

const locationImages = [
  {
    id: 1,
    img: LandingImage1,
  },
  {
    id: 2,
    img: LandingImage1,
  },
  {
    id: 3,
    img: LandingImage2,
  },
];

type Props = {
  children: React.ReactNode;
};

const LandingWrapper = ({ children }: Props) => {
  const [currentLocation, setCurrentLocation] = useState<SchoolLocation>(dummyLocations[0]);
  const img = locationImages.filter(img => img.id === currentLocation.value)[0].img;

  const handleLocationChange = (event: SelectChangeEvent) => {
    // This is a safe conversion as all values inside select are of type 'SchoolLocation'
    const changedValue = parseInt(event.target.value);
    const newLocation = dummyLocations.filter(location => location.value === changedValue)[0];
    setCurrentLocation(newLocation);
  };

  return (
    <Grid container direction='row' className='h-screen'>
      <Grid item className='laptop:block hidden' xs={0} md={6}>
        <img className='object-none h-screen' width='100%' src={img} />
      </Grid>
      <Grid item xs={12} md={6}>
        <LandingFormWrapper allLocations={dummyLocations} currentLocation={currentLocation} handleLocationChange={handleLocationChange}>
          {children}
        </LandingFormWrapper>
      </Grid>
    </Grid>
  );
};

export default LandingWrapper;
