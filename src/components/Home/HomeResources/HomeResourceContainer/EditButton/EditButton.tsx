import React from 'react';
import { Button, Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

type Props = {
  handleOnClick: () => void;
};

const EditButton = ({ handleOnClick }: Props) => {
  return (
    <Grid className='absolute -translate-x-4 -translate-y-4 z-10'>
      <Button variant='outlined' className='rounded-2xl border-dashed border-bgBlack bg-bgWhite px-1' onClick={handleOnClick}>
        <Grid container className='items-center'>
          <EditIcon className='text-bgBlack' />
          <p className='text-bgBlack capitalize font-Inter text-sm'>Edit</p>
        </Grid>
      </Button>
    </Grid>
  );
};

export default EditButton;
