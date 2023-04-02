import React from 'react';
import { Grid, Input, Toolbar, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

type Props = {
  numSelected: number;
  onBulkDelete: () => void;
  onInputChange: (input: string) => void;
};

const UserTableToolbar = ({ numSelected, onBulkDelete, onInputChange }: Props) => {
  const updateSearchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    onInputChange(event.target.value);
  };

  return (
    <Toolbar className='sm:pl-2 sm:pr-1'>
      <Grid className='flex-1 '>
        <Input
          placeholder='Search User...'
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

      {numSelected > 0 && (
        <Tooltip title='Delete'>
          <DeleteIcon className='cursor-pointer text-right text-dulwichRed mr-3' onClick={onBulkDelete} />
        </Tooltip>
      )}
    </Toolbar>
  );
};

export default UserTableToolbar;
