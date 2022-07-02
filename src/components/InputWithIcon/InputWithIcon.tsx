import React from 'react';
import { TextField, Stack } from '@mui/material';

type Props<inputType> = {
  spacing?: number;
  icon: JSX.Element;
  inputPlaceholder?: string;
  inputType: string;
  inputClassname?: string;
  inputValue?: inputType;
  handleOnClick?: () => void;
  multiline?: boolean;
  rows?: number;
  inputVariant?: 'outlined' | 'standard' | 'filled';
  inputHandleOnChange?: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
};

// eslint-disable-next-line @typescript-eslint/ban-types
const InputWithIcon = <T extends Object>(props: Props<T>) => {
  return (
    <Stack direction='row' className='w-full' spacing={props.spacing} alignItems='center'>
      <>
        {props.icon}
        <TextField
          color='error'
          className={props.inputClassname}
          value={props.inputValue}
          type={props.inputType}
          onChange={props.inputHandleOnChange}
          onClick={props.handleOnClick}
          id='standard-basic'
          placeholder={props.inputPlaceholder}
          multiline={props.multiline}
          rows={props.rows}
          variant={props.inputVariant ? props.inputVariant : 'standard'}
        />
      </>
    </Stack>
  );
};
export default InputWithIcon;
