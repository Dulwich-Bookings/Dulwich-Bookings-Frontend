import React, { useState } from 'react';

import { InputValidation } from '@/modules/inputValidation/types';
import { SketchPicker, ColorResult, HSLColor } from 'react-color';
import InputWithoutBorder from '../InputWithoutBorder/InputWithoutBorder';

type Props = {
  spacing?: number; // Optional definition for the space between Label and Input
  labelClassName?: string; // Optional ClassNames for Label
  inputClassName?: string; // Optional ClassNames for Input
  inputFormat?: string;
  inputValidation?: InputValidation;
  inputValue?: Date;
  inputHandleOnChange?: (color: string) => void; // Use with InputValue (Double Binding)
  required?: boolean;
};

// eslint-disable-next-line @typescript-eslint/ban-types
const InputColorPicker = (props: Props) => {
  const [colorCode, setColorCode] = useState<HSLColor>();

  const handler = (val: ColorResult) => {
    console.log(val);
    setColorCode(val.hsl);
  };

  return (
    <>
      <InputWithoutBorder
        labelText='Add Color'
        inputPlaceholder='Click to Add Color'
        inputType='text'
        inputClassName='rounded-xl w-3/4 bg-bgGray focus-within:bg-bgWhite'
        required={props.required}
      />
      <SketchPicker color={colorCode} onChange={handler} />
    </>
  );
};

export default InputColorPicker;
