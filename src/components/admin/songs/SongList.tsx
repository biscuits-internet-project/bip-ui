import React from 'react';
import { Link as RouterLink } from 'react-router-dom'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import {ISong} from '../../Songs';
import { LibraryMusic } from '@material-ui/icons';
import { Tooltip, Link } from '@material-ui/core';
import Fade from '@material-ui/core/Fade';

interface ISongList {
  songs: ISong[]
  handleOpen: (type: string, id?: string) => void
}

const SongList:React.FC<ISongList> = ({songs,handleOpen}) => {
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
                <Tooltip title="Edit" TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} >
                  <CreateIcon color="primary" style={{margin: "0px 8px", cursor: "pointer"}} fontSize="small" onClick={()=>handleOpen('form', song.slug, )}/>
                </Tooltip>
                <Tooltip title="Tracks" TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} >
                  <Link component={RouterLink} to={`/admin/songs/${song.slug}/tracks`} >
                    <LibraryMusic color="primary" style={{margin: "0px 8px", cursor: "pointer"}} fontSize="small" />
                  </Link>
                </Tooltip>
                <Tooltip title="Delete" TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} >
                  <DeleteIcon color="primary" style={{margin: "0px 8px", cursor: "pointer"}} fontSize="small" onClick={()=>handleOpen('delete', song.slug, )}/>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default SongList