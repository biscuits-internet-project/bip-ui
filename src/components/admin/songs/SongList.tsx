import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles({
  container: {
    marginTop: '16px'
  },
  table: {
    minWidth: 650,
  },
});


const SongList = ({songs}) => {
  const classes = useStyles();
    console.log(songs)
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Song Name</TableCell>
            <TableCell>Author</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {songs.map(song => (
            <TableRow key={song.id}>
              <TableCell>
                {song.title}
              </TableCell>
              <TableCell>
                {song.author_name}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default SongList