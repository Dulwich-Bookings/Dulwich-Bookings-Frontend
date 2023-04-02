import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import ResourceService from '@/api/resource/ResourceService';
import { isSuccess, useApi } from '@/api/ApiHandler';
import { ApiData } from '@/api/ApiService';

import BackButton from '@/components/AddResource/BackButton/BackButton';
import TagInput from '@/components/AddResource/Forms/TagInput/TagInput';
import InputCheckBox from '@/components/Inputs/InputCheckBox/InputCheckBox';
import OtherUserInput from '@/components/AddResource/Forms/OtherUserInput/OtherUserInput';
import FormHeader from '@components/AddResource/FormHeader/FormHeader';
import TemplateSubmitButton from '@/components/AddResource/Forms/TemplateSubmitButton/TemplateSubmitButton';
import FormSubmitButton from '@/components/AddResource/Forms/FormSubmitButton/FormSubmitButton';
import InputWithoutBorder from '@/components/Inputs/InputWithoutBorder/InputWithoutBorder';
import InputWithRadio from '@/components/Inputs/InputWithRadio/InputWithRadio';
import DialogWrapper from '@/components/Dialog/DialogWrapper/DialogWrapper';
import { Stack, Grid } from '@mui/material';

import { role } from '@/consts/constants';
import { InputValidation } from '@/modules/inputValidation/types';
import { CreateResourceData, ResourceData, ResourcePutData } from '@/modules/resource/types';
import { TagData } from '@/modules/tag/types';
import { Role, UserData } from '@/modules/user/types';
import { ResourceMapData } from '@/modules/resourceMap/types';

type Props = {
  formClassName?: string; //Optional to style the form size
  tagData: TagData[];
  userData: UserData[];
  resourceMapData?: ResourceMapData[];
  oldFormData?: ResourceData;
  oldFormTags?: TagData[];
  oldFormUsers?: UserData[];
  editMode: boolean;
  closeEditForm: () => void;
};

