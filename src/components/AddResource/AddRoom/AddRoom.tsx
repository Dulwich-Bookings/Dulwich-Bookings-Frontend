import React from 'react';
import {
  Stack,
  Typography,
  Button,
  OutlinedInput,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  FormGroup,
} from '@mui/material';
import { locationImages } from '@/consts/constants';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const AddRoom = () => {
  return (
    <>
      <Stack direction='row' className='w-screen'>
        <Stack className='w-2/3 py-12 px-24' spacing={2.5}>
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
                <FormControl className='rounded-[10px] w-[341px] h-[47px]'>
                  <OutlinedInput className='bg-bgGray h-[47px]' placeholder='Add the room name' />
                </FormControl>
              </Stack>
              <Stack className='w-1/2 px-[70px]'>
                <Stack direction='row' spacing={1}>
                  <Typography className='text-[#404040] text-[20px] font-inter'>Week Profile</Typography>
                  <Typography className='text-[#E33939] text-[25px] font-inter'>*</Typography>
                </Stack>
                <RadioGroup defaultValue='weekly' row>
                  <FormControlLabel value='Weekly' control={<Radio />} label='Weekly'></FormControlLabel>
                  <FormControlLabel value='Bi-weekly' control={<Radio />} label='Bi-weekly'></FormControlLabel>
                </RadioGroup>
              </Stack>
            </Stack>
          </Stack>

          <Stack>
            <Stack spacing={1}>
              <Typography className='text-[#404040] text-[20px] font-inter'>Description</Typography>
              <FormControl className='rounded-[10px] w-[766px] h-[79px]'>
                <OutlinedInput
                  multiline={true}
                  maxRows='3'
                  className='bg-bgGray h-[79px]'
                  placeholder='Add a description of the room (location, size, equipment, etc...)'
                />
              </FormControl>
            </Stack>
          </Stack>

          <Stack>
            <Stack direction='row'>
              <Stack className='w-1/2'>
                <Stack direction='row' spacing={1}>
                  <Typography className='text-[#404040] text-[20px] font-inter'>Choose Tags</Typography>
                  <Typography className='text-[#E33939] text-[25px] font-inter'>*</Typography>
                </Stack>
                <FormControl className='rounded-[10px] w-[210px]'>
                  <OutlinedInput className='bg-bgGray h-[47px]' placeholder='Type to add tag' />
                </FormControl>
              </Stack>
              <Stack spacing={1} className='w-1/2 px-[70px]'>
                <Typography className='text-[#404040] text-[20px] font-inter'>Add Others</Typography>
                <FormControl className='rounded-[10px] w-[311px]'>
                  <OutlinedInput className='bg-bgGray h-[47px]' placeholder='name@dulwich.com' />
                </FormControl>
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
                  <FormControlLabel control={<Checkbox />} label='Students' />
                  <FormControlLabel control={<Checkbox />} label='Teachers' />
                </FormGroup>
              </Stack>
              <Stack className='w-1/2 px-[70px]'>
                <Stack direction='row' spacing={1}>
                  <Typography className='text-[#404040] text-[20px] font-inter'>Booking Rights</Typography>
                  <Typography className='text-[#E33939] text-[25px] font-inter'>*</Typography>
                </Stack>
                <FormGroup row>
                  <FormControlLabel control={<Checkbox />} label='Students' />
                  <FormControlLabel control={<Checkbox />} label='Teachers' />
                </FormGroup>
              </Stack>
            </Stack>
          </Stack>

          <Stack className='py-4'>
            <Stack direction='row' spacing={5}>
              <Button className='w-[224px] h-[65px] bg-[#E33939] rounded-[10px] text-bgWhite font-inter text-[20px]'>Add Room</Button>
              <Button className='w-[299px] h-[65px] bg-[#E33939] rounded-[10px] text-bgWhite font-inter text-[20px]'>
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
