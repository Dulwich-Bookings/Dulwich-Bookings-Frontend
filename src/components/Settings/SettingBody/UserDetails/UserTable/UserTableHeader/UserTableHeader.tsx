import React from 'react';

import { Box, Checkbox, TableHead, TableCell, TableRow, TableSortLabel } from '@mui/material';
import { visuallyHidden } from '@mui/utils';

import { UserData } from '@/modules/user/types';
import { Order } from '@/consts/constants';

interface HeadCell {
  disablePadding: boolean;
  id: keyof UserData;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'email',
    numeric: false,
    disablePadding: true,
    label: 'Email',
  },
  {
    id: 'id',
    numeric: true,
    disablePadding: false,
    label: 'Class',
  },
  {
    id: 'role',
    numeric: true,
    disablePadding: false,
    label: 'Role',
  },
  {
    id: 'isConfirmed',
    numeric: true,
    disablePadding: false,
    label: 'Confirmed Email',
  },
  {
    id: 'isTemporary',
    numeric: true,
    disablePadding: false,
    label: 'Temporary',
  },
];

type Props = {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof UserData) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
};

const UserTableHeader = ({ onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort }: Props) => {
  const createSortHandler = (property: keyof UserData) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead className='bg-[#4D4D4D]'>
      <TableRow>
        <TableCell padding='checkbox'>
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            sx={{
              '&.Mui-checked': {
                color: '#E33939',
              },
              '&.MuiCheckbox-indeterminate': {
                color: '#E33939',
              },
            }}
          />
        </TableCell>
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
        <TableCell></TableCell>
      </TableRow>
    </TableHead>
  );
};

export default UserTableHeader;
