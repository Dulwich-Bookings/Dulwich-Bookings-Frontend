import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Stack, Grid } from '@mui/material';

import TagInput from '@/components/AddResource/Forms/TagInput/TagInput';
import InputCheckBox from '@/components/Inputs/InputCheckBox/InputCheckBox';
import OtherUserInput from '@/components/AddResource/Forms/OtherUserInput/OtherUserInput';
import FormHeader from '@components/AddResource/FormHeader/FormHeader';
import TemplateSubmitButton from '@/components/AddResource/Forms/TemplateSubmitButton/TemplateSubmitButton';
import FormSubmitButton from '@/components/AddResource/Forms/FormSubmitButton/FormSubmitButton';
import InputWithoutBorder from '@/components/Inputs/InputWithoutBorder/InputWithoutBorder';
import InputDatePicker from '@/components/Inputs/InputDatePicker/InputDatePicker';
import ResourceSample1 from '@/assets/images/Resource-Sample-2.png';

import SubscriptionService from '@/api/subscription/SubscriptionService';
import { useApi } from '@/api/ApiHandler';

import { role } from '@/consts/constants';
import { InputValidation } from '@/modules/inputValidation/types';
import { CreateSubscriptionData } from '@/modules/subscription/types';
import { TagData } from '@/modules/tag/types';
import { Role, UserData } from '@/modules/user/types';
import DateTime from '@/modules/DateTime/DateTime';

type Props = {
  tagData: TagData[];
  userData: UserData[];
};

