import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Stack, Grid } from '@mui/material';

import TagInput from '@components/AddResource/AddRoomForm/TagInput/TagInput';
import InputCheckBox from '@/components/Inputs/InputCheckBox/InputCheckBox';
import OtherUserInput from '@components/AddResource/AddRoomForm/OtherUserInput/OtherUserInput';
import FormHeader from '@components/AddResource/FormHeader/FormHeader';
import TemplateSubmitButton from '@/components/AddResource/AddRoomForm/TemplateSubmitButton/TemplateSubmitButton';
import FormSubmitButton from '@/components/AddResource/AddRoomForm/FormSubmitButton/FormSubmitButton';
import InputWithoutBorder from '@/components/Inputs/InputWithoutBorder/InputWithoutBorder';
import InputWithRadio from '@/components/Inputs/InputWithRadio/InputWithRadio';
import ResourceSample1 from '@/assets/images/Resource-Sample-1.jpg';

import ResourceService from '@/api/resource/ResourceService';
import { useApi } from '@/api/ApiHandler';

import { role } from '@/consts/constants';
import { InputValidation } from '@/modules/inputValidation/types';
import { CreateResourceData } from '@/modules/resource/types';
import { TagData } from '@/modules/tag/types';
import { Role, UserData } from '@/modules/user/types';

type Props = {
  tagData: TagData[];
  userData: UserData[];
};

