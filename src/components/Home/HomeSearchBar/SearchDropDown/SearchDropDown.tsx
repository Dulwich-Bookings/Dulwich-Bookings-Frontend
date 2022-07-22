import React, { useState } from 'react';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { viewState } from '@/consts/constants';

type Props = {
  selectedState(state: string): void;
};

const HomeMenu = (props: Props) => {
  const [selectedIndex, setSelectedIndex] = useState<string>(viewState.ALL);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedIndex(event.target.value);
    props.selectedState(event.target.value);
  };

  return (
    <>
      <div>
        <Select
          id='select-menu'
          className='bg-dulwichRed text-bgWhite rounded-full normal-case font-Inter max-h-9'
          value={selectedIndex}
          onChange={handleChange}
          MenuProps={{
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left',
            },
            transformOrigin: {
              vertical: -10,
              horizontal: 'left',
            },
          }}
        >
          <MenuItem className='bg-white hover:bg-dulwichRedHover' value={viewState.ALL}>
            All
          </MenuItem>
          <MenuItem className='bg-white hover:bg-dulwichRedHover' value={viewState.RESOURCES}>
            Rooms
          </MenuItem>
          <MenuItem className='bg-white hover:bg-dulwichRedHover' value={viewState.SUBSCRIPTIONS}>
            Subscriptions
          </MenuItem>
        </Select>
      </div>
    </>
  );
};

export default HomeMenu;
