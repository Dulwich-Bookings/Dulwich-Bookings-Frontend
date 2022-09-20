import React from 'react';
import moment from 'moment-timezone';

import { TableCell, TableRow } from '@mui/material';
import { MilestoneData } from '@/modules/Milestones/Types';

type Props = {
  rowData: MilestoneData;
  index: number;
};

const MilestoneRow = ({ rowData, index }: Props) => {
  const date = 'Monday, ' + moment.utc(rowData.weekBeginning.toString()).format('DD-MM-YYYY');
  return (
    <>
      <TableRow hover tabIndex={-1} className={`${index % 2 === 0 ? 'bg-[#FFFFFF]' : 'bg-[#F2F2F2]'}`}>
        <TableCell className='text-left'>{date}</TableCell>
        <TableCell className='text-right'>{rowData.week}</TableCell>
      </TableRow>
    </>
  );
};

export default MilestoneRow;
