import React from 'react';
import { Stack, TextField, Input } from '@mui/material';

type Props<inputType> = {
  spacing?: number;
  icon: JSX.Element | React.ElementType;
  inputPlaceholder?: string;
  inputType: string;
  inputClassname?: string;
  inputValue?: inputType;
  handleOnClick?: () => void;
  multiline?: boolean;
  rows?: number;
  inputVariant?: 'outlined' | 'standard' | 'filled';
  inputHandleOnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  ref?: React.RefObject<HTMLDivElement>;
  acceptInput?: boolean;
};

// eslint-disable-next-line @typescript-eslint/ban-types
const InputWithIcon = <T extends Object>(props: Props<T>) => {
  if (props.acceptInput) {
    return (
      <Stack direction='row' className='w-full' spacing={props.spacing} alignItems='center'>
        <>
          {props.icon}
          <TextField
            className={props.inputClassname}
            color='error'
            value={props.inputValue}
            type={props.inputType}
            onChange={props.inputHandleOnChange}
            onClick={props.handleOnClick}
            id='standard-basic'
            placeholder={props.inputPlaceholder}
            multiline={props.multiline}
            rows={props.rows}
            inputRef={props.ref}
            variant={props.inputVariant ? props.inputVariant : 'outlined'}
          />
        </>
      </Stack>
    );
  }
  return (
    <Stack direction='row' className='w-full' spacing={props.spacing} alignItems='center'>
      <>
        {props.icon}
        <Input
          className={props.inputClassname}
          color='primary'
          value={props.inputValue}
          type={props.inputType}
          onChange={props.inputHandleOnChange}
          onClick={props.handleOnClick}
          id='standard-basic'
          placeholder={props.inputPlaceholder}
          multiline={props.multiline}
          rows={props.rows}
          disableUnderline
        />
      </>
    </Stack>
  );
};
export default InputWithIcon;
