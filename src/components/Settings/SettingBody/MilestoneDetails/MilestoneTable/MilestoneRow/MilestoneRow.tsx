import React, { useState } from 'react';

import InputWithRadio from '@/components/Inputs/InputWithRadio/InputWithRadio';
import { Checkbox, TableCell, TableRow } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import { Role, UserData, UserPutData } from '@/modules/user/types';
import { role } from '@/consts/constants';
import { useApi } from '@/api/ApiHandler';
import UserService from '@/api/user/UserService';
import DeleteUserDialog from '@/components/Dialog/DeleteUserDialog/DeleteUserDialog';
import { MilestoneData } from '@/modules/Milestones/Types';
import moment, { Moment } from 'moment-timezone';
import DateTime from '@/modules/DateTime/DateTime';

type Props = {
  rowData: MilestoneData;
  index: number;
};

const MilestoneRow = ({ rowData, index }: Props) => {
  const date = moment.utc(rowData.weekBeginning.toString()).format('YYYY-MM-DD');
  return (
    <>
      <TableRow hover tabIndex={-1} key={rowData.id} className={`${index % 2 === 0 ? 'bg-[#FFFFFF]' : 'bg-[#F2F2F2]'}`}>
        <TableCell className='text-left'>{date}</TableCell>
        <TableCell className='text-right'>{rowData.week}</TableCell>
      </TableRow>
    </>
  );
};

export default MilestoneRow;
