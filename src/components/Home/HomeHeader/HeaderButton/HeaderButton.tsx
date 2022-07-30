import React from 'react';
import { Button } from '@mui/material';

export type Props = {
  title: string;
  Icon?: JSX.Element;
  handleOnClick?: () => void;
  className?: string;
};

const HeaderButton = ({ handleOnClick, Icon, title, className }: Props) => {
  return (
    <Button
      onClick={handleOnClick}
      className={`bg-dulwichRed normal-case rounded-lg mt-2.5 ${className}`}
      variant='contained'
      size='small'
      disableElevation
    >
      {Icon}
      <p className='font-Inter text-md tracking-tight py-0.5 px-1'>{title}</p>
    </Button>
  );
};

export default HeaderButton;
