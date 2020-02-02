import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {IVenue} from '../../Venues'

const VenueList:React.FC<{venues: IVenue[]}> = ({venues}) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>City</TableCell>
            <TableCell>State</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {venues.map((venue: IVenue) => (
            <TableRow key={venue.id}>
              <TableCell>
                {venue.name}
              </TableCell>
              <TableCell>
                {venue.city}
              </TableCell>
              <TableCell>
                {venue.state}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default VenueList