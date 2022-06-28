import React, { useState, useEffect } from 'react';
import { Grid, SelectChangeEvent } from '@mui/material';
import { useApi } from '@/api/ApiHandler';
import SchoolService from '@/api/school/SchoolService';
import { locationImages } from '@/consts/constants';
import { SchoolData } from '@/modules/school/types';

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
  const [getAllSchools] = useApi(() => SchoolService.getAllSchools(), false, false, false);
  const loadingSchools: SchoolLocation = { text: 'Loading...', value: -1 };
  const [schoolLocations, setSchoolLocations] = useState<SchoolLocation[]>();
  const [currentLocation, setCurrentLocation] = useState<SchoolLocation>(loadingSchools);

  const firstLocationId: number = getLocalStorageValue('currentLocation')
    ? (getLocalStorageValue('currentLocation') as unknown as number)
    : -1;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const img = locationImages.find(img => img.id === currentLocation.value)?.img;

  const fetchSchools = async () => {
    try {
      const res = await getAllSchools();
      if (!res.isSuccess) return;
      const locations: SchoolLocation[] = res.data.map((location: SchoolData) => {
        return { text: location.name, value: location.id };
      });
      const firstLocation = firstLocationId === -1 ? locations[0] : locations.find(location => location.value === firstLocationId);
      setSchoolLocations(locations.sort((x, y) => x.value - y.value));
      setCurrentLocation(firstLocation ?? loadingSchools);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSchools();
  }, []);

  const handleLocationChange = (event: SelectChangeEvent) => {
    if (!schoolLocations) return;
    // This is a safe conversion as all values inside select are of type 'SchoolLocation'
    const changedValue = parseInt(event.target.value);
    const newLocation = schoolLocations.filter(location => location.value === changedValue)[0];
    setLocalStorageValue('currentLocation', changedValue);
    setCurrentLocation(newLocation);
  };

  return (
    <Grid container direction='row' className='h-screen'>
      <Grid item className='laptop:block hidden' xs={0} md={6}>
        {img && <img className='object-none h-screen' width='100%' src={img} />}
      </Grid>
      <Grid item xs={12} md={6}>
        {schoolLocations && (
          <LandingFormWrapper
            spacing={spacing}
            allLocations={schoolLocations}
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
