import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import SubscriptionService from '@/api/subscription/SubscriptionService';
import { isSuccess, useApi } from '@/api/ApiHandler';
import { ApiData } from '@/api/ApiService';

import TagInput from '@/components/AddResource/Forms/TagInput/TagInput';
import InputCheckBox from '@/components/Inputs/InputCheckBox/InputCheckBox';
import OtherUserInput from '@/components/AddResource/Forms/OtherUserInput/OtherUserInput';
import FormHeader from '@components/AddResource/FormHeader/FormHeader';
import FormSubmitButton from '@/components/AddResource/Forms/FormSubmitButton/FormSubmitButton';
import InputWithoutBorder from '@/components/Inputs/InputWithoutBorder/InputWithoutBorder';
import InputDatePicker from '@/components/Inputs/InputDatePicker/InputDatePicker';
import { Stack, Grid } from '@mui/material';

import { InputValidation } from '@/modules/inputValidation/types';
import { CreateSubscriptionData, SubscriptionData, SubscriptionPutData } from '@/modules/subscription/types';
import { TagData } from '@/modules/tag/types';
import { Role, UserData } from '@/modules/user/types';
import DateTime from '@/modules/DateTime/DateTime';
import { ResourceMapData } from '@/modules/resourceMap/types';
import { role } from '@/consts/constants';

type Props = {
  formClassName?: string; //Optional to style the form size
  tagData: TagData[];
  userData: UserData[];
  resourceMapData?: ResourceMapData[];
  oldFormData?: SubscriptionData;
  oldFormTags?: TagData[];
  oldFormUsers?: UserData[];
  editMode: boolean;
  closeEditForm: () => void;
};

const AddSubscriptionForm = (props: Props) => {
  const noError: InputValidation = { isError: false, errorHelperText: '' };
  const { oldFormData: oldData, oldFormTags: oldTags, oldFormUsers: oldUsers } = props;

  // react hooks
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [subscriptionName, setSubscriptionName] = useState<string>(oldData?.name ?? '');
  const [subscriptionError, setSubscriptionError] = useState<InputValidation>(noError);
  const [description, setDescription] = useState<string>(oldData?.description ?? '');
  const [descriptionError, setDescriptionError] = useState<InputValidation>(noError);
  const [credentials, setCredentials] = useState<string>(oldData?.credentials ?? '');
  const [credentialsError, setCredentialsError] = useState<InputValidation>(noError);
  const [accessOptions, setAccessOptions] = useState(
    (oldData?.accessRights && {
      option1: oldData.accessRights.indexOf(role.STUDENT) > -1,
      option2: oldData.accessRights.indexOf(role.TEACHER) > -1,
    }) ?? {
      option1: false,
      option2: false,
    },
  );
  const [accessError, setAccessError] = useState<InputValidation>(noError);
  const [selectedTags, setSelectedTags] = useState<TagData[]>(oldTags ?? []);
  const [selectedOtherUsers, setSelectedOtherUsers] = useState<UserData[]>(oldUsers ?? []);
  const [expiryDate, setExpiryDate] = useState<Date>(oldData?.expiry?.toDate() ?? new Date());
  const [linkURL, setLinkURL] = useState<string>(oldData?.link ?? '');

  // useApi hook
  const [createSubscription] = useApi((data: CreateSubscriptionData) => SubscriptionService.createSubscription(data ?? null), true, true);
  const [updateSubscription] = useApi(
    (data: SubscriptionPutData) => SubscriptionService.updateSubscriptionById(oldData?.id ?? -1, data ?? null),
    true,
    true,
  );

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
    let options = { option1: false, option2: false };
    if (option1) {
      options = { option1: true, option2: true };
    }
    if (option2) {
      options = { ...options, option2: true };
    }
    setAccessOptions(options);
  };

  const optionsToArrayHandler = (option1: boolean, option2: boolean, arr: Role[]): Role[] => {
    if (option1) {
      arr.push(role.STUDENT);
    }
    if (option2) {
      arr.push(role.TEACHER);
    }
    return arr;
  };

  const updateDateHandler = (date: Date | null): void => {
    if (date === null) {
      return;
    }

    setExpiryDate(date);
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
    const isValidAccessRights = accessOptions.option1 || accessOptions.option2;

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

      const accessRights: Role[] = [role.ADMIN];

      const subscriptionData: CreateSubscriptionData = {
        subscription: {
          name: subscriptionName,
          description: description,
          accessRights: optionsToArrayHandler(accessOptions.option1, accessOptions.option2, accessRights),
          credentials: credentials,
          expiry: DateTime.newDateTimeFromDate(expiryDate),
          // hard coded values will be changed subsequently in the future
          remindMe: true,
          link: linkURL,
        },
        tags: selectedTags.map(tag => tag.id),
        users: selectedOtherUsers.map(user => user.id),
      };

      let sendReq: ApiData<CreateSubscriptionData | SubscriptionPutData> & isSuccess;

      if (!props.editMode) {
        sendReq = await createSubscription(subscriptionData);
      } else {
        sendReq = await updateSubscription(subscriptionData);
      }

      if (sendReq.isSuccess) {
        if (!props.editMode) {
          history.push('/home');
        }
        props.closeEditForm();
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  return (
    <>
      <Stack className={`addRoomLaptop:w-full w-screen py-10 px-24 ${props.formClassName}`} spacing={2}>
        {!props.editMode && <FormHeader title='Add Subscription' disableUpload={true} />}

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
          labelClassName='text-textGray text-xl font-inter'
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
          labelClassName='text-textGray text-xl font-inter'
          inputPlaceholder='Add the credentials'
          inputType='text'
          inputValidation={credentialsError}
          inputClassName='bg-bgGray w-full rounded-xl focus-within:bg-bgWhite'
          inputRow={3}
          multiline={true}
          required={true}
        />

        <Grid container>
          <TagInput inputClassName='w-1/2' tags={props.tagData} oldTags={oldTags} updateTags={updateTagHandler} />

          <OtherUserInput
            inputClassName='w-1/2 pl-[70px] relative'
            userData={props.userData}
            oldUsers={oldUsers}
            updateUsers={updateUserHandler}
          />
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
            buttonText={`${(props.editMode && 'Update Subscription') || (!props.editMode && 'Add Subscription')}`}
            handleOnClick={handleCreateResource}
            loading={isLoading}
          />
        </Stack>
      </Stack>
    </>
  );
};

export default AddSubscriptionForm;
