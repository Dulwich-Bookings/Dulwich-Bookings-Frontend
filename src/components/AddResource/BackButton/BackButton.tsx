import React from 'react';

import { Stack, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

type Props = {
  buttonText: string;
  onClickHandler?: () => void;
};

const BackButton = (props: Props) => {
  return (
    <Stack direction='row' spacing={0.5} alignItems='center' className='cursor-pointer' onClick={props.onClickHandler}>
      <ArrowBackIosNewIcon className='text-[16px] text-textGray' />
      <Typography className='font-Inter text-textGray hover:underline'>{props.buttonText}</Typography>
    </Stack>
  );
};

export default BackButton;
