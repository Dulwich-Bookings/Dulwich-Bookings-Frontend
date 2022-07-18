import React, { useState } from 'react';
import { Stack, Typography, Button, RadioGroup, FormControlLabel, Radio, Checkbox, FormGroup, ButtonGroup, Box, Grid } from '@mui/material';

import { TagData } from '@/modules/tag/types';
import { UserData } from '@/modules/user/types';
import { useHistory } from 'react-router-dom';
import BackButton from '@components/AddResource/BackButton/BackButton';
import ResourceSample1 from '@/assets/images/Resource-Sample-1.jpg';
import TagChip from './TagChip/TagChip';
import UserChip from './UserChip/UserChip';

import { InputValidation } from '@/modules/inputValidation/types';
import InputWithoutBorder from '@/components/Inputs/InputWithoutBorder/InputWithoutBorder';

type Props = {
  tagData: TagData[];
  userData: UserData[];
};

const AddRoom = (props: Props) => {
  const noError: InputValidation = { isError: false, errorHelperText: '' };
  const [roomName, setRoomName] = useState<string>('');
  //const [roomError, setRoomError] = useState<InputValidation>(noError);

  const [description, setDescription] = useState<string>('');

  const [addOtherUsersValue, setOtherUsersInputValue] = useState('');
  const [filteredOtherUsers, setFilteredOtherUsers] = useState<UserData[]>([]);
  const [selectedOtherUsers, setSelectedOtherUsers] = useState<UserData[]>([]);

  const [tagInputValue, setTagInputValue] = useState('');
  const [filteredTags, setFilteredTags] = useState<TagData[]>([]);
  const [selectedTags, setSelectedTags] = useState<TagData[]>([]);

  const history = useHistory();

  const userDelete = (userToDelete: number) => () => {
    setSelectedOtherUsers(selectedOtherUsers.filter(user => user.id !== userToDelete));
  };

  const tagDelete = (tagToDelete: number) => () => {
    setSelectedTags(selectedTags.filter(tag => tag.id !== tagToDelete));
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

  const returnResourcePage = () => {
    history.push('/addResource');
  };

  return (
    <>
      <Stack direction='row' className='w-screen'>
        <Stack className='w-2/3 py-10 px-24' spacing={2}>
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
                inputValidation={noError}
                inputType='text'
                inputClassName='rounded-xl w-3/4 bg-bgGray focus-within:bg-bgWhite'
                required={true}
              />
            </Grid>
            <Stack className='w-1/2 px-[70px]'>
              <Stack direction='row' spacing={1}>
                <Typography className='text-[#404040] text-xl font-inter'>Week Profile</Typography>
                <Typography className='text-dulwichRed text-xxl font-inter'>*</Typography>
              </Stack>
              <RadioGroup defaultValue='weekly' row>
                <FormControlLabel
                  value='Weekly'
                  control={
                    <Radio
                      disableRipple={true}
                      sx={{
                        color: '#202020',
                        '&.Mui-checked': {
                          color: '#E33939',
                        },
                      }}
                    />
                  }
                  label='Weekly'
                  color='dulwichRed'
                ></FormControlLabel>
                <FormControlLabel
                  value='Bi-weekly'
                  control={
                    <Radio
                      disableRipple={true}
                      sx={{
                        color: '#202020',
                        '&.Mui-checked': {
                          color: '#E33939',
                        },
                      }}
                    />
                  }
                  label='Bi-weekly'
                ></FormControlLabel>
              </RadioGroup>
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
                inputValue={tagInputValue}
                labelText='Choose Tags'
                labelClassName='text-[#404040] text-xl font-inter'
                inputPlaceholder='Type to add tag'
                inputType='text'
                inputClassName='bg-bgGray rounded-xl w-full focus-within:bg-bgWhite'
              />
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
                    onClick={() => {
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
                <FormGroup row>
                  <FormControlLabel
                    control={
                      <Checkbox
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
                        sx={{
                          color: '#BFBFBF',
                          '&.Mui-checked': {
                            color: '#E33939',
                          },
                        }}
                        disableRipple
                      />
                    }
                    label='Teachers'
                  />
                </FormGroup>
              </Stack>
              <Stack className='w-1/2 px-[70px]'>
                <Stack direction='row' spacing={1}>
                  <Typography className='text-[#404040] text-xl font-inter'>Booking Rights</Typography>
                  <Typography className='text-dulwichRed text-xxl font-inter'>*</Typography>
                </Stack>
                <FormGroup row>
                  <FormControlLabel
                    control={
                      <Checkbox
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
              </Stack>
            </Stack>
          </Stack>

          <Stack>
            <Stack direction='row' spacing={5}>
              <Button className='w-56 h-16 bg-dulwichRed rounded-xl text-bgWhite font-inter text-xl'>Add Room</Button>
              <Button className='w-72 h-16 bg-dulwichRed rounded-xl text-bgWhite font-inter text-xl'>Upload Template</Button>
            </Stack>
          </Stack>
        </Stack>
        <img className='w-1/3 h-screen float-right object-cover' src={ResourceSample1} />
      </Stack>
    </>
  );
};

export default AddRoom;