const AddRoomForm = (props: Props) => {
  const noError: InputValidation = { isError: false, errorHelperText: '' };
  const { oldFormData: oldData, oldFormTags: oldTags, oldFormUsers: oldUsers } = props;

  // react hooks
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [roomName, setRoomName] = useState<string>(oldData?.name ?? '');
  const [roomError, setRoomError] = useState<InputValidation>(noError);
  const [description, setDescription] = useState<string>(oldData?.description ?? '');
  const [descriptionError, setDescriptionError] = useState<InputValidation>(noError);
  const [weekProfile, setWeekProfile] = useState<'Weekly' | 'Bi-Weekly'>(
    (oldData?.weekProfile === 'BiWeekly' ? 'Bi-Weekly' : oldData?.weekProfile) ?? 'Weekly',
  );
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
  const [bookingOptions, setBookingOptions] = useState(
    (oldData?.bookingRights && {
      option1: oldData.bookingRights.indexOf(role.STUDENT) > -1,
      option2: oldData.bookingRights.indexOf(role.TEACHER) > -1,
    }) ?? {
      option1: false,
      option2: false,
    },
  );
  const [bookingError, setBookingError] = useState<InputValidation>(noError);
  const [selectedTags, setSelectedTags] = useState<TagData[]>(oldTags ?? []);
  const [selectedOtherUsers, setSelectedOtherUsers] = useState<UserData[]>(oldUsers ?? []);
  const [templateFormName, setTemplateFormName] = useState<string>('');
  const [showDialog, setShowDialog] = useState<boolean>(false);

  // useApi hook
  const [createResource] = useApi((data: CreateResourceData) => ResourceService.createResource(data ?? null), true, true);
  const [updateResource] = useApi(
    (data: ResourcePutData) => ResourceService.updateResourceById(oldData?.id ?? -1, data ?? null),
    true,
    true,
  );
  const [deleteResource] = useApi((data: number) => ResourceService.deleteResourceById(data ?? -1), true, true);

  // useHistory hook
  const history = useHistory();

  // helper functions
  const weekProfileChangeHandler = (value: string): void => {
    if (value === 'Weekly') {
      setWeekProfile('Weekly');
    } else {
      setWeekProfile('Bi-Weekly');
    }
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

  const updateBRHandler = (option1: boolean, option2: boolean): void => {
    let options = { option1: false, option2: false };
    if (option1) {
      options = { option1: true, option2: true };
    }
    if (option2) {
      options = { ...options, option2: true };
    }
    setBookingOptions(options);
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

  const handleUploadTemplate = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (!file) {
      return;
    }
    const message: string = 'Successfully uploaded ' + file.name;
    setTemplateFormName(message);
  };

  const handleShowDialog = () => {
    setShowDialog(true);
  };

  const handleHideDialog = () => {
    setShowDialog(false);
  };

  const formValidation = () => {
    const errorText = 'Field Cannot be Empty';
    const errorObj: InputValidation = {
      isError: true,
      errorHelperText: errorText,
    };

    const isValidRoomName = roomName.length !== 0;
    // by default role.ADMIN has access
    const isValidAccessRights = accessOptions.option1 || accessOptions.option2;
    const isValidBookingRights = bookingOptions.option1 || bookingOptions.option2;
    const isValidDescription = description.length !== 0;

    setRoomError(isValidRoomName ? noError : errorObj);
    setAccessError(isValidAccessRights ? noError : errorObj);
    setBookingError(isValidBookingRights ? noError : errorObj);
    setDescriptionError(isValidDescription ? noError : errorObj);

    if (!isValidRoomName || !isValidAccessRights || !isValidBookingRights || !isValidDescription) {
      throw new Error('Form Invalid');
    }
  };

  // Create/Update Resource Data from API
  const handleCreateResource = async () => {
    try {
      setIsLoading(true);
      formValidation();

      const accessRights: Role[] = [role.ADMIN];
      const bookingRights: Role[] = [role.ADMIN];

      const resourceData: CreateResourceData = {
        resource: {
          name: roomName,
          description: description,
          accessRights: optionsToArrayHandler(accessOptions.option1, accessOptions.option2, accessRights),
          bookingRights: optionsToArrayHandler(bookingOptions.option1, bookingOptions.option2, bookingRights),
          weekProfile: weekProfile === 'Weekly' ? 'Weekly' : 'BiWeekly',
          // hard coded values will be changed subsequently in the future
          inAdvance: 0,
          isBookingDescriptionOptional: true,
        },
        tags: selectedTags.map(tag => tag.id),
        users: selectedOtherUsers.map(user => user.id),
      };

      let sendReq: ApiData<CreateResourceData | ResourcePutData> & isSuccess;

      if (!props.editMode) {
        sendReq = await createResource(resourceData);
      } else {
        sendReq = await updateResource(resourceData);
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

  const handleDeleteResource = async () => {
    const sendReq = await deleteResource(oldData?.id);
    if (sendReq.isSuccess) {
      props.closeEditForm();
    }
  };

  useEffect(() => {
    setRoomName(oldData?.name ?? '');
    setDescription(oldData?.description ?? '');
    setWeekProfile((oldData?.weekProfile === 'BiWeekly' ? 'Bi-Weekly' : oldData?.weekProfile) ?? 'Weekly');
    setSelectedTags(oldTags ?? []);
    setSelectedOtherUsers(oldUsers ?? []);
    setAccessOptions(
      (oldData?.accessRights && {
        option1: oldData.accessRights.indexOf(role.STUDENT) > -1,
        option2: oldData.accessRights.indexOf(role.TEACHER) > -1,
      }) ?? {
        option1: false,
        option2: false,
      },
    );
    setBookingOptions(
      (oldData?.bookingRights && {
        option1: oldData.bookingRights.indexOf(role.STUDENT) > -1,
        option2: oldData.bookingRights.indexOf(role.TEACHER) > -1,
      }) ?? {
        option1: false,
        option2: false,
      },
    );
  }, [oldData, oldTags, oldUsers]);

  return (
    <>
      <Stack className={`addRoomLaptop:w-full w-screen py-10 px-24 ${props.formClassName}`} spacing={2}>
        {!props.editMode && <FormHeader title='Add Room' disableUpload={false} />}
        {props.editMode && <BackButton buttonText='Back' onClickHandler={props.closeEditForm} />}
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
              inputValue={weekProfile}
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
          labelClassName='text-textGray text-xl font-inter'
          inputPlaceholder='Add the room description'
          inputType='text'
          inputValidation={descriptionError}
          inputClassName='bg-bgGray w-full rounded-xl focus-within:bg-bgWhite'
          inputRow={3}
          multiline={true}
          required={true}
        />

        <Grid container className='z-10'>
          <TagInput inputClassName='w-1/2' tags={props.tagData} oldTags={oldTags} updateTags={updateTagHandler} />
          <OtherUserInput inputClassName='w-1/2 pl-[70px]' userData={props.userData} oldUsers={oldUsers} updateUsers={updateUserHandler} />
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
          <InputCheckBox
            inputClassName='w-1/2 px-[70px]'
            labelText='Booking Rights'
            inputLabelText={['Student', 'Teacher']}
            inputValue={bookingOptions}
            inputHandleOnChange={updateBRHandler}
            inputValidation={bookingError}
            required
          />
        </Grid>

        <Stack direction='row' spacing={5} className='z-0'>
          <FormSubmitButton
            buttonClassName='w-56 h-16 bg-dulwichRed rounded-xl text-bgWhite font-inter'
            buttonText={`${(props.editMode && 'Update Room') || (!props.editMode && 'Add Room')}`}
            handleOnClick={handleCreateResource}
            loading={isLoading}
          />
          {!props.editMode && (
            <TemplateSubmitButton
              buttonClassName='w-72 h-16 bg-dulwichRed rounded-xl text-bgWhite font-inter'
              buttonText='Upload Template'
              helperText={templateFormName}
              handleOnClick={handleUploadTemplate}
            />
          )}
          {props.editMode && (
            <>
              <FormSubmitButton
                buttonClassName='w-56 h-16 bg-dulwichRed rounded-xl text-bgWhite font-inter'
                buttonText={`Delete Room`}
                handleOnClick={handleShowDialog}
                loading={isLoading}
              />

              <DialogWrapper
                isOpen={showDialog}
                handleClose={handleHideDialog}
                handleSubmit={handleDeleteResource}
                title='Confirm Delete Resource?'
                textBody='Deleting the Resource will be invertible. Do you wish to continue?'
                buttonOneText='Close'
                buttonTwoText='Delete'
              />
            </>
          )}
        </Stack>
      </Stack>
    </>
  );
};

export default AddRoomForm;
