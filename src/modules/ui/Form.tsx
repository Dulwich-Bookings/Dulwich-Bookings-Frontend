import { TextField } from '@mui/material';
import styled from '@emotion/styled';
import React from 'react';

const customField = styled(TextField)`
  /* Rectangle 2 */

  box-sizing: border-box;

  position: absolute;
  width: 449px;
  height: 66px;
  left: 936px;
  top: 402px;

  background: #ffffff;
  border: 1px solid #656565;
  border-radius: 10px;
`;

const Form = () => {
  return (
    <div>
      <p className='absolute w-173 h-33 left-936 top-365 font-inter text-XXL leading-7'>Email</p>
      <TextField className='absolute rounded-md bg-white absolute w-449 h-66 left-936 top-402 border border-solid border-black'></TextField>
    </div>
  );
};
export default Form;
