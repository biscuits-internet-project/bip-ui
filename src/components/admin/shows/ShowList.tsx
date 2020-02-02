import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {IShow} from './AdminShows'

const ShowList:React.FC<{shows: IShow[]}> = ({shows}) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Venue</TableCell>
            <TableCell>City</TableCell>
            <TableCell>State</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {shows && shows.map((show: IShow) => (
            <TableRow key={show.id}>
              <TableCell>
                {show.date}
              </TableCell>
              <TableCell>
                {show.venue.name}
              </TableCell>
              <TableCell>
                {show.venue.city}
              </TableCell>
              <TableCell>
                {show.venue.state}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ShowList