import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import {ISong} from '../../Songs'

interface ISongList {
  songs: ISong[] 
  handleOpen: (id?: string) => void
  handleDelete: (id?: string) => void
}

const SongList:React.FC<ISongList> = ({songs,handleOpen,handleDelete}) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Song Name</TableCell>
            <TableCell>Author</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {songs.map((song: ISong) => (
            <TableRow key={song.id}>
              <TableCell>
                {song.title}
              </TableCell>
              <TableCell>
                {song.author_name}
              </TableCell>
              <TableCell align='right'>
                <CreateIcon color="secondary" style={{margin: "0px 8px", cursor: "pointer"}} fontSize="small" onClick={()=>handleOpen(song.slug)}/>
                <DeleteIcon color="secondary" style={{margin: "0px 8px", cursor: "pointer"}} fontSize="small" onClick={()=>handleDelete(song.slug)}/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default SongList