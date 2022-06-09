import React from 'react';
import { Select, MenuItem, SelectChangeEvent } from '@mui/material';

export type SchoolLocation = {
  text: string;
  value: number;
};

type Props = {
  className?: string;
  allLocations: SchoolLocation[];
  currentLocation: SchoolLocation;
  handleLocationChange: (event: SelectChangeEvent) => void;
};

const SelectSchoolInput = ({ className, allLocations, currentLocation, handleLocationChange }: Props) => {
  return (
    <>
      <Select
        onChange={handleLocationChange}
        value={currentLocation.value.toString()}
        renderValue={() => `Dulwich College ${currentLocation.text}`}
        className={`bg-bgWhite ${className}`}
      >
        {allLocations.map(location => (
          <MenuItem key={location.value} value={location.value}>
            {location.text}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};

export default SelectSchoolInput;
