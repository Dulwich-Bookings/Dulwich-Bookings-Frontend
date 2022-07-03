import React, { useState, useEffect } from 'react';
import { Grid, SelectChangeEvent } from '@mui/material';
import { locationImages } from '@/consts/constants';
import { SchoolData } from '@/modules/school/types';
import { useSelector } from 'react-redux';
import { getAllSchools } from '@/modules/school/schoolSlice';

import LandingFormWrapper from '@components/Landing/LandingFormWrapper/LandingFormWrapper';
import { SchoolLocation } from '@components/Landing/SelectSchoolInput/SelectSchoolInput';
import { setLocalStorageValue, getLocalStorageValue } from '@/utilities/localStorage';

type FormProps = {
  schoolId: number;
};

type Props = {
  Form: (props: FormProps) => JSX.Element;
  children?: React.ReactNode;
  spacing?: number;
  showSelectLocation?: boolean;
};

const LandingWrapper = ({ children, spacing, showSelectLocation, Form }: Props) => {
  const allSchools: SchoolData[] | null = useSelector(getAllSchools);
  const loadingSchools: SchoolLocation = { text: 'Loading...', value: -1 };
  const [locations, setLocations] = useState<SchoolLocation[]>();
  const [currentLocation, setCurrentLocation] = useState<SchoolLocation>(loadingSchools);

  const firstLocationId: number = getLocalStorageValue('currentLocation')
    ? (getLocalStorageValue('currentLocation') as unknown as number)
    : -1;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const img = locationImages.find(img => img.id === currentLocation.value)?.img;

  useEffect(() => {
    if (!allSchools) return;
    const allLocations = allSchools.map(location => {
      return { text: location.name, value: location.id };
    });
    const firstLocation = firstLocationId === -1 ? allLocations[0] : allLocations.find(location => location.value === firstLocationId);
    setLocations(allLocations.sort((x, y) => x.value - y.value));
    setCurrentLocation(firstLocation ?? loadingSchools);
  }, [allSchools]);

  const handleLocationChange = (event: SelectChangeEvent) => {
    if (!locations) return;
    // This is a safe conversion as all values inside select are of type 'SchoolLocation'
    const changedValue = parseInt(event.target.value);
    const newLocation = locations.filter(location => location.value === changedValue)[0];
    setLocalStorageValue('currentLocation', changedValue);
    setCurrentLocation(newLocation);
  };

  return (
    <Grid container direction='row' className='h-screen'>
      <Grid item className='laptop:block hidden' xs={0} md={6}>
        {img && <img className='object-none h-screen' width='100%' src={img} />}
      </Grid>
      <Grid item xs={12} md={6}>
        {locations && (
          <LandingFormWrapper
            spacing={spacing}
            allLocations={locations}
            currentLocation={currentLocation}
            handleLocationChange={handleLocationChange}
            showSelectLocation={showSelectLocation}
          >
            <Form schoolId={currentLocation.value} />
            {children}
          </LandingFormWrapper>
        )}
      </Grid>
    </Grid>
  );
};

export default LandingWrapper;
