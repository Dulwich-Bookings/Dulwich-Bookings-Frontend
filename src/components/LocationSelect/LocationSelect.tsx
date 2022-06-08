import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const countries = [
  {
    key: 'Pudong',
    value: 'Shanghai Pudong',
  },
  {
    key: 'Puxi',
    value: 'Shanghai Puxi',
  },
  {
    key: 'Beijing',
    value: 'Beijing',
  },
  {
    key: 'Suzhou',
    value: 'Suzhou',
  },
  {
    key: 'Seoul',
    value: 'Seoul',
  },
  {
    key: 'Singapore',
    value: 'Singapore',
  },
  {
    key: 'Yangon',
    value: 'Yangon',
  },
  {
    key: 'Suzhou1',
    value: 'High School Suzhou',
  },
  {
    key: 'Zhuhai',
    value: 'Zhuhai',
  },
];

const locationSelect = () => {
  const [location, setLocation] = React.useState('Shanghai Pudong');

  const handleChange = (event: SelectChangeEvent) => {
    setLocation(event.target.value as string);
  };

  return (
    <form autoComplete='off'>
      <FormControl>
        <InputLabel htmlFor='open-select' />
        <Select
          sx={{ m: 1, minWidth: 120 }}
          size='medium'
          value={location}
          name='country'
          onChange={handleChange}
          inputProps={{
            id: 'open-select',
          }}
          renderValue={p => {
            return 'Dulwich College ' + p;
          }}
          className='bg-[#FFFFFF] fixed top-10 left-10 h-11'
        >
          {countries.map(country => (
            <MenuItem value={country.value} key={country.key} className='hover:bg-hoverBg'>
              {country.value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </form>
  );
};

export default locationSelect;
