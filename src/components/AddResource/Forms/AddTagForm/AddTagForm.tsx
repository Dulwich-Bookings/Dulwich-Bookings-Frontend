import React, { useState } from 'react';

import { Stack, Grid } from '@mui/material';

import FormHeader from '@components/AddResource/FormHeader/FormHeader';
import TemplateSubmitButton from '@/components/AddResource/Forms/TemplateSubmitButton/TemplateSubmitButton';
import FormSubmitButton from '@/components/AddResource/Forms/FormSubmitButton/FormSubmitButton';
import InputWithoutBorder from '@/components/Inputs/InputWithoutBorder/InputWithoutBorder';

import ResourceSample1 from '@/assets/images/Resource-Sample-1.jpg';

// import TagService from '@/api/tag/TagService';
// import { useApi } from '@/api/ApiHandler';

import { InputValidation } from '@/modules/inputValidation/types';

import InputColorPicker from '@/components/Inputs/InputColorPicker/InputColorPicker';

const AddTagForm = () => {
  const noError: InputValidation = { isError: false, errorHelperText: '' };

  // react hooks
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [roomName, setRoomName] = useState<string>('');
  const [roomError, setRoomError] = useState<InputValidation>(noError);

  const [templateFormName, setTemplateFormName] = useState<string>('');

  // useApi hook
  //   const [createTag] = useApi((data: CreateTagData) => TagService.createTag(data ?? null), true, true);

  // useHistory hook

  // helper functions

  const handleUploadTemplate = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (!file) {
      return;
    }
    const message: string = 'Successfully uploaded ' + file.name;
    setTemplateFormName(message);
  };

  const formValidation = () => {
    const errorText = 'Field Cannot be Empty';
    const errorObj: InputValidation = {
      isError: true,
      errorHelperText: errorText,
    };

    const isValidRoomName = roomName.length !== 0;
    // by default role.ADMIN has access

    setRoomError(isValidRoomName ? noError : errorObj);

    if (!isValidRoomName) {
      throw new Error('Form Invalid');
    }
  };

  // Create Resource Data from API
  const handleCreateResource = async () => {
    try {
      setIsLoading(true);
      formValidation();
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  return (
    <>
      <Stack direction='row' className='w-screen justify-start'>
        <Stack className='addRoomLaptop:w-2/3 w-screen py-10 px-24' spacing={2}>
          <FormHeader title='Add Tag' />

          <Grid container>
            <Grid item className='w-1/2'>
              <InputWithoutBorder
                inputHandleOnChange={input => setRoomName(input.target.value)}
                inputValue={roomName}
                labelText='Tag Name'
                inputPlaceholder='Add the tag name'
                inputValidation={roomError}
                inputType='text'
                inputClassName='rounded-xl w-3/4 bg-bgGray focus-within:bg-bgWhite'
                required={true}
              />
            </Grid>
          </Grid>

          <Grid container>
            <Grid item className='w-1/2'>
              <InputColorPicker required />
            </Grid>
          </Grid>

          <Stack direction='row' spacing={5} className='z-0'>
            <FormSubmitButton
              buttonClassName='w-56 h-16 bg-dulwichRed rounded-xl text-bgWhite font-inter'
              buttonText='Add Tag'
              handleOnClick={handleCreateResource}
              loading={isLoading}
            />
            <TemplateSubmitButton
              buttonClassName='w-72 h-16 bg-dulwichRed rounded-xl text-bgWhite font-inter'
              buttonText='Upload Template'
              helperText={templateFormName}
              handleOnClick={handleUploadTemplate}
            />
          </Stack>
        </Stack>
        <img className='hidden w-1/3 h-screen float-right object-cover addRoomLaptop:block' src={ResourceSample1} />
      </Stack>
    </>
  );
};

export default AddTagForm;
