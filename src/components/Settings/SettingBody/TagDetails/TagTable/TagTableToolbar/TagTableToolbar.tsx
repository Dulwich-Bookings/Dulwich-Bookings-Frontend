import React from 'react';
import { Grid, Input, Toolbar } from '@mui/material';

type Props = {
  onInputChange: (input: string) => void;
};

const TagTableToolbar = ({ onInputChange }: Props) => {
  const updateSearchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    onInputChange(event.target.value);
  };

  return (
    <Toolbar className='sm:pl-2 sm:pr-1 rounded-t-md'>
      <Grid className='flex-1 '>
        <Input
          placeholder='Search Tag...'
          className='font-Inter'
          onChange={updateSearchHandler}
          sx={{
            ':before': { borderBottomColor: 'black' },
            // underline when selected
            ':after': { borderBottomColor: 'red' },
            '.hover': { borderBottomColor: 'red' },
          }}
        />
      </Grid>
    </Toolbar>
  );
};

export default TagTableToolbar;
