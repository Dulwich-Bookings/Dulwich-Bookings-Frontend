import React, { useState } from 'react';

import { Grid, FormControlLabel, Paper, Switch, Table, TableBody, TableContainer, TablePagination } from '@mui/material';
import UserRow from '@components/Settings/SettingBody/UserDetails/UserTable/UserRow/UserRow';
import UserTableHeader from '@components/Settings/SettingBody/UserDetails/UserTable/UserTableHeader/UserTableHeader';
import UserTableToolbar from '@components/Settings/SettingBody/UserDetails/UserTable/UserTableToolbar/UserTableToolbar';
import DeleteUserDialog from '@/components/Dialog/DeleteUserDialog/DeleteUserDialog';

import { UserData } from '@/modules/user/types';
import EmptyRow from '../../EmptyRow/EmptyRow';

type Props = {
  users: UserData[];
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

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof UserData>(
  order: Order,
  orderBy: Key,
): (a: { [key in Key]: number | string | boolean }, b: { [key in Key]: number | string | boolean }) => number {
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

const UserTable = (props: Props) => {
  const userData = props.users;
  const [rows, setRows] = useState<UserData[]>(userData);
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof UserData>('email');
  const [selected, setSelected] = useState<readonly number[]>([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof UserData) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map(n => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleCheckboxClick = (id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];
    console.log(selectedIndex);

    if (selectedIndex === -1) {
      //Add element into selected array
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      //Removes element on the first index
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      //Removes element on the last index
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      //Removes element in the middle of the index
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
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

  const handleInputChange = (input: string) => {
    const isSearchInputInString = (str: string): boolean => str.toUpperCase().indexOf(input.trim().toUpperCase()) > -1;
    const filteredUsers = userData.filter(user => isSearchInputInString(user.email));
    setRows(filteredUsers);
  };

  const handleBulkDelete = async () => {
    setOpenDialog(true);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = Math.max(0, (1 + page) * rowsPerPage - rows.length);
  const emptyArr = new Array(emptyRows).fill(null);

  return (
    <>
      <Grid sx={{ width: '100%' }}>
        <Paper className='drop-shadow-2xl' sx={{ width: '100%', mb: 2 }}>
          <UserTableToolbar numSelected={selected.length} onBulkDelete={handleBulkDelete} onInputChange={handleInputChange} />
          <TableContainer>
            <Table sx={{ minWidth: 750 }} size={dense ? 'small' : 'medium'}>
              <UserTableHeader
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />

              <TableBody>
                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <UserRow
                        key={row.id}
                        rowData={row}
                        index={index}
                        selected={isSelected(row.id)}
                        checkBoxHandler={handleCheckboxClick}
                        handleSuccess={props.handleSuccess}
                      />
                    );
                  })}
                {emptyArr.map((input, index) => {
                  return <EmptyRow key={index} index={index + (userData.length % 2)} dense={dense} />;
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[25, 50, 100]}
            component='div'
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <FormControlLabel control={<Switch checked={dense} onChange={handleChangeDense} />} label='Dense padding' />
      </Grid>

      {openDialog && (
        <DeleteUserDialog
          isBulk={true}
          bulkUserId={selected as number[]}
          dialogState={openDialog}
          successDialog={() => {
            setOpenDialog(false);
            props.handleSuccess();
          }}
          closeDialog={() => setOpenDialog(false)}
        />
      )}
    </>
  );
};

export default UserTable;
