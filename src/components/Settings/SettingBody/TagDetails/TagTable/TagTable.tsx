import React, { useState } from 'react';

import {
  Grid,
  FormControlLabel,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
} from '@mui/material';
import TagTableHeader from '@components/Settings/SettingBody/TagDetails/TagTable//TagTableHeader/TagTableHeader';
import TagRow from '@components/Settings/SettingBody/TagDetails/TagTable/TagRow/TagRow';
import TagTableToolbar from '@components/Settings/SettingBody/TagDetails/TagTable//TagTableToolbar/TagTableToolbar';

import { TagData } from '@/modules/tag/types';

type Props = {
  tags: TagData[];
  editTagHandler: (tag: TagData) => void;
  deleteTagHandler: (tag: TagData) => void;
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

function getComparator<Key extends keyof TagData>(
  order: Order,
  orderBy: Key,
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
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

const TagTable = (props: Props) => {
  const tagData = props.tags;
  const [rows, setRows] = useState<TagData[]>(tagData);
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof TagData>('name');
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof TagData) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleEditTag = (id: number) => {
    const tagData = props.tags.filter(tag => tag.id === id)[0];
    props.editTagHandler(tagData);
  };

  const handleDeleteTag = (id: number) => {
    const tagData = props.tags.filter(tag => tag.id === id)[0];
    props.deleteTagHandler(tagData);
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
    const filteredTags = tagData.filter(tag => isSearchInputInString(tag.name));
    setRows(filteredTags);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <>
      <Grid sx={{ width: '100%' }}>
        <Paper className='drop-shadow-2xl' sx={{ width: '100%', mb: 2 }}>
          <TagTableToolbar onInputChange={handleInputChange} />
          <TableContainer>
            <Table sx={{ minWidth: 750 }} size={dense ? 'small' : 'medium'}>
              <TagTableHeader order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
              <TableBody>
                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return <TagRow key={row.id} rowData={row} index={index} handleEdit={handleEditTag} handleDelete={handleDeleteTag} />;
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
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
    </>
  );
};

export default TagTable;
