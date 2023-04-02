import React from 'react';
import { Typography } from '@mui/material';

type Props = {
  title: string;
};

const SettingHeader = ({ title }: Props) => {
  return (
    <Typography variant='h4' className='font-Inter w-full'>
      {title}
    </Typography>
  );
};

export default SettingHeader;
