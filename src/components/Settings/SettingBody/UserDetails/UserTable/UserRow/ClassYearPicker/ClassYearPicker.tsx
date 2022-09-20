import React from 'react';
import { TextField, Grid } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

type Props = {
  year: number;
  dateChangeHandler: (val: Date | null) => void;
  disabled?: boolean;
};

const ClassYearPicker = (props: Props) => {
  const yearDate = props.year ? new Date(props.year, 0) : null;
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Grid container className='justify-end caret-transparent'>
        <DatePicker
          disabled={props.disabled}
          showToolbar={false}
          views={['year']}
          value={yearDate}
          onChange={props.dateChangeHandler}
          renderInput={params => <TextField {...params} variant={'standard'} className='w-20' />}
        />
      </Grid>
    </LocalizationProvider>
  );
};

export default ClassYearPicker;
