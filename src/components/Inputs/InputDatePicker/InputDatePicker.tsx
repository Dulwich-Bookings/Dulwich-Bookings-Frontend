import React from 'react';

import { InputValidation } from '@/modules/inputValidation/types';
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import InputWithoutBorder from '@/components/Inputs/InputWithoutBorder/InputWithoutBorder';

type Props = {
  spacing?: number; // Optional definition for the space between Label and Input
  labelText: string;
  labelClassName?: string; // Optional ClassNames for Label
  inputClassName?: string; // Optional ClassNames for Input
  inputFormat?: string;
  inputValidation?: InputValidation;
  inputValue?: Date;
  inputHandleOnChange: (date: Date | null) => void; // Use with InputValue (Double Binding)
  required?: boolean;
};

// eslint-disable-next-line @typescript-eslint/ban-types
const InputDatePicker = (props: Props) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DesktopDatePicker
        inputFormat={props.inputFormat}
        value={props.inputValue}
        onChange={props.inputHandleOnChange}
        renderInput={params => (
          <InputWithoutBorder
            inputProps={params}
            spacing={props.spacing}
            labelText={props.labelText}
            inputType='date'
            inputClassName={props.inputClassName}
            required={props.required}
          />
        )}
        disablePast={true}
      />
    </LocalizationProvider>
  );
};

export default InputDatePicker;
