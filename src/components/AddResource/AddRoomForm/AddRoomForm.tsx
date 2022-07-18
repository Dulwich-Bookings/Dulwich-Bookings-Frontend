import React, { useState } from 'react';
import {
  Stack,
  Typography,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  FormGroup,
  TextField,
  Chip,
  ButtonGroup,
  Box,
  Grid,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { TagData } from '@/modules/tag/types';
import { useHistory } from 'react-router-dom';
import BackButton from '@components/AddResource/BackButton/BackButton';
import ResourceSample1 from '@/assets/images/Resource-Sample-1.jpg';
import AddRoomTag from './AddRoomTag/AddRoomTag';

interface ChipData {
  id: number;
  email: string;
}

type Props = {
  tagData: TagData[];
};

const AddRoom = (props: Props) => {
  const [othersData, setOthersData] = useState<ChipData[]>([]);
  const [addOthersInputValue, setAddOthersInputValue] = useState('');
  const [tagInputValue, setTagInputValue] = useState('');
  const [filteredTags, setFilteredTags] = useState<TagData[]>([]);
  const [selectedTags, setSelectedTags] = useState<TagData[]>([]);
  const history = useHistory();

  const handleDelete = (chipToDelete: ChipData) => () => {
    setOthersData(chips => chips.filter(chip => chip.id !== chipToDelete.id));
  };

  const tagDelete = (tagToDelete: number) => () => {
    setSelectedTags(selectedTags.filter(tag => tag.id !== tagToDelete));
  };

  const handleEnter = () => {
    if (addOthersInputValue.trim() === '') {
      return;
    }
    setOthersData([...othersData, { id: Math.random(), email: addOthersInputValue }]);
    setAddOthersInputValue('');
  };

  const InputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setAddOthersInputValue(event.target.value);
  };

  const TagChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setTagInputValue(event.target.value);
    setFilteredTags(props.tagData.filter(tag => tag.name.match(new RegExp(event.target.value, 'i'))));
    if (event.target.value.trim() === '') {
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
                <Button className='w-[205.65px] h-[40.3px] bg-[#808080] rounded-[6.19335px] text-bgWhite font-inter float-right'>
                  Download Template
                </Button>
              </div>
            </Stack>
          </Stack>

          <Stack>
            <Stack direction='row'>
              <Stack className='w-1/2'>
                <Stack direction='row' spacing={1}>
                  <Typography className='text-[#404040] text-[20px] font-inter'>Room Name</Typography>
                  <Typography className='text-[#E33939] text-[25px] font-inter'>*</Typography>
                </Stack>
                <TextField
                  rows='1'
                  className='rounded-[10px] w-[341px] bg-bgGray focus-within:bg-bgWhite'
                  placeholder='Add the room name'
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderWidth: '0px',
                      },
                      '&:hover fieldset': {
                        borderColor: '#F3F3F4',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#E33939',
                      },
                    },
                  }}
                />
              </Stack>
              <Stack className='w-1/2 px-[70px]'>
                <Stack direction='row' spacing={1}>
                  <Typography className='text-[#404040] text-[20px] font-inter'>Week Profile</Typography>
                  <Typography className='text-[#E33939] text-[25px] font-inter'>*</Typography>
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
            </Stack>
          </Stack>

          <Stack>
            <Stack spacing={1}>
              <Typography className='text-[#404040] text-[20px] font-inter'>Description</Typography>
              <TextField
                size='small'
                multiline={true}
                maxRows='3'
                rows='3'
                className='bg-bgGray w-[766px] rounded-[10px] focus-within:bg-bgWhite'
                placeholder='Add a description of the room (location, size, equipment, etc...)'
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderWidth: '0px',
                    },
                    '&:hover fieldset': {
                      borderColor: '#F3F3F4',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#E33939',
                    },
                  },
                }}
              />
            </Stack>
          </Stack>

          <Stack>
            <Stack direction='row'>
              <Stack className='w-4/12'>
                <Stack direction='row' spacing={1}>
                  <Typography className='text-[#404040] text-[20px] font-inter'>Choose Tags</Typography>
                  <Typography className='text-[#E33939] text-[25px] font-inter'>*</Typography>
                </Stack>
                <TextField
                  rows='1'
                  className='bg-bgGray rounded-[10px] w-[210px] focus-within:bg-bgWhite'
                  placeholder='Type to add tag'
                  onChange={TagChangeHandler}
                  value={tagInputValue}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderWidth: '0px',
                      },
                      '&:hover fieldset': {
                        borderColor: '#F3F3F4',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#E33939',
                      },
                    },
                  }}
                />
                <ButtonGroup
                  orientation='vertical'
                  className='w-[210px] shadow-lg rounded-[4px] max-h-36 overflow-auto'
                  variant='contained'
                  disableElevation
                >
                  {filteredTags.map(tag => (
                    <Button
                      key={tag.id}
                      className='min-h-[45px] w-full border-bgWhite bg-bgWhite text-bgBlack hover:bg-dulwichRed hover:bg-opacity-10'
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
              <Grid container className={'pt-12 w-3/12 max-h-40 overflow-auto pr-6'} spacing={1}>
                {selectedTags.map(tag => (
                  <AddRoomTag key={tag.id} tagData={tag} onDelete={tagDelete(tag.id)} />
                ))}
              </Grid>
              <Stack spacing={1} className='pr-[70px] w-5/12'>
                <Typography className='text-[#404040] text-[20px] font-inter'>Add Others</Typography>
                <TextField
                  variant='outlined'
                  rows='1'
                  className='bg-bgGray rounded-[10px] w-[311px] focus-within:bg-bgWhite'
                  placeholder='name@dulwich.com'
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderWidth: '0px',
                      },
                      '&:hover fieldset': {
                        borderColor: '#F3F3F4',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#E33939',
                      },
                    },
                  }}
                  onChange={InputChangeHandler}
                  onKeyDown={event => {
                    if (event.key === 'Enter') {
                      handleEnter();
                    }
                  }}
                  value={addOthersInputValue}
                />
                <Stack spacing={1} className='max-h-12 w-[311px] overflow-auto'>
                  {othersData.map(email => (
                    <Chip
                      key={email.id}
                      className='text-bgWhite px-2 max-w-fit rounded-[100px] font-inter text-[12px]'
                      sx={{ backgroundColor: '#404040' }}
                      onDelete={handleDelete(email)}
                      label={email.email}
                      size='small'
                      deleteIcon={<CloseIcon className='text-bgWhite text-[14px]' />}
                    />
                  ))}
                </Stack>
              </Stack>
            </Stack>
          </Stack>

          <Stack>
            <Stack direction='row'>
              <Stack className='w-1/2'>
                <Stack direction='row' spacing={1}>
                  <Typography className='text-[#404040] text-[20px] font-inter'>Access Rights</Typography>
                  <Typography className='text-[#E33939] text-[25px] font-inter'>*</Typography>
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
                  <Typography className='text-[#404040] text-[20px] font-inter'>Booking Rights</Typography>
                  <Typography className='text-[#E33939] text-[25px] font-inter'>*</Typography>
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
              <Button className='w-[224px] h-[65px] bg-[#E33939] rounded-[10px] text-bgWhite font-inter text-[20px]'>Add Room</Button>
              <Button className='w-[299px] h-[65px] bg-[#E33939] rounded-[10px] text-bgWhite font-inter text-[20px]'>
                Upload Template
              </Button>
            </Stack>
          </Stack>
        </Stack>
        <img className='w-1/3 h-screen float-right object-cover' src={ResourceSample1} />
      </Stack>
    </>
  );
};

export default AddRoom;
