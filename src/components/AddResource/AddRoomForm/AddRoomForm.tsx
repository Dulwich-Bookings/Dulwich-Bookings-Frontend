import React, { useState } from 'react';
import {
  Stack,
  Typography,
  Button,
  FormControlLabel,
  Checkbox,
  FormGroup,
  ButtonGroup,
  Box,
  Grid,
  FormHelperText,
  FormControl,
} from '@mui/material';

import { TagData } from '@/modules/tag/types';
import { Role, UserData } from '@/modules/user/types';
import { useHistory } from 'react-router-dom';
import BackButton from '@components/AddResource/BackButton/BackButton';
import ResourceSample1 from '@/assets/images/Resource-Sample-1.jpg';
import TagChip from './TagChip/TagChip';
import UserChip from './UserChip/UserChip';

import { InputValidation } from '@/modules/inputValidation/types';
import InputWithoutBorder from '@/components/Inputs/InputWithoutBorder/InputWithoutBorder';
import InputWithRadio from '@/components/Inputs/InputWithRadio/InputWithRadio';

import { role } from '@/consts/constants';
import { CreateResourceData } from '@/modules/resource/types';
import ResourceService from '@/api/resource/ResourceService';
import { useApi } from '@/api/ApiHandler';
import FormSubmitButton from './FormSubmitButton/FormSubmitButton';
import TemplateSubmitButton from './TemplateSubmitButton/TemplateSubmitButton';

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

  const [accessRights, setAccessRights] = useState({ studentAccessRights: false, teacherAccessRights: false });
  const { studentAccessRights, teacherAccessRights } = accessRights;
  const [accessError, setAccessError] = useState<boolean>(false);

  const [bookingRights, setBookingRights] = useState({ studentBookingRights: false, teacherBookingRights: false });
  const { studentBookingRights, teacherBookingRights } = bookingRights;
  const [bookingError, setBookingError] = useState<boolean>(false);

  const [addOtherUsersValue, setOtherUsersInputValue] = useState('');
  const [filteredOtherUsers, setFilteredOtherUsers] = useState<UserData[]>([]);
  const [selectedOtherUsers, setSelectedOtherUsers] = useState<UserData[]>([]);

  const [tagInputValue, setTagInputValue] = useState('');
  const [filteredTags, setFilteredTags] = useState<TagData[]>([]);
  const [selectedTags, setSelectedTags] = useState<TagData[]>([]);
  const [showTags, setShowTags] = useState<boolean>(false);
  const [tagError, setTagError] = useState<InputValidation>(noError);

  const [templateFormName, setTemplateFormName] = useState<string>('');

  const [createResource] = useApi((data: CreateResourceData) => ResourceService.createResource(data ?? null), true, true);

  const history = useHistory();

  const handleRightsToArray = (teacher: boolean, student: boolean): Role[] => {
    const arr: Role[] = [role.ADMIN];

    if (teacher) {
      arr.push(role.TEACHER);
    }
    if (student) {
      arr.push(role.STUDENT);
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

  const userDelete = (userToDelete: number) => () => {
    setSelectedOtherUsers(selectedOtherUsers.filter(user => user.id !== userToDelete));
  };

  const tagDelete = (tagToDelete: number) => () => {
    setSelectedTags(selectedTags.filter(tag => tag.id !== tagToDelete));
  };

  const weekProfileChangeHandler = (value: string): void => {
    if (value === 'Weekly') {
      setWeekProfile('Weekly');
    } else {
      setWeekProfile('BiWeekly');
    }
  };

  const accessRightsHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAccessRights({ ...accessRights, [event.target.name]: event.target.checked });
  };

  const bookingRightsHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBookingRights({ ...bookingRights, [event.target.name]: event.target.checked });
  };

  const otherUsersChangeHandler = (input: string): void => {
    setOtherUsersInputValue(input);
    setFilteredOtherUsers(props.userData.filter(user => user.email.match(new RegExp(input, 'i'))));
    if (input.trim() === '') {
      setFilteredOtherUsers([]);
    }
  };

  const TagChangeHandler = (input: string): void => {
    setTagInputValue(input);
    setFilteredTags(props.tagData.filter(tag => tag.name.match(new RegExp(input, 'i'))));
    if (input.trim() === '') {
      setFilteredTags([]);
    }
  };

  const TagFocusHandler = (input: string) => {
    setFilteredTags(props.tagData.filter(tag => tag.name.match(new RegExp(input, 'i'))));
    setShowTags(true);
  };

  const TagBlurHandler = () => {
    setShowTags(false);
  };

  const returnResourcePage = () => {
    history.push('/addResource');
  };

  const formValidation = () => {
    const errorText = 'Field Cannot be Empty';
    const errorObj: InputValidation = {
      isError: true,
      errorHelperText: errorText,
    };

    const isValidRoomName = roomName.length !== 0;
    const isValidTag = selectedTags.length !== 0;
    const isValidAccessRights = [studentAccessRights, teacherAccessRights].filter(d => d).length > 0;
    const isValidBookingRights = [studentBookingRights, teacherBookingRights].filter(d => d).length >= 1;

    setRoomError(isValidRoomName ? noError : errorObj);
    setTagError(isValidTag ? noError : errorObj);
    setAccessError(isValidAccessRights ? false : true);
    setBookingError(isValidBookingRights ? false : true);

    if (!isValidRoomName || !isValidTag || !isValidAccessRights || !isValidBookingRights) {
      throw new Error('Form Invalid');
    }
  };

  const handleCreateResource = () => {
    try {
      setIsLoading(true);
      formValidation();
      const filteredAccessRights = handleRightsToArray(accessRights.teacherAccessRights, accessRights.studentAccessRights);
      const filteredBookingRights = handleRightsToArray(bookingRights.teacherBookingRights, bookingRights.studentBookingRights);

      const resourceData: CreateResourceData = {
        resource: {
          name: roomName,
          description: description,
          accessRights: filteredAccessRights,
          bookingRights: filteredBookingRights,
          // hard coded values will be changed subsequently in the future
          inAdvance: 0,
          isBookingDescriptionOptional: true,

          weekProfile: weekProfile,
        },
        tags: selectedTags.map(tag => tag.id),
        users: selectedOtherUsers.map(user => user.id),
      };
      createResource(resourceData);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  return (
    <>
      <Stack direction='row' className='w-screen justify-start'>
        <Stack className='lg:w-2/3 py-10 px-24' spacing={2}>
          <Stack>
            <Stack direction='row' alignItems='center'>
              <Stack spacing={2}>
                <Box onClick={returnResourcePage}>
                  <BackButton buttonName='Add Resource' />
                </Box>
                <Typography variant='h4' className='font-Inter'>
                  Add Room
                </Typography>
              </Stack>
              <div className='w-3/4'>
                <Button className='w-52 h-10 bg-[#808080] rounded-md text-bgWhite font-inter float-right'>Download Template</Button>
              </div>
            </Stack>
          </Stack>

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
            <Stack className='w-3/12'>
              <InputWithoutBorder
                inputHandleOnChange={input => TagChangeHandler(input.target.value)}
                inputHandleOnFocus={input => TagFocusHandler(input.target.value)}
                inputHandleOnBlur={event => event && TagBlurHandler()}
                inputValue={tagInputValue}
                labelText='Choose Tags'
                labelClassName='text-[#404040] text-xl font-inter'
                inputPlaceholder='Type to add tag'
                inputType='text'
                inputValidation={tagError}
                inputClassName='bg-bgGray rounded-xl w-full focus-within:bg-bgWhite'
                required
              />
              {showTags && (
                <ButtonGroup
                  orientation='vertical'
                  className='w-full shadow-lg rounded max-h-36 overflow-auto'
                  variant='contained'
                  disableElevation
                >
                  {filteredTags.map(tag => (
                    <Button
                      key={tag.id}
                      className='min-h-11 w-full border-bgWhite bg-bgWhite text-bgBlack hover:bg-dulwichRed hover:bg-opacity-10'
                      onMouseDown={() => {
                        if (selectedTags.filter(tags => tags.id === tag.id).length === 0) {
                          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                          setSelectedTags([...selectedTags!, props.tagData.find(tags => tags.id === tag.id)!]);
                        }
                        setTagInputValue('');
                        setFilteredTags([]);
                      }}
                    >
                      {tag.name}
                    </Button>
                  ))}
                </ButtonGroup>
              )}
            </Stack>
            <Grid container className={'pl-2 pt-12 w-3/12 max-h-40 overflow-auto pr-6'} spacing={1}>
              {selectedTags.map(tag => (
                <TagChip key={tag.id} tagData={tag} onDelete={tagDelete(tag.id)} />
              ))}
            </Grid>
            <Stack spacing={1} className='w-1/2 pl-[70px]'>
              <InputWithoutBorder
                inputHandleOnChange={input => otherUsersChangeHandler(input.target.value)}
                inputValue={addOtherUsersValue}
                labelText='Add Others'
                labelClassName='text-[#404040] text-xl font-inter'
                inputPlaceholder='name@dulwich.com'
                inputType='text'
                inputClassName='bg-bgGray rounded-xl w-full focus-within:bg-bgWhite'
              />
              <ButtonGroup
                orientation='vertical'
                className='w-full shadow-lg rounded max-h-36 overflow-auto'
                variant='contained'
                disableElevation
              >
                {filteredOtherUsers.map(user => (
                  <Button
                    key={user.id}
                    className='min-h-11 w-full border-bgWhite bg-bgWhite text-bgBlack hover:bg-dulwichRed hover:bg-opacity-10'
                    onClick={() => {
                      if (selectedOtherUsers.filter(selectedUser => selectedUser.id === user.id).length === 0) {
                        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                        setSelectedOtherUsers([...selectedOtherUsers!, props.userData.find(users => users.id === user.id)!]);
                      }
                      setOtherUsersInputValue('');
                      setFilteredOtherUsers([]);
                    }}
                  >
                    {user.email}
                  </Button>
                ))}
              </ButtonGroup>
              <Stack className={'max-h-40 overflow-auto'} spacing={1}>
                {selectedOtherUsers.map(user => (
                  <UserChip key={user.id} userData={user} onDelete={userDelete(user.id)} />
                ))}
              </Stack>
            </Stack>
          </Grid>

          <Stack>
            <Stack direction='row'>
              <Stack className='w-1/2'>
                <Stack direction='row' spacing={1}>
                  <Typography className='text-[#404040] text-xl font-inter'>Access Rights</Typography>
                  <Typography className='text-dulwichRed text-xxl font-inter'>*</Typography>
                </Stack>
                <FormControl error={accessError}>
                  <FormGroup row>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name='studentAccessRights'
                          checked={studentAccessRights}
                          onChange={accessRightsHandler}
                          disableRipple
                          sx={{
                            color: '#BFBFBF',
                            '&.Mui-checked': {
                              color: '#E33939',
                            },
                          }}
                        />
                      }
                      label='Students'
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          name='teacherAccessRights'
                          checked={teacherAccessRights}
                          onChange={accessRightsHandler}
                          disableRipple
                          sx={{
                            color: '#BFBFBF',
                            '&.Mui-checked': {
                              color: '#E33939',
                            },
                          }}
                        />
                      }
                      label='Teachers'
                    />
                  </FormGroup>
                  {accessError && <FormHelperText className='m-0'>Please select at least one option</FormHelperText>}
                </FormControl>
              </Stack>
              <Stack className='w-1/2 px-[70px]'>
                <Stack direction='row' spacing={1}>
                  <Typography className='text-[#404040] text-xl font-inter'>Booking Rights</Typography>
                  <Typography className='text-dulwichRed text-xxl font-inter'>*</Typography>
                </Stack>
                <FormControl error={bookingError}>
                  <FormGroup row>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name='studentBookingRights'
                          checked={studentBookingRights}
                          onChange={bookingRightsHandler}
                          disableRipple
                          sx={{
                            color: '#BFBFBF',
                            '&.Mui-checked': {
                              color: '#E33939',
                            },
                          }}
                        />
                      }
                      label='Students'
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          name='teacherBookingRights'
                          checked={teacherBookingRights}
                          onChange={bookingRightsHandler}
                          disableRipple
                          sx={{
                            color: '#BFBFBF',
                            '&.Mui-checked': {
                              color: '#E33939',
                            },
                          }}
                        />
                      }
                      label='Teachers'
                    />
                  </FormGroup>
                  {bookingError && <FormHelperText className='m-0'>Please select at least one option</FormHelperText>}
                </FormControl>
              </Stack>
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