const AddRoomForm = (props: Props) => {
  const noError: InputValidation = { isError: false, errorHelperText: '' };

  // react hooks
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [roomName, setRoomName] = useState<string>('');
  const [roomError, setRoomError] = useState<InputValidation>(noError);
  const [descriptionError, setDescriptionError] = useState<InputValidation>(noError);
  const [description, setDescription] = useState<string>('');
  const [weekProfile, setWeekProfile] = useState<'Weekly' | 'BiWeekly'>('Weekly');
  const [accessRights, setAccessRights] = useState<Role[]>([]);
  const [accessError, setAccessError] = useState<InputValidation>(noError);
  const [bookingRights, setBookingRights] = useState<Role[]>([]);
  const [bookingError, setBookingError] = useState<InputValidation>(noError);
  const [selectedTags, setSelectedTags] = useState<TagData[]>([]);
  const [selectedOtherUsers, setSelectedOtherUsers] = useState<UserData[]>([]);
  const [templateFormName, setTemplateFormName] = useState<string>('');

  // useApi hook
  const [createResource] = useApi((data: CreateResourceData) => ResourceService.createResource(data ?? null), true, true);

  // useHistory hook
  const history = useHistory();

  // helper functions
  const weekProfileChangeHandler = (value: string): void => {
    if (value === 'Weekly') {
      setWeekProfile('Weekly');
    } else {
      setWeekProfile('BiWeekly');
    }
  };

  const updateTagHandler = (data: TagData[]): void => {
    setSelectedTags(data);
  };

  const updateUserHandler = (data: UserData[]): void => {
    setSelectedOtherUsers(data);
  };

  const updateARHandler = (option1: boolean, option2: boolean): void => {
    const arr: Role[] = [role.ADMIN];
    if (option1) {
      arr.push(role.STUDENT);
    }
    if (option2) {
      arr.push(role.TEACHER);
    }
    setAccessRights(arr);
  };

  const updateBRHandler = (option1: boolean, option2: boolean): void => {
    const arr: Role[] = [role.ADMIN];
    if (option1) {
      arr.push(role.STUDENT);
    }
    if (option2) {
      arr.push(role.TEACHER);
    }
    setBookingRights(arr);
  };

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
    const isValidAccessRights = accessRights.filter(d => d).length > 1;
    const isValidBookingRights = bookingRights.filter(d => d).length > 1;
    const isValidDescription = description.length !== 0;

    setRoomError(isValidRoomName ? noError : errorObj);
    setAccessError(isValidAccessRights ? noError : errorObj);
    setBookingError(isValidBookingRights ? noError : errorObj);
    setDescriptionError(isValidDescription ? noError : errorObj);

    if (!isValidRoomName || !isValidAccessRights || !isValidBookingRights || !isValidDescription) {
      throw new Error('Form Invalid');
    }
  };

  // Create Resource Data from API
  const handleCreateResource = async () => {
    try {
      setIsLoading(true);
      formValidation();

      const resourceData: CreateResourceData = {
        resource: {
          name: roomName,
          description: description,
          accessRights: accessRights,
          bookingRights: bookingRights,
          weekProfile: weekProfile,
          // hard coded values will be changed subsequently in the future
          inAdvance: 0,
          isBookingDescriptionOptional: true,
        },
        tags: selectedTags.map(tag => tag.id),
        users: selectedOtherUsers.map(user => user.id),
      };
      const status = await createResource(resourceData);
      setIsLoading(false);
      if (status.isSuccess) {
        history.push('/home');
      }
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  return (
    <>
      <Stack direction='row' className='w-screen justify-start'>
        <Stack className='addRoomLaptop:w-2/3 w-screen py-10 px-24' spacing={2}>
          <FormHeader title='Add Room' />

          <Grid container>
            <Grid item className='w-1/2'>
              <InputWithoutBorder
                inputHandleOnChange={input => setRoomName(input.target.value)}
                inputValue={roomName}
                labelText='Room Name'
                inputPlaceholder='Add the room name'
                inputValidation={roomError}
                inputType='text'
                inputClassName='rounded-xl w-3/4 bg-bgGray focus-within:bg-bgWhite'
                required={true}
              />
            </Grid>
            <Stack className='w-1/2 px-[70px]'>
              <InputWithRadio
                labelText='Week Profile'
                inputLabels={['Weekly', 'Bi-Weekly']}
                inputHandleOnChange={input => weekProfileChangeHandler(input.target.value)}
                required
              />
            </Stack>
          </Grid>

          <InputWithoutBorder
            inputSize='small'
            inputHandleOnChange={input => setDescription(input.target.value)}
            inputValue={description}
            labelText='Description'
            labelClassName='text-bgDarkGray text-xl font-inter'
            inputPlaceholder='Add the room name'
            inputType='text'
            inputValidation={descriptionError}
            inputClassName='bg-bgGray w-full rounded-xl focus-within:bg-bgWhite'
            inputRow={3}
            multiline={true}
            required={true}
          />

          <Grid container className='z-10'>
            <TagInput inputClassName='w-1/2' tags={props.tagData} updateTags={updateTagHandler} />
            <OtherUserInput inputClassName='w-1/2 pl-[70px]' userData={props.userData} updateUsers={updateUserHandler} />
          </Grid>

          <Grid container className='z-0'>
            <InputCheckBox
              inputClassName='w-1/2'
              labelText='Access Rights'
              inputLabelText={['Student', 'Teacher']}
              inputHandleOnChange={updateARHandler}
              inputValidation={accessError}
              required
            />
            <InputCheckBox
              inputClassName='w-1/2 px-[70px]'
              labelText='Booking Rights'
              inputLabelText={['Student', 'Teacher']}
              inputHandleOnChange={updateBRHandler}
              inputValidation={bookingError}
              required
            />
          </Grid>

          <Stack direction='row' spacing={5} className='z-0'>
            <FormSubmitButton buttonText='Add Room' handleOnClick={handleCreateResource} loading={isLoading} />
            <TemplateSubmitButton buttonText='Upload Template' helperText={templateFormName} handleOnClick={handleUploadTemplate} />
          </Stack>
        </Stack>
        <img className='hidden w-1/3 h-screen float-right object-cover addRoomLaptop:block' src={ResourceSample1} />
      </Stack>
    </>
  );
};

export default AddRoomForm;
