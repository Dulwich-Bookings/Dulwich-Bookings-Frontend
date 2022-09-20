import React, { useState } from 'react';
import { useApi } from '@/api/ApiHandler';
import MilestoneService from '@/api/milestone/MilestoneService';

import FormSubmitButton from '@/components/AddResource/Forms/FormSubmitButton/FormSubmitButton';
import { CreateMilestoneData, MilestoneFormData } from '@/modules/Milestones/Types';
import InputWithBorder from '@/components/Inputs/InputWithBorder/InputWithBorder';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

import { InputValidation } from '@/modules/inputValidation/types';
import DateTime from '@/modules/DateTime/DateTime';

type Props = {
  actionState: boolean; // true for bulk create, false for bulk delete
  milestones?: MilestoneFormData[];
  dialogState: boolean;
  successDialog: () => void;
  closeDialog: () => void;
};

const MilestoneDialog = ({ actionState, milestones, dialogState, successDialog, closeDialog }: Props) => {
  const noError: InputValidation = { isError: false, errorHelperText: '' };

  const [password, setPassword] = useState<string>('');
  const [pwError, setPwError] = useState<InputValidation>(noError);

  const [bulkCreateMilestone] = useApi(
    (data: { password: string; milestones: CreateMilestoneData[] }) =>
      MilestoneService.bulkCreateMilestone(data.password, data.milestones ?? []),
    true,
    true,
  );
  const [bulkDeleteMilestone] = useApi((password: string) => MilestoneService.bulkDeleteMilestone(password ?? []), true, true);

  const dialogText = actionState
    ? {
        title: 'Confirm Create Milestones?',
        body: 'Milestones will be not be editable after confirmation. Please enter your password to continue:',
        submitButton: 'Create',
      }
    : {
        title: 'Confirm Start New Year?',
        body: 'Starting a new year will REMOVED all existing milestones. Please enter your password to continue:',
        submitButton: 'Start Year',
      };

  const passwordValidation = () => {
    const errorText = 'Field Cannot be Empty';

    const errorObj: InputValidation = {
      isError: true,
      errorHelperText: errorText,
    };

    const isValidPassword = password.length !== 0;

    setPwError(isValidPassword ? noError : errorObj);

    if (!isValidPassword) {
      throw new Error('Form Invalid');
    }
  };

  const handleBulkCreate = async () => {
    try {
      passwordValidation();
      const milestoneData =
        milestones?.map(formData => {
          const data = {
            weekBeginning: DateTime.newDateTimeFromDate(formData.weekBeginning).toString(),
            week: formData.week,
          };
          return data;
        }) ?? [];

      console.log(milestoneData);
      const sendReq = await bulkCreateMilestone({ password: password, milestones: milestoneData });
      if (sendReq.isSuccess) {
        successDialog();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleBulkDelete = async () => {
    try {
      passwordValidation();
      const sendReq = await bulkDeleteMilestone(password);
      if (sendReq.isSuccess) {
        successDialog();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Dialog open={dialogState} onClose={closeDialog} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
        <DialogTitle id='alert-dialog-title' className={`font-Inter `}>
          {dialogText.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description' className={`font-Inter `}>
            {dialogText.body}
          </DialogContentText>
          <InputWithBorder
            labelText=''
            inputType='password'
            labelClassName='font-Inter text-textGray pt-4'
            inputSize='small'
            inputValue={password}
            inputHandleOnChange={input => setPassword(input.target.value)}
            inputValidation={pwError}
          />
        </DialogContent>
        <DialogActions className='pb-3'>
          <FormSubmitButton
            buttonClassName={`w-20 h-10 bg-[#808080] rounded-xl text-bgWhite font-inter `}
            textClassName={'text-[15px] '}
            buttonText={'Close'}
            handleOnClick={closeDialog}
          />
          <FormSubmitButton
            buttonClassName={`${actionState ? 'w-20' : 'w-36'} h-10 bg-dulwichRed rounded-xl text-bgWhite font-inter `}
            textClassName={'text-[15px] '}
            buttonText={dialogText.submitButton}
            handleOnClick={actionState ? handleBulkCreate : handleBulkDelete}
          />
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MilestoneDialog;
