import React, { useState } from 'react';
import { Stack, Typography, Button, RadioGroup, FormControlLabel, Radio, Checkbox, FormGroup, TextField, Chip } from '@mui/material';
import { locationImages } from '@/consts/constants';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CloseIcon from '@mui/icons-material/Close';

interface ChipData {
  id: number;
  email: string;
}

const AddRoom = () => {
  const [othersData, setOthersData] = useState<ChipData[]>([]);
  const [inputValue, setInputValue] = useState('');

  const handleDelete = (chipToDelete: ChipData) => () => {
    setOthersData(chips => chips.filter(chip => chip.id !== chipToDelete.id));
  };

  const handleEnter = () => {
    setOthersData([...othersData, { id: Math.random(), email: inputValue }]);
    setInputValue('');
  };

  const InputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value);
  };

  return (
    <>
      <Stack direction='row' className='w-screen'>
        <Stack className='w-2/3 py-10 px-24' spacing={2}>
          <Stack>
            <Stack direction='row' alignItems='center'>
              <Stack spacing={2}>
                <Stack direction='row' spacing={0.5} alignItems='center'>
                  <ArrowBackIosNewIcon className='text-[16px] text-[#404040]' />
                  <Typography className='font-Inter text-[#404040]'>Home</Typography>
                </Stack>
                <Typography variant='h4' className='font-Inter'>
                  Add Room
                </Typography>
              </Stack>
              <div className='w-3/4'>
                <Button
                  disableRipple={true}
                  className='w-[205.65px] h-[40.3px] bg-[#808080] rounded-[6.19335px] text-bgWhite font-inter float-right'
                >
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
                        borderColor: '#F3F3F4',
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
                multiline={true}
                maxRows='3'
                rows='3'
                className='bg-bgGray w-[766px] rounded-[10px] focus-within:bg-bgWhite'
                placeholder='Add a description of the room (location, size, equipment, etc...)'
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#F3F3F4',
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
              <Stack className='w-1/2'>
                <Stack direction='row' spacing={1}>
                  <Typography className='text-[#404040] text-[20px] font-inter'>Choose Tags</Typography>
                  <Typography className='text-[#E33939] text-[25px] font-inter'>*</Typography>
                </Stack>
                <TextField
                  rows='1'
                  className='bg-bgGray rounded-[10px] w-[210px] focus-within:bg-bgWhite'
                  placeholder='Type to add tag'
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#F3F3F4',
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
              <Stack spacing={1} className='w-1/2 px-[70px]'>
                <Typography className='text-[#404040] text-[20px] font-inter'>Add Others</Typography>
                <TextField
                  variant='outlined'
                  rows='1'
                  className='bg-bgGray rounded-[10px] w-[311px] focus-within:bg-bgWhite'
                  placeholder='name@dulwich.com'
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#F3F3F4',
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
                  value={inputValue}
                />
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
              <Button disableRipple={true} className='w-[224px] h-[65px] bg-[#E33939] rounded-[10px] text-bgWhite font-inter text-[20px]'>
                Add Room
              </Button>
              <Button disableRipple={true} className='w-[299px] h-[65px] bg-[#E33939] rounded-[10px] text-bgWhite font-inter text-[20px]'>
                Upload Template
              </Button>
            </Stack>
          </Stack>
        </Stack>
        <img className='w-1/3 h-screen float-right' src={locationImages.find(location => location.id === 1)?.img} />
      </Stack>
    </>
  );
};

export default AddRoom;
