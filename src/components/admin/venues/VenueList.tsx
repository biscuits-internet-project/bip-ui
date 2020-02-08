import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import {IVenue} from '../../Venues'

interface IVenueList {
  venues: IVenue[]
  handleOpen: (id?: string) => void
  handleDelete: (id?: string) => void
}

const VenueList:React.FC<IVenueList> = ({venues,handleOpen,handleDelete}) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>City</TableCell>
            <TableCell>State</TableCell>
            <TableCell></TableCell>
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
              <TableCell align='right'>
                <CreateIcon color="secondary" style={{margin: "0px 8px", cursor: "pointer"}} fontSize="small" onClick={()=>handleOpen(venue.slug)}/>
                <DeleteIcon color="secondary" style={{margin: "0px 8px", cursor: "pointer"}} fontSize="small" onClick={()=>handleDelete(venue.slug)}/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default VenueList