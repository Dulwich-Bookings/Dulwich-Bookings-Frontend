import React from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import BackButton from '@/components/AddResource/BackButton/BackButton';
import { useHistory } from 'react-router-dom';

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
