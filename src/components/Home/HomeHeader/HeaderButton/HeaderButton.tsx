import React from 'react';
import { Button } from '@mui/material';

export type Props = {
  title: string;
  mobileTitle?: string;
  Icon?: JSX.Element;
  handleOnClick?: () => void;
  className?: string;
};

const HeaderButton = ({ handleOnClick, Icon, title, mobileTitle, className }: Props) => {
  const mTitle = mobileTitle || title;

  return (
    <Button
      onClick={handleOnClick}
      className={`bg-dulwichRed normal-case rounded-lg mt-2.5 ${className}`}
      variant='contained'
      size='small'
      disableElevation
    >
      {Icon}
      <p className='font-Inter text-md tracking-tight py-0.5 px-1 md:block hidden'>{title}</p>
      <p className='font-Inter text-md tracking-tight py-0.5 px-1 md:hidden block'>{mTitle}</p>
    </Button>
  );
};

export default HeaderButton;
