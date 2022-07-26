import React from 'react';
import InputWithIcon from '../InputWithIcon/InputWithIcon';
import { CircleOutlined, RadioButtonCheckedOutlined } from '@mui/icons-material';
import Checkbox from '@mui/material/Checkbox';

type Props = {
  content: string;
  className: string;
  handleOnClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const BookingRadioButton = (props: Props) => {
  return (
    <InputWithIcon
      inputType='string'
      inputValue={props.content}
      inputClassname={props.className}
      icon={
        <Checkbox color='error' icon={<CircleOutlined />} checkedIcon={<RadioButtonCheckedOutlined />} onChange={props.handleOnClick} />
      }
      spacing={1}
      acceptInput={false}
    />
  );
};

export default BookingRadioButton;
