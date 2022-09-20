import React from 'react';

import { Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import MilestoneDropDown from '@components/Settings/SettingBody/MilestoneDetails/MilestoneForm/MilestoneDropDown/MilestoneDropDown';
import InputDatePicker from '@/components/Inputs/InputDatePicker/InputDatePicker';

import { MilestoneFormData } from '@/modules/Milestones/Types';

const isMonday = (date: Date) => {
  const day = date.getDay();
  return day !== 1;
};

type Props = {
  id: number;
  data: MilestoneFormData;
  index: number;
  handleDateChange: (date: Date | null, index: number) => void;
  handleWeekChange: (week: string, index: number) => void;
  handleDelete: (index: number) => void;
};

const MilestoneForm = (props: Props) => {
  return (
    <Grid container className={`p-1 w-full justify-between  ${props.index % 2 === 0 ? 'bg-[#B3CFDD]' : 'bg-[#F2F2F2]'}`}>
      <InputDatePicker
        labelText=''
        inputValue={props.data.weekBeginning}
        inputFormat='MM/dd/yyyy'
        inputClassName='rounded-md w-full bg-bgWhite focus-within:bg-bgWhite caret-transparent m-1'
        inputHandleOnChange={input => props.handleDateChange(input, props.id)}
        restriction={isMonday}
      />
      <Grid item className='pr-2'>
        <MilestoneDropDown
          selectedState={input => props.handleWeekChange(input, props.id)}
          className='m-1 self-end'
          value={props.data.week.toString()}
        />
        <DeleteIcon className='cursor-pointer' onClick={() => props.handleDelete(props.id)} />
      </Grid>
    </Grid>
  );
};

export default MilestoneForm;
