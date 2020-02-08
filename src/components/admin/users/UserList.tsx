import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import {IUser} from './AdminUsers'

interface IUserList {
  users: IUser[]
  handleOpen: (id?: string) => void
  handleDelete: (id?: string) => void
}

const UserList:React.FC<IUserList> = ({users,handleOpen,handleDelete}) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user: IUser) => (
            <TableRow key={user.id}>
              <TableCell>
                {user.username}
              </TableCell>
              <TableCell>
                {user.email}
              </TableCell>
              <TableCell>
                {user.first_name}
              </TableCell>
              <TableCell>
                {user.last_name}
              </TableCell>
              <TableCell align='right'>
                <CreateIcon color="secondary" style={{margin: "0px 8px", cursor: "pointer"}} fontSize="small" onClick={()=>handleOpen(user.id)}/>
                <DeleteIcon color="secondary" style={{margin: "0px 8px", cursor: "pointer"}} fontSize="small" onClick={()=>handleDelete(user.id)}/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default UserList