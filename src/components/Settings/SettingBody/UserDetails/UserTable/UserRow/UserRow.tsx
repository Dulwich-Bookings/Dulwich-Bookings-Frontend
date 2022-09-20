import React, { useState } from 'react';

import InputWithRadio from '@/components/Inputs/InputWithRadio/InputWithRadio';
import { Checkbox, TableCell, TableRow } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import { Role, UserData, UserPutData } from '@/modules/user/types';
import { role } from '@/consts/constants';
import { useApi } from '@/api/ApiHandler';
import UserService from '@/api/user/UserService';
import DeleteUserDialog from '@/components/Dialog/DeleteUserDialog/DeleteUserDialog';
import ClassYearPicker from './ClassYearPicker/ClassYearPicker';

type Props = {
  rowData: UserData;
  selected: boolean;
  index: number;
  checkBoxHandler: (id: number) => void;
  handleSuccess: () => void;
};

const UserRow = ({ rowData, selected, index, checkBoxHandler, handleSuccess }: Props) => {
  //   const isItemSelected = isSelected(rowData.id);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [year, setYear] = useState<number>(rowData.class);
  const [roles, setRole] = useState<Role>(rowData.role);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(rowData.isConfirmed);
  const [isTemporary, setIsTemporary] = useState<boolean>(rowData.isTemporary);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const [updateUser] = useApi((data: UserPutData) => UserService.updateUserById(rowData.id ?? null, data ?? null), true, true);

  const handleRoleChange = (value: string): void => {
    if (value === role.STUDENT) {
      setRole(role.STUDENT);
    } else {
      setRole(role.TEACHER);
    }
  };

  const handleYearChange = (date: Date | null) => {
    if (!date) return;
    setYear(date?.getFullYear());
  };

  const handleOnSave = async () => {
    try {
      setEditMode(false);

      if (year === rowData.class && roles === rowData.role && isConfirmed === rowData.isConfirmed && isTemporary === rowData.isTemporary)
        return;

      const data: UserPutData = {
        class: year,
        role: roles,
        isConfirmed: isConfirmed,
        isTemporary: isTemporary,
      };

      const sendReq = await updateUser(data);
      if (sendReq.isSuccess) {
        handleSuccess();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <TableRow
        hover
        role='checkbox'
        tabIndex={-1}
        key={rowData.email}
        className={`${selected ? 'bg-[#1976d214]' : index % 2 === 0 ? 'bg-[#FFFFFF]' : 'bg-[#F2F2F2]'}`}
      >
        <TableCell padding='checkbox'>
          <Checkbox
            checked={selected}
            onClick={() => {
              checkBoxHandler(rowData.id);
            }}
            sx={{
              '&.Mui-checked': {
                color: '#E33939',
              },
            }}
          />
        </TableCell>
        <TableCell component='th' scope='row' padding='none'>
          {rowData.email}
        </TableCell>
        <TableCell>
          <ClassYearPicker year={year} dateChangeHandler={handleYearChange} disabled={!editMode} />
        </TableCell>
        <TableCell className='pr-0'>
          <InputWithRadio
            labelClassName='hidden'
            inputLabels={[role.STUDENT, role.TEACHER]}
            inputValue={roles}
            inputHandleOnChange={input => handleRoleChange(input.target.value)}
            inputClassName='justify-start'
            disabled={!editMode}
          />
        </TableCell>
        <TableCell className='text-left'>
          <Checkbox
            color='primary'
            checked={isConfirmed}
            onClick={() => {
              setIsConfirmed(!isConfirmed);
            }}
            sx={{
              '&.Mui-checked': {
                color: '#E33939',
                '&.Mui-disabled': {
                  color: '#EB6A6A',
                },
              },
            }}
            disabled={!editMode}
          />
        </TableCell>
        <TableCell className='text-left'>
          <Checkbox
            color='primary'
            checked={isTemporary}
            onClick={() => {
              setIsTemporary(!isTemporary);
            }}
            sx={{
              '&.Mui-checked': {
                color: '#E33939',
                '&.Mui-disabled': {
                  color: '#EB6A6A',
                },
              },
            }}
            disabled={!editMode}
          />
        </TableCell>
        <TableCell align='right'>
          {!editMode && <EditIcon className='cursor-pointer text-dulwichRed' onClick={() => setEditMode(true)} />}
          {editMode && <SaveIcon className='cursor-pointer text-[#66bb6a]' onClick={handleOnSave} />}
          <DeleteIcon className='cursor-pointer' onClick={() => setOpenDialog(true)} />
        </TableCell>
      </TableRow>

      {openDialog && (
        <DeleteUserDialog
          isBulk={false}
          userId={rowData.id}
          dialogState={openDialog}
          successDialog={() => {
            setOpenDialog(false);
            handleSuccess();
          }}
          closeDialog={() => setOpenDialog(false)}
        />
      )}
    </>
  );
};

export default UserRow;