const AddSubscriptionForm = (props: Props) => {
  const noError: InputValidation = { isError: false, errorHelperText: '' };

  // react hooks
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [subscriptionName, setSubscriptionName] = useState<string>('');
  const [subscriptionError, setSubscriptionError] = useState<InputValidation>(noError);
  const [description, setDescription] = useState<string>('');
  const [descriptionError, setDescriptionError] = useState<InputValidation>(noError);
  const [credentials, setCredentials] = useState<string>('');
  const [credentialsError, setCredentialsError] = useState<InputValidation>(noError);
  const [accessRights, setAccessRights] = useState<Role[]>([]);
  const [accessOptions, setAccessOptions] = useState({ option1: false, option2: false });
  const [accessError, setAccessError] = useState<InputValidation>(noError);
  const [selectedTags, setSelectedTags] = useState<TagData[]>([]);
  const [selectedOtherUsers, setSelectedOtherUsers] = useState<UserData[]>([]);
  const [expiryDate, setExpiryDate] = useState<Date>(new Date());
  const [linkURL, setLinkURL] = useState<string>('');
  const [templateFormName, setTemplateFormName] = useState<string>('');

  // useApi hook
  const [createSubscription] = useApi((data: CreateSubscriptionData) => SubscriptionService.createSubscription(data ?? null), true, true);

  // useHistory hook
  const history = useHistory();

  // helper functions
  const updateCredentialsHandler = (value: string): void => {
    setCredentials(value);
  };

  const updateTagHandler = (data: TagData[]): void => {
    setSelectedTags(data);
  };

  const updateUserHandler = (data: UserData[]): void => {
    setSelectedOtherUsers(data);
  };

  const updateARHandler = (option1: boolean, option2: boolean): void => {
    const arr: Role[] = [role.ADMIN];
    let options = { option1: false, option2: false };
    setAccessOptions({ option1: false, option2: false });

    if (option1) {
      arr.push(role.STUDENT, role.TEACHER);
      options = { option1: true, option2: true };
    }

    if (option2) {
      if (arr.indexOf(role.TEACHER) < 0) {
        arr.push(role.TEACHER);
      }
      options = { ...options, option2: true };
    }

    setAccessOptions(options);
    setAccessRights(arr);
  };

  const updateDateHandler = (date: Date | null): void => {
    if (date === null) {
      return;
    }

    setExpiryDate(date);
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

    const isValidName = subscriptionName.length !== 0;
    const isValidDescription = description.length !== 0;
    const isValidCredentials = credentials.length !== 0;
    // by default role.ADMIN has access
    const isValidAccessRights = accessRights.filter(d => d).length > 1;

    setSubscriptionError(isValidName ? noError : errorObj);
    setDescriptionError(isValidDescription ? noError : errorObj);
    setCredentialsError(isValidCredentials ? noError : errorObj);

    setAccessError(isValidAccessRights ? noError : errorObj);

    if (!isValidName || !isValidDescription || !isValidCredentials || !isValidAccessRights) {
      throw new Error('Form Invalid');
    }
  };

  // Create Resource Data from API
  const handleCreateResource = async () => {
    try {
      setIsLoading(true);
      formValidation();

      const subscriptionData: CreateSubscriptionData = {
        subscription: {
          name: subscriptionName,
          description: description,
          accessRights: accessRights,
          credentials: credentials,
          expiry: DateTime.newDateTimeFromDate(expiryDate),
          // hard coded values will be changed subsequently in the future
          remindMe: true,
          link: linkURL,
        },
        tags: selectedTags.map(tag => tag.id),
        users: selectedOtherUsers.map(user => user.id),
      };

      const sendReq = await createSubscription(subscriptionData);

      if (sendReq.isSuccess) {
        history.push('/home');
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
          <FormHeader title='Add Subscription' disableUpload={false} />

          <Grid item className='w-1/2'>
            <InputWithoutBorder
              inputHandleOnChange={input => setSubscriptionName(input.target.value)}
              inputValue={subscriptionName}
              labelText='Name'
              inputPlaceholder='Add the subscription name'
              inputValidation={subscriptionError}
              inputType='text'
              inputClassName='rounded-xl w-3/4 bg-bgGray focus-within:bg-bgWhite'
              required={true}
            />
          </Grid>

          <InputWithoutBorder
            inputSize='small'
            inputHandleOnChange={input => setDescription(input.target.value)}
            inputValue={description}
            labelText='Description'
            labelClassName='text-[#404040] text-xl font-inter'
            inputPlaceholder='Add the subscription description'
            inputType='text'
            inputValidation={descriptionError}
            inputClassName='bg-bgGray w-full rounded-xl focus-within:bg-bgWhite'
            inputRow={3}
            multiline={true}
            required={true}
          />

          <InputWithoutBorder
            inputSize='small'
            inputHandleOnChange={input => updateCredentialsHandler(input.target.value)}
            inputValue={credentials}
            labelText='Credentials'
            labelClassName='text-[#404040] text-xl font-inter'
            inputPlaceholder='Add the credentials'
            inputType='text'
            inputValidation={credentialsError}
            inputClassName='bg-bgGray w-full rounded-xl focus-within:bg-bgWhite'
            inputRow={3}
            multiline={true}
            required={true}
          />

          <Grid container>
            <TagInput inputClassName='w-1/2' tags={props.tagData} updateTags={updateTagHandler} />

            <OtherUserInput inputClassName='w-1/2 pl-[70px] relative' userData={props.userData} updateUsers={updateUserHandler} />
          </Grid>

          <Grid container>
            <Grid item className='w-1/2'>
              <InputDatePicker
                labelText='Expiry date'
                inputValue={expiryDate}
                inputFormat='MM/dd/yyyy'
                inputClassName='rounded-xl w-1/2 bg-bgGray focus-within:bg-bgWhite caret-transparent'
                inputHandleOnChange={input => updateDateHandler(input)}
              />
            </Grid>
            <Grid item className='w-1/2 pl-[70px]'>
              <InputWithoutBorder
                inputHandleOnChange={input => setLinkURL(input.target.value)}
                inputValue={linkURL}
                labelText='Link'
                inputPlaceholder='Add the link'
                inputType='text'
                inputClassName='rounded-xl w-80 bg-bgGray focus-within:bg-bgWhite'
              />
            </Grid>
          </Grid>

          <Grid container className='z-0'>
            <InputCheckBox
              inputClassName='w-1/2'
              labelText='Access Rights'
              inputLabelText={['Student', 'Teacher']}
              inputValue={accessOptions}
              inputHandleOnChange={updateARHandler}
              inputValidation={accessError}
              required
            />
          </Grid>

          <Stack direction='row' spacing={5} className='z-0'>
            <FormSubmitButton
              buttonClassName='w-64 h-16 bg-dulwichRed rounded-xl text-bgWhite font-inter'
              buttonText='Add Subscription'
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

export default AddSubscriptionForm;
