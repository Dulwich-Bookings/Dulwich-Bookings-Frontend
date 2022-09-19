import React, { useState } from 'react';

const { colors } = TailWindTheme.theme.extend;
import TailWindTheme from '@/tailwind.config';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, RadioGroup, Radio } from '@mui/material';

type Props = {
  openDialog: boolean;
  handleDialogClose: () => void;
  onSaveRecurringBooking: (value: RecurringModificationTypes) => void;
  handleCloseBookingModal: () => void;
};

export type RecurringModificationTypes = 'Only this booking' | 'All bookings' | 'This booking and all future';
export const RecurringModificationType = {
  ONLY: 'Only this booking' as RecurringModificationTypes,
  ALL: 'All bookings' as RecurringModificationTypes,
  FUTURE: 'This booking and all future' as RecurringModificationTypes,
};

const DeleteAlert = (props: Props) => {
  const [recurringModification, setRecurringModification] = useState<RecurringModificationTypes>(RecurringModificationType.ALL);

  const handleRecurringModificationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRecurringModification(
      event.target.defaultValue === RecurringModificationType.ALL
        ? RecurringModificationType.ALL
        : event.target.defaultValue === RecurringModificationType.ONLY
        ? RecurringModificationType.ONLY
        : RecurringModificationType.FUTURE,
    );
  };

  return (
    <Dialog
      open={props.openDialog}
      onClose={props.handleDialogClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title' className='font-bold ml-3 mt-1'>
        {'Change recurring booking'}
      </DialogTitle>
      <DialogContent className='px-16'>
        <FormControl>
          <RadioGroup
            className='font-Inter font-light px-2 align-center text-grayAccent'
            aria-labelledby='demo-radio-buttons-group-label'
            name='radio-buttons-group'
            onChange={handleRecurringModificationChange}
            defaultValue='never'
            value={recurringModification}
          >
            <FormControlLabel
              value={RecurringModificationType.ALL}
              control={
                <Radio
                  sx={{
                    color: colors.bgBlack,
                    '&.Mui-checked': {
                      color: colors.dulwichRed,
                    },
                  }}
                />
              }
              label={RecurringModificationType.ALL}
            />
            <FormControlLabel
              value={RecurringModificationType.ONLY}
              control={
                <Radio
                  sx={{
                    color: colors.bgBlack,
                    '&.Mui-checked': {
                      color: colors.dulwichRed,
                    },
                  }}
                />
              }
              label={RecurringModificationType.ONLY}
            />
            <FormControlLabel
              value={RecurringModificationType.FUTURE}
              control={
                <Radio
                  sx={{
                    color: colors.bgBlack,
                    '&.Mui-checked': {
                      color: colors.dulwichRed,
                    },
                  }}
                />
              }
              label={RecurringModificationType.FUTURE}
            />
          </RadioGroup>
        </FormControl>
      </DialogContent>
      <DialogActions className='mb-1'>
        <Button className='text-bgDarkGray' onClick={props.handleDialogClose}>
          Cancel
        </Button>
        <Button
          className='text-green'
          onClick={() => {
            props.handleDialogClose();
            props.onSaveRecurringBooking(recurringModification);
            props.handleCloseBookingModal();
          }}
          autoFocus
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteAlert;
