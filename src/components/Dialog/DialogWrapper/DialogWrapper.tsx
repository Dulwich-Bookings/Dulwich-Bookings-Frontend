import React from 'react';

import FormSubmitButton from '@/components/AddResource/Forms/FormSubmitButton/FormSubmitButton';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

type Props = {
  isOpen: boolean;
  handleClose: () => void;
  handleSubmit: () => void;
  title: string;
  textBody: string;
  buttonOneText: string;
  buttonTwoText: string;
  titleClassName?: string;
  textBodyClassName?: string;
  buttonOneClassName?: string;
  buttonOneTextClassName?: string;
  buttonTwoClassName?: string;
  buttonTwoTextClassName?: string;
};

const DialogWrapper = (props: Props) => {
  return (
    <Dialog
      open={props.isOpen}
      onClose={props.handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title' className={`font-Inter ${props.titleClassName}`}>
        {`${props.title}`}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description' className={`font-Inter ${props.textBodyClassName}`}>
          {props.textBody}
        </DialogContentText>
      </DialogContent>
      <DialogActions className='pb-3'>
        <FormSubmitButton
          buttonClassName={`w-20 h-10 bg-[#808080] rounded-xl text-bgWhite font-inter ${props.buttonOneClassName}`}
          textClassName={`text-[15px] ${props.buttonOneTextClassName}`}
          buttonText={`${props.buttonOneText}`}
          handleOnClick={props.handleClose}
        />
        <FormSubmitButton
          buttonClassName={`w-20 h-10 bg-dulwichRed rounded-xl text-bgWhite font-inter ${props.buttonTwoClassName}`}
          textClassName={`text-[15px] ${props.buttonTwoTextClassName}`}
          buttonText={`${props.buttonTwoText}`}
          handleOnClick={props.handleSubmit}
        />
      </DialogActions>
    </Dialog>
  );
};

export default DialogWrapper;
