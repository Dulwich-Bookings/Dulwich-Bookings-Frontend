import React, { useState } from 'react';
import { Select, SelectChangeEvent, MenuItem } from '@mui/material';

export type SchoolLocation = {
  text: string;
  value: number;
};

const dummyLocations: SchoolLocation[] = [
  {
    text: 'Beijing',
    value: 1,
  },
  {
    text: 'Shanghai Pudong',
    value: 2,
  },
  {
    text: 'Test',
    value: 3,
  },
];

type Props = {
  className?: string;
};

const SelectSchoolInput = ({ className }: Props) => {
  const [currentLocation, setCurrentLocation] = useState<SchoolLocation>(dummyLocations[0]);

  const handleLocationChange = (event: SelectChangeEvent) => {
    // This is a safe conversion as all values inside select are of type 'SchoolLocation'
    const changedValue = parseInt(event.target.value) - 1;
    setCurrentLocation(dummyLocations[changedValue]);
  };

  return (
    <>
      <Select
        onChange={handleLocationChange}
        value={currentLocation.value.toString()}
        renderValue={() => `Dulwich College ${currentLocation.text}`}
        className={`bg-bgWhite ${className}`}
      >
        {dummyLocations.map(location => (
          <MenuItem key={location.value} value={location.value}>
            {location.text}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};

export default SelectSchoolInput;
