import React from 'react';

import { Box, TableHead, TableCell, TableRow, TableSortLabel } from '@mui/material';
import { visuallyHidden } from '@mui/utils';

import { TagData } from '@/modules/tag/types';
import { Order } from '@/consts/constants';

interface HeadCell {
  disablePadding: boolean;
  id: keyof TagData;
  label: string;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'name',
    disablePadding: true,
    label: 'Tag Name',
  },
  {
    id: 'colour',
    disablePadding: false,
    label: 'Colour',
  },
];

type Props = {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof TagData) => void;
  order: Order;
  orderBy: string;
};

const TagTableHeader = ({ order, orderBy, onRequestSort }: Props) => {
  const createSortHandler = (property: keyof TagData) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead className='bg-[#4D4D4D]'>
      <TableRow>
        <TableCell
          className='text-bgWhite'
          key={headCells[0].id}
          align={'left'}
          padding={'normal'}
          sortDirection={orderBy === headCells[0].id ? order : false}
        >
          <TableSortLabel
            active={orderBy === headCells[0].id}
            direction={orderBy === headCells[0].id ? order : 'asc'}
            onClick={createSortHandler(headCells[0].id)}
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
            {headCells[0].label}
            {orderBy === headCells[0].id ? (
              <Box component='span' sx={visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </Box>
            ) : null}
          </TableSortLabel>
        </TableCell>

        <TableCell
          className='text-bgWhite'
          key={headCells[1].id}
          align={'left'}
          padding={'normal'}
          sortDirection={orderBy === headCells[1].id ? order : false}
        >
          <TableSortLabel
            active={orderBy === headCells[1].id}
            direction={orderBy === headCells[1].id ? order : 'asc'}
            onClick={createSortHandler(headCells[1].id)}
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
            {headCells[1].label}
            {orderBy === headCells[1].id ? (
              <Box component='span' sx={visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </Box>
            ) : null}
          </TableSortLabel>
        </TableCell>
        <TableCell />
      </TableRow>
    </TableHead>
  );
};

export default TagTableHeader;
