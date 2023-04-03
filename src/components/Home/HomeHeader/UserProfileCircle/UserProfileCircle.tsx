import React from 'react';
import { Box } from '@mui/system';

type Props = {
  email?: string;
  className?: string;
};

const UserProfileCircle = ({ email, className }: Props) => {
  const profileName = email ? email.substring(0, email.lastIndexOf('@')) : '?';
  const initials =
    profileName.lastIndexOf('.') === -1
      ? profileName.charAt(0).toUpperCase()
      : (profileName.charAt(0) + profileName.charAt(profileName.lastIndexOf('.') + 1)).toUpperCase();

  return (
    <Box className={`flex bg-bgPurple rounded-full justify-center items-center w-12 h-12 cursor-pointer ${className}`}>
      <p className='font-Inter'>{initials}</p>
    </Box>
  );
};

export default UserProfileCircle;
