import React from 'react';

import { Box, TableHead, TableCell, TableRow, TableSortLabel } from '@mui/material';
import { visuallyHidden } from '@mui/utils';

import { MilestoneData } from '@/modules/Milestones/Types';
import { Order } from '@/consts/constants';

interface HeadCell {
  disablePadding: boolean;
  id: keyof MilestoneData;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'weekBeginning',
    numeric: false,
    disablePadding: false,
    label: 'Date',
  },
  {
    id: 'week',
    numeric: true,
    disablePadding: false,
    label: 'Week',
  },
];

type Props = {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof MilestoneData) => void;
  order: Order;
  orderBy: string;
};

const MilestoneTableHeader = ({ order, orderBy, onRequestSort }: Props) => {
  const createSortHandler = (property: keyof MilestoneData) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead className='bg-[#4D4D4D]'>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell
            className='text-bgWhite'
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
              sx={{
                '&.MuiTableSortLabel-root': {
                  color: 'white',
                },
                '&.MuiTableSortLabel-root:hover': {
                  color: '#E33939',
                },
                '&.Mui-active': {
                  color: 'white',
                },
                '& .MuiTableSortLabel-icon': {
                  color: '#E33939 !important',
                },
              }}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component='span' sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default MilestoneTableHeader;
