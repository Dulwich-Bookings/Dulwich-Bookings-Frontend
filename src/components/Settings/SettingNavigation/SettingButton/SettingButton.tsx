import React from 'react';
import { Button } from '@mui/material';

type Props = {
  buttonClassName?: string; //Optional for Button Styling
  textClassName?: string; //Optional for Button Styling
  buttonText: string;
  handleOnClick: () => void;
  isClicked: boolean;
  loading?: boolean;
};

const SettingButton = ({ buttonClassName, textClassName, buttonText, handleOnClick, isClicked }: Props) => {
  return (
    <Button onClick={handleOnClick} className={`justify-start ${isClicked && 'bg-bgGray'} ${buttonClassName}`}>
      <p className={`font-Inter text-xl capitalize text-textGray ${textClassName}`}>{buttonText}</p>
    </Button>
  );
};

export default SettingButton;
