import React from 'react';
import { Typography, Stack } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { LandingRoute } from '@/consts/constants';
import ResponsiveText from '@components/ResponsiveText/ResponsiveText';

type Props = {
  route?: LandingRoute;
  title: string;
  description: string;
};

const LandingFormHeader = ({ route, title, description }: Props) => {
  return (
    <Stack direction='column'>
      <ResponsiveText>
        <Typography variant='h2'>{title}</Typography>
        <Typography variant='h6'>
          {description}{' '}
          {route && (
            <NavLink to={route.route} className='text-dulwichRed underline underline-offset-4'>
              {route.routeText}
            </NavLink>
          )}
        </Typography>
      </ResponsiveText>
    </Stack>
  );
};

export default LandingFormHeader;
