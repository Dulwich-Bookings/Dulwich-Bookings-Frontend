import React, { useState } from 'react';

import { Grid, FormControlLabel, Paper, Switch, Table, TableBody, TableContainer, TablePagination } from '@mui/material';
import MilestoneRow from '@components/Settings/SettingBody/MilestoneDetails/MilestoneTable/MilestoneRow/MilestoneRow';
import MilestoneTableHeader from '@components/Settings/SettingBody/MilestoneDetails/MilestoneTable/MilestoneTableHeader/MilestoneTableHeader';

import { MilestoneData } from '@/modules/Milestones/Types';
import DateTime from '@/modules/DateTime/DateTime';
import { Order } from '@/consts/constants';
import EmptyRow from '../../EmptyRow/EmptyRow';

type Props = {
  milestones: MilestoneData[];
  handleSuccess: () => void;
};

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof MilestoneData>(
  order: Order,
  orderBy: Key,
): (a: { [key in Key]: number | DateTime }, b: { [key in Key]: number | DateTime }) => number {
  return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

const MilestoneTable = (props: Props) => {
  const milestoneData = props.milestones;
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof MilestoneData>('weekBeginning');
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof MilestoneData) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = Math.max(0, (1 + page) * rowsPerPage - milestoneData.length);
  const emptyArr = new Array(emptyRows).fill(null);

  return (
    <>
      <Grid sx={{ width: '100%' }}>
        <Paper className='drop-shadow-2xl' sx={{ width: '100%', mb: 2 }}>
          <TableContainer>
            <Table sx={{ minWidth: 750 }} size={dense ? 'small' : 'medium'}>
              <MilestoneTableHeader order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
              <TableBody>
                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
                {stableSort(milestoneData, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return <MilestoneRow key={index} rowData={row} index={index} />;
                  })}

                {emptyArr.map((input, index) => {
                  return <EmptyRow key={index} index={index + (milestoneData.length % 2)} dense={dense} />;
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50, 100]}
            component='div'
            count={milestoneData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <FormControlLabel control={<Switch checked={dense} onChange={handleChangeDense} />} label='Dense padding' />
      </Grid>
    </>
  );
};

export default MilestoneTable;
