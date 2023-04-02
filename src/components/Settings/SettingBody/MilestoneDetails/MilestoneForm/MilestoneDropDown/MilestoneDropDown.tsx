import React from 'react';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';

type Props = {
  selectedState(state: string): void;
  value: string; // Double Binding
  className?: string;
};

const MilestoneDropDown = (props: Props) => {
  const handleChange = (event: SelectChangeEvent) => {
    props.selectedState(event.target.value);
  };

  return (
    <>
      <Select
        id='select-menu'
        className={`bg-bgWhite normal-case font-Inter rounded-xl ${props.className}`}
        value={props.value}
        onChange={handleChange}
        MenuProps={{
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
          transformOrigin: {
            vertical: -5,
            horizontal: 'left',
          },
        }}
      >
        <MenuItem className='bg-white hover:bg-dulwichRedHover' value={'1'}>
          1
        </MenuItem>
        <MenuItem className='bg-white hover:bg-dulwichRedHover' value={'2'}>
          2
        </MenuItem>
      </Select>
    </>
  );
};

export default MilestoneDropDown;
