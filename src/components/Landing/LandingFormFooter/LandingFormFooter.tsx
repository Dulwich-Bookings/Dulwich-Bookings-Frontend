import React from 'react';
import { Stack, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { LandingRoute } from '@/consts/constants';
import LandingButton from '@/components/Landing/LandingButton/LandingButton';

type Props = {
  buttonText: string;
  handleOnClick: () => void;
  footerLink?: LandingRoute;
};

const LandingFormFooter = ({ buttonText, footerLink, handleOnClick }: Props) => {
  return (
    <Stack direction='column' alignItems='center' spacing={1}>
      <LandingButton buttonText={buttonText} handleOnClick={handleOnClick} />
      {footerLink && (
        <Typography variant='h6'>
          <NavLink to={footerLink.route} className='underline underline-offset-4 text-[#3D3D3D]'>
            {footerLink.routeText}
          </NavLink>
        </Typography>
      )}
    </Stack>
  );
};

export default LandingFormFooter;
