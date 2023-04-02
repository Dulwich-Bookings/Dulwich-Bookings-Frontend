import React, { useState } from 'react';

import { Box, Grid, Stack } from '@mui/material';
import SettingHeader from '@/components/Settings/SettingBody/SettingHeader/SettingHeader';
import MilestoneForm from '@/components/Settings/SettingBody/MilestoneDetails/MilestoneForm/MilestoneForm';
import MilestoneTable from '@/components/Settings/SettingBody/MilestoneDetails/MilestoneTable/MilestoneTable';
import FormSubmitButton from '@/components/AddResource/Forms/FormSubmitButton/FormSubmitButton';
import MilestoneDialog from '@/components/Dialog/MilestoneDialog/MilestoneDialog';

import { MilestoneData, MilestoneFormData } from '@/modules/Milestones/Types';

type Props = {
  milestones: MilestoneData[];
  handleRefresh: () => void;
};

const sortByDate = (data: MilestoneFormData[]) => {
  data.sort((a, b) => a.weekBeginning.getTime() - b.weekBeginning.getTime());
};

const MilestoneDetails = ({ milestones: oldMilestones, handleRefresh }: Props) => {
  const hasMilestones = oldMilestones.length !== 0;

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [actionState, setActionState] = useState<boolean>(true);
  const [createMilestones, setMilestones] = useState<MilestoneFormData[]>([]);
  const [duplicateError, setDuplicateError] = useState<boolean>();
  const [redundantError, setRedundantError] = useState<boolean>();

  const addMilestoneHandler = () => {
    if (hasMilestones) return;

    const date = new Date();
    date.setDate(date.getDate() + ((1 + 7 - date.getDay()) % 7 || 7));

    const createDummyData: MilestoneFormData = {
      id: Date.now(),
      week: 1,
      weekBeginning: date,
    };

    setMilestones([...createMilestones, createDummyData]);
  };

  const dateChangeHandler = (date: Date | null, id: number) => {
    if (!date) {
      return;
    }

    const index = createMilestones.map(data => data.id).indexOf(id);
    const newMilestones = createMilestones;
    newMilestones[index].weekBeginning = date;
    sortByDate(newMilestones);

    setMilestones([...newMilestones]);
  };

  const weekChangeHandler = (val: string, id: number) => {
    const index = createMilestones.map(data => data.id).indexOf(id);
    const newMilestones = createMilestones;
    newMilestones[index].week = +val;
    sortByDate(newMilestones);

    setMilestones([...newMilestones]);
  };

  const formDeleteHandler = (id: number) => {
    const newMilestones = createMilestones.filter(data => data.id !== id);
    sortByDate(newMilestones);

    setMilestones([...newMilestones]);
  };

  const redundantDatesHelper = (milestones: MilestoneFormData[]): boolean => {
    let firstMilestoneWeekNumber = milestones[0].week;
    let firstMilestoneDate = milestones[0].weekBeginning;

    for (let i = 1; i < milestones.length; i++) {
      const currentMilestone = milestones[i];
      const currentMilestoneWeekNumber = currentMilestone.week;
      const currentMilestoneDate = currentMilestone.weekBeginning;
      const weekDiff = Math.round((currentMilestoneDate.getTime() - firstMilestoneDate.getTime()) / (1000 * 3600 * 24)) / 7;

      // If the week number is the same despite the date being even number of weeks apart
      if (
        (weekDiff % 2 == 0 && currentMilestoneWeekNumber == firstMilestoneWeekNumber) ||
        (weekDiff % 2 == 1 && currentMilestoneWeekNumber != firstMilestoneWeekNumber)
      ) {
        // Return true to indicate that there are redundant dates
        return true;
      } else {
        // Update the first milestone to the current milestone
        firstMilestoneWeekNumber = currentMilestoneWeekNumber;
        firstMilestoneDate = currentMilestoneDate;
      }
    }

    return false;
  };

  const saveMilestoneHandler = () => {
    const milestoneDates = createMilestones.map(milestone => milestone.weekBeginning.getDate());
    const duplicateSameDate = milestoneDates.filter((date, index) => milestoneDates.indexOf(date) !== index).length !== 0;
    const redundantDate = redundantDatesHelper(createMilestones);
    setRedundantError(redundantDate);
    setDuplicateError(duplicateSameDate);

    if (duplicateSameDate || redundantDate) {
      return;
    }

    setActionState(true);
    setOpenDialog(true);
  };

  const startNewYearHandler = () => {
    if (!hasMilestones) return;
    setActionState(false);
    setOpenDialog(true);
  };

  return (
    <>
      <Stack className='w-full'>
        <Grid container className='justify-start'>
          <SettingHeader title={`Milestones`} />
        </Grid>

        <Grid container className='py-10'>
          <Stack direction={'row'} spacing={2}>
            <FormSubmitButton
              buttonText='Add Milestone'
              handleOnClick={addMilestoneHandler}
              buttonClassName={`rounded-xl ${!hasMilestones ? 'bg-dulwichRed' : 'bg-textGray cursor-not-allowed'}`}
            />
            <FormSubmitButton
              buttonText='Start New Year'
              handleOnClick={startNewYearHandler}
              buttonClassName={`rounded-xl ${hasMilestones ? 'bg-dulwichRed' : 'bg-textGray cursor-not-allowed'}`}
            />
          </Stack>
        </Grid>

        {hasMilestones && (
          <MilestoneTable
            milestones={oldMilestones}
            handleSuccess={() => {
              return;
            }}
          />
        )}

        {!hasMilestones && (
          <>
            <Box className='drop-shadow-2xl'>
              {createMilestones.map((data, index) => {
                return (
                  <MilestoneForm
                    key={data.id}
                    data={data}
                    id={data.id}
                    index={index}
                    handleDateChange={dateChangeHandler}
                    handleWeekChange={weekChangeHandler}
                    handleDelete={formDeleteHandler}
                  />
                );
              })}
            </Box>
            {createMilestones.length !== 0 && (
              <FormSubmitButton
                buttonText='Save Milestones'
                handleOnClick={saveMilestoneHandler}
                buttonClassName={'bg-dulwichRed rounded-t-none rounded-b-xl'}
              />
            )}
          </>
        )}
      </Stack>
      <div className={`${duplicateError || redundantError ? 'block text-dulwichRed' : 'hidden'}`}>
        {`${duplicateError ? 'Please remove duplicate entries!' : 'Please remove redundant entries!'}`}
      </div>

      <MilestoneDialog
        actionState={actionState}
        dialogState={openDialog}
        successDialog={() => {
          setOpenDialog(false);
          handleRefresh();
        }}
        closeDialog={() => setOpenDialog(false)}
        milestones={createMilestones}
      />
    </>
  );
};

export default MilestoneDetails;
