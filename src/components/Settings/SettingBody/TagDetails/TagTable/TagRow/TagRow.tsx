import React from 'react';

import { TableCell, TableRow, Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { TagData } from '@/modules/tag/types';
import SquareIcon from '@mui/icons-material/Square';

type Props = {
  rowData: TagData;
  index: number;
  handleEdit: (id: number) => void;
  handleDelete: (id: number) => void;
};

const TagRow = ({ rowData, index, handleEdit, handleDelete }: Props) => {
  return (
    <>
      <TableRow key={rowData.name} className={`${index % 2 === 0 ? 'bg-[#FFFFFF]' : 'bg-[#F2F2F2]'} `}>
        <TableCell component='th' scope='row'>
          {rowData.name}
        </TableCell>
        <TableCell>
          <Grid container className='justify-end'>
            <div className='uppercase'>{rowData.colour}</div>
            <SquareIcon className='pb-1' sx={{ color: rowData.colour }} />
          </Grid>
        </TableCell>
        <TableCell className='text-right'>
          <EditIcon className='cursor-pointer' onClick={() => handleEdit(rowData.id)} />
          <DeleteIcon className='cursor-pointer' onClick={() => handleDelete(rowData.id)} />
        </TableCell>
      </TableRow>
    </>
  );
};

export default TagRow;
