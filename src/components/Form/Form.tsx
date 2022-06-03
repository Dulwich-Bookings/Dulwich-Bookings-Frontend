import { TextField, Typography, Stack } from '@mui/material';
import React from 'react';

const Form: React.FC<{ content: string; label: string }> = props => {
  return (
    <React.Fragment>
      {' '}
      <Stack direction='column'>
        <Typography variant='h6'>{props.content}</Typography>
        <TextField id='outlined' className='rounded-md' placeholder={props.label} variant='outlined' />
      </Stack>
    </React.Fragment>
  );
};
export default Form;
