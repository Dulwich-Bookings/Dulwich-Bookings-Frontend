import React from 'react';

import { TableCell, TableRow } from '@mui/material';
import { MilestoneData } from '@/modules/Milestones/Types';
import moment from 'moment-timezone';

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
