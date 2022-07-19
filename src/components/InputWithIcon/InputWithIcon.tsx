import React from 'react';
import { Stack, TextField, Input } from '@mui/material';
import { styled } from '@mui/material/styles';

const CssTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'transparent',
      paddingLeft: '0.5rem',
    },
    '&:hover fieldset': {
      borderColor: 'black',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'red',
    },
  },
});

type Props<inputType> = {
  spacing?: number;
  icon: JSX.Element | React.ElementType;
  inputPlaceholder?: string;
  inputType: string;
  inputClassname?: string;
  inputValue?: inputType;
  onFocus?: () => void;
  onBlur?: () => void;
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
          <CssTextField
            className={props.inputClassname}
            value={props.inputValue}
            type={props.inputType}
            onChange={props.inputHandleOnChange}
            placeholder={props.inputPlaceholder}
            multiline={props.multiline}
            rows={props.rows}
            inputRef={props.ref}
            variant={props.inputVariant ? props.inputVariant : 'outlined'}
            onFocus={props.onFocus}
            onBlur={props.onBlur}
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
          readOnly
        />
      </>
    </Stack>
  );
};
export default InputWithIcon;
