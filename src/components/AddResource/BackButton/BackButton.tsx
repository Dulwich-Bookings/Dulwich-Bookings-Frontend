import React from 'react';

import { Stack, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

type Props = {
  buttonName: string;
};

const BackButton = (props: Props) => {
  return (
    <Stack direction='row' spacing={0.5} alignItems='center' className='cursor-pointer'>
      <ArrowBackIosNewIcon className='text-[16px] text-bgDarkGray' />
      <Typography className='font-Inter text-bgDarkGray hover:underline'>{props.buttonName}</Typography>
    </Stack>
  );
};

export default BackButton;
