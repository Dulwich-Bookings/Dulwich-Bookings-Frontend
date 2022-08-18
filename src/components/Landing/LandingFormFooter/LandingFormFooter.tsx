import React from 'react';
import { Stack, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { LandingRoute } from '@/consts/constants';
import LandingButton from '@/components/Landing/LandingButton/LandingButton';

type Props = {
  buttonText: string;
  handleOnClick: () => void;
  footerLink?: LandingRoute;
  loading?: boolean;
};

const LandingFormFooter = ({ buttonText, footerLink, handleOnClick, loading }: Props) => {
  return (
    <Stack direction='column' alignItems='center' spacing={1}>
      <LandingButton buttonText={buttonText} handleOnClick={handleOnClick} loading={loading} />
      {footerLink && (
        <Typography variant='h6'>
          <NavLink to={footerLink.route} className='underline underline-offset-4 text-bgDarkGray'>
            {footerLink.routeText}
          </NavLink>
        </Typography>
      )}
    </Stack>
  );
};

export default LandingFormFooter;
