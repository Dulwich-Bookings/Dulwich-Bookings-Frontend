import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Stack, Grid } from '@mui/material';

import FormHeader from '@components/AddResource/FormHeader/FormHeader';
import FormSubmitButton from '@/components/AddResource/Forms/FormSubmitButton/FormSubmitButton';
import InputWithoutBorder from '@/components/Inputs/InputWithoutBorder/InputWithoutBorder';
import InputColorPicker from '@/components/Inputs/InputColorPicker/InputColorPicker';
import ResourceSample1 from '@/assets/images/Resource-Sample-3.jpg';

import TagService from '@/api/tag/TagService';
import { useApi } from '@/api/ApiHandler';

import { InputValidation } from '@/modules/inputValidation/types';
import { CreateTagData } from '@/modules/tag/types';

const AddTagForm = () => {
  const noError: InputValidation = { isError: false, errorHelperText: '' };

  // react hooks
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tagName, setTagName] = useState<string>('');
  const [tagError, setTagError] = useState<InputValidation>(noError);
  const [colorCode, setColorCode] = useState<string>('#553bd3');

  // useApi hook
  const [createTag] = useApi((data: CreateTagData) => TagService.createTag(data ?? null), true, true);

  // useHistory hook
  const history = useHistory();

  // helper functions
  const updateColorHandler = (colorCode: string): void => {
    setColorCode(colorCode);
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
  const handleCreateResource = async () => {
    try {
      setIsLoading(true);
      formValidation();

      const tagData: CreateTagData = {
        name: tagName,
        colour: colorCode,
      };

      const sendReq = await createTag(tagData);

      if (sendReq.isSuccess) {
        history.push('/addResource');
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  return (
    <>
      <Stack direction='row' className='w-screen justify-start'>
        <Stack className='addRoomLaptop:w-2/3 w-screen py-10 px-24' spacing={2}>
          <FormHeader title='Add Tag' disableUpload />

          <Grid className='w-full' container>
            <Grid item className='w-1/2'>
              <Stack spacing={2}>
                <InputWithoutBorder
                  inputHandleOnChange={input => setTagName(input.target.value)}
                  inputValue={tagName}
                  labelText='Tag Name'
                  inputPlaceholder='Add the tag name'
                  inputValidation={tagError}
                  inputType='text'
                  inputClassName='rounded-xl w-3/4 bg-bgGray focus-within:bg-bgWhite'
                  required={true}
                />

                <FormSubmitButton
                  buttonClassName='w-56 h-16 bg-dulwichRed rounded-xl text-bgWhite font-inter'
                  buttonText='Add Tag'
                  handleOnClick={handleCreateResource}
                  loading={isLoading}
                />
              </Stack>
            </Grid>
            <Grid item className='w-1/2'>
              <InputColorPicker
                inputClassName='rounded-xl w-3/4 bg-bgGray focus-within:bg-bgWhite '
                inputHandleOnChange={updateColorHandler}
                inputValue={colorCode}
                pickerClassName='w-3/4'
                required
              />
            </Grid>
          </Grid>

          <Stack direction='row' spacing={5} className='z-0'></Stack>
        </Stack>
        <img className='hidden w-1/3 h-screen float-right object-cover addRoomLaptop:block' src={ResourceSample1} />
      </Stack>
    </>
  );
};

export default AddTagForm;
