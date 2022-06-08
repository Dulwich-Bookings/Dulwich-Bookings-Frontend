import { TextField, Typography, Stack } from '@mui/material';
import React from 'react';

type Props = {
  title: string;
  placeholder: string;
};

const credentialsInput = ({ title, placeholder }: Props) => {
  return (
    <>
      <Stack direction='column'>
        <Typography variant='h6'>{title}</Typography>
        <TextField id='outlined' className='rounded-md' placeholder={placeholder} variant='outlined' />
      </Stack>
    </>
  );
};
export default credentialsInput;
