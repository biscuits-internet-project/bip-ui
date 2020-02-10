import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CreateIcon from '@material-ui/icons/Create';
import {ITrack} from './AdminTracks'

interface ITrackList {
  tracks: ITrack[]
  handleOpen: (type: string, id: string) => void
}

const TrackList:React.FC<ITrackList> = ({tracks,handleOpen}) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Venue</TableCell>
            <TableCell>City</TableCell>
            <TableCell>State</TableCell>
            <TableCell>Note</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tracks.map((track: ITrack) => (
            <TableRow key={track.slug}>
              <TableCell>
                {track.show && track.show.date}
              </TableCell>
              <TableCell>
                {track.venue && track.venue.name}
              </TableCell>
              <TableCell>
                {track.venue && track.venue.city}
              </TableCell>
              <TableCell>
                {track.venue && track.venue.state}
              </TableCell>
              <TableCell>
                {track.note}
              </TableCell>
              <TableCell align='right'>
                <CreateIcon color="secondary" style={{margin: "0px 8px", cursor: "pointer"}} fontSize="small" onClick={()=>handleOpen('form', track.slug, )}/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TrackList