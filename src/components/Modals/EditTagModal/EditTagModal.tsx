import React, { useState } from 'react';

import { Card, CardContent, Grid, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { TagData, TagPutData } from '@/modules/tag/types';
import InputColorPicker from '@/components/Inputs/InputColorPicker/InputColorPicker';
import FormSubmitButton from '@/components/AddResource/Forms/FormSubmitButton/FormSubmitButton';
import InputWithoutBorder from '@/components/Inputs/InputWithoutBorder/InputWithoutBorder';
import { InputValidation } from '@/modules/inputValidation/types';
import TagService from '@/api/tag/TagService';
import { useApi } from '@/api/ApiHandler';

type Props = {
  handleSuccess: () => void;
  handleClose: () => void;
  tagData: TagData;
};

const EditTagModal = ({ tagData, handleSuccess, handleClose }: Props) => {
  const noError: InputValidation = { isError: false, errorHelperText: '' };

  const [tagName, setTagName] = useState<string>(tagData.name);
  const [colourCode, setColourCode] = useState<string>(tagData.colour);
  const [tagError, setTagError] = useState<InputValidation>(noError);

  const [updateTag] = useApi((data: TagPutData) => TagService.updateTagById(data.id ?? 0, data ?? null), true, true);

  const updateColourHandler = (colourCode: string): void => {
    setColourCode(colourCode);
  };

  const formValidation = () => {
    const errorText = 'Field Cannot be Empty';
    const errorObj: InputValidation = {
      isError: true,
      errorHelperText: errorText,
    };

    const isValidTagName = tagName.length !== 0;
    // by default role.ADMIN has access

    setTagError(isValidTagName ? noError : errorObj);

    if (!isValidTagName) {
      throw new Error('Form Invalid');
    }
  };

  // Create Resource Data from API
  const handleUpdateTag = async () => {
    try {
      formValidation();

      const updateData: TagPutData = {
        id: tagData.id,
        name: tagName,
        colour: colourCode,
      };

      const sendReq = await updateTag(updateData);

      if (sendReq.isSuccess) {
        handleSuccess();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className='bg-bgGray rounded-xl w-[355px] homeLaptop:w-[600px] h-128 hover:shadow-[0_4px_30px_0px_rgba(0,0,0,0.25)]'>
      <CardContent className='grow'>
        <div className='z-10'>
          <CloseIcon className='float-right text-3xl cursor-pointer' onClick={handleClose} sx={{ color: `#404040` }} />
        </div>

        <Stack spacing={1.5} className='m-10' alignItems='start'>
          <div className='font-Inter text-dulwichRed text-3xl'>Edit Tag</div>
          <Stack className='w-full'>
            <InputWithoutBorder
              inputHandleOnChange={input => setTagName(input.target.value)}
              inputValue={tagName}
              labelText='Name'
              inputPlaceholder='Add the subscription name'
              inputValidation={tagError}
              inputType='text'
              inputClassName='rounded-xl bg-bgWhite'
              required={true}
            />
          </Stack>

          <Stack className='w-full '>
            <InputColorPicker
              inputClassName='rounded-xl bg-bgWhite'
              inputHandleOnChange={updateColourHandler}
              inputValue={colourCode}
              labelClassName={'hidden'}
              pickerClassName='w-full'
            />
          </Stack>
        </Stack>
        <Grid container className='justify-end' spacing={2}>
          <Grid item>
            <FormSubmitButton
              buttonText='Close'
              handleOnClick={handleSuccess}
              buttonClassName='w-32 bg-textGray rounded-xl text-bgWhite font-inter'
            />
          </Grid>
          <Grid item>
            <FormSubmitButton
              buttonText='Edit Tag'
              handleOnClick={handleUpdateTag}
              buttonClassName='w-32 bg-dulwichRed rounded-xl text-bgWhite font-inter'
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default EditTagModal;
