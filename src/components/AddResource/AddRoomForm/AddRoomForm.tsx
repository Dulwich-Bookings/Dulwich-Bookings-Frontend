import React, { useState } from 'react';
import { Stack, Grid } from '@mui/material';

import { TagData } from '@/modules/tag/types';
import { Role, UserData } from '@/modules/user/types';
import { useHistory } from 'react-router-dom';
import ResourceSample1 from '@/assets/images/Resource-Sample-1.jpg';

import { InputValidation } from '@/modules/inputValidation/types';
import InputWithoutBorder from '@/components/Inputs/InputWithoutBorder/InputWithoutBorder';
import InputWithRadio from '@/components/Inputs/InputWithRadio/InputWithRadio';

import { role } from '@/consts/constants';
import { CreateResourceData } from '@/modules/resource/types';
import ResourceService from '@/api/resource/ResourceService';
import { useApi } from '@/api/ApiHandler';
import FormSubmitButton from './FormSubmitButton/FormSubmitButton';
import TemplateSubmitButton from './TemplateSubmitButton/TemplateSubmitButton';
import FormHeader from '../FormHeader/FormHeader';
import TagInput from './TagInput/TagInput';
import OtherUserInput from './OtherUserInput/OtherUserInput';
import InputCheckBox from '@/components/Inputs/InputCheckBox/InputCheckBox';

type Props = {
  tagData: TagData[];
  userData: UserData[];
};

const AddRoom = (props: Props) => {
  const noError: InputValidation = { isError: false, errorHelperText: '' };
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [roomName, setRoomName] = useState<string>('');
  const [roomError, setRoomError] = useState<InputValidation>(noError);

  const [description, setDescription] = useState<string>('');

  const [weekProfile, setWeekProfile] = useState<'Weekly' | 'BiWeekly'>('Weekly');

  const [accessRights, setAccessRights] = useState<Role[]>([]);
  const [accessError, setAccessError] = useState<InputValidation>(noError);

  const [bookingRights, setBookingRights] = useState<Role[]>([]);
  const [bookingError, setBookingError] = useState<InputValidation>(noError);

  const [selectedTags, setSelectedTags] = useState<TagData[]>([]);
  const [selectedOtherUsers, setSelectedOtherUsers] = useState<UserData[]>([]);

  const [templateFormName, setTemplateFormName] = useState<string>('');

  const [createResource] = useApi((data: CreateResourceData) => ResourceService.createResource(data ?? null), true, true);

  const history = useHistory();

  // const handleRightsToArray = (teacher: boolean, student: boolean): Role[] => {
  //   const arr: Role[] = [role.ADMIN];

  //   if (teacher) {
  //     arr.push(role.TEACHER);
  //   }
  //   if (student) {
  //     arr.push(role.STUDENT);
  //   }

  //   return arr;
  // };

  const handleUploadTemplate = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (!file) {
      return;
    }
    const message: string = 'Successfully uploaded ' + file.name;
    setTemplateFormName(message);
  };

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

  const formValidation = () => {
    const errorText = 'Field Cannot be Empty';
    const errorObj: InputValidation = {
      isError: true,
      errorHelperText: errorText,
    };

    const isValidRoomName = roomName.length !== 0;
    const isValidAccessRights = accessRights.filter(d => d).length > 1;
    const isValidBookingRights = bookingRights.filter(d => d).length > 1;

    setRoomError(isValidRoomName ? noError : errorObj);
    setAccessError(isValidAccessRights ? noError : errorObj);
    setBookingError(isValidBookingRights ? noError : errorObj);

    if (!isValidRoomName || !isValidAccessRights || !isValidBookingRights) {
      throw new Error('Form Invalid');
    }
  };

  const handleCreateResource = () => {
    try {
      setIsLoading(true);
      formValidation();

      const resourceData: CreateResourceData = {
        resource: {
          name: roomName,
          description: description === '' ? 'N/A' : description,
          accessRights: [],
          bookingRights: [],
          // hard coded values will be changed subsequently in the future
          inAdvance: 0,
          isBookingDescriptionOptional: true,
          weekProfile: weekProfile,
        },
        tags: selectedTags.map(tag => tag.id),
        users: selectedOtherUsers.map(user => user.id),
      };
      console.log(resourceData);
      createResource(resourceData);
      setIsLoading(false);
      history.push('/home');
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  return (
    <>
      <Stack direction='row' className='w-screen justify-start'>
        <Stack className='lg:w-2/3 py-10 px-24' spacing={2}>
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
            labelClassName='text-[#404040] text-xl font-inter'
            inputPlaceholder='Add the room name'
            inputType='text'
            inputClassName='bg-bgGray w-full rounded-xl focus-within:bg-bgWhite'
            inputRow={3}
            multiline={true}
          />

          <Grid container>
            <TagInput inputClassName='w-3/12' tags={props.tagData} updateTags={updateTagHandler} />
            <OtherUserInput inputClassName='w-1/2 pl-[70px]' userData={props.userData} updateUsers={updateUserHandler} />
          </Grid>

          <Stack>
            <Stack direction='row'>
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
            </Stack>
          </Stack>

          <Stack>
            <Stack direction='row' spacing={5}>
              <FormSubmitButton buttonText='Add Room' handleOnClick={handleCreateResource} loading={isLoading} />
              <TemplateSubmitButton buttonText='Upload Template' helperText={templateFormName} handleOnClick={handleUploadTemplate} />
            </Stack>
          </Stack>
        </Stack>
        <img className='hidden w-1/3 h-screen float-right object-cover lg:block' src={ResourceSample1} />
      </Stack>
    </>
  );
};

export default AddRoom;
