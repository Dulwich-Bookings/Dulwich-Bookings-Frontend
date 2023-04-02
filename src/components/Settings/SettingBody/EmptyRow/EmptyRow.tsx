import React from 'react';

import { TableCell, TableRow } from '@mui/material';

type Props = {
  index: number;
  dense: boolean;
};

const EmptyRow = ({ index, dense }: Props) => {
  return (
    <>
      <TableRow hover tabIndex={-1} className={`${dense ? 'h-[33px]' : 'h-[53px]'} ${index % 2 === 0 ? 'bg-[#FFFFFF]' : 'bg-[#F2F2F2]'}`}>
        <TableCell colSpan={8} />
      </TableRow>
    </>
  );
};

export default EmptyRow;
