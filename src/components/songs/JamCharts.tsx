import React, { useState, useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import axios, { AxiosResponse } from 'axios'
import {
  Link,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Grid,
  Typography,
} from '@material-ui/core'
import Moment from 'react-moment'
import PageHeading from '../shared/PageHeading'
import { IShow } from '../shows/Show'
import { ISong } from '../../stores/songs/types'
import HtmlHead from '../shared/HtmlHead'
import ProgressBar from '../shared/ProgressBar'

export interface ITrack {
  annotations: string[]
  position: number
  segue: string
  set: string
  show: IShow
  song: ISong
  note: string
  all_timer: boolean
}

const Song: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [tracks, setTracks] = useState<ITrack[]>([])

  useEffect(() => {
    setLoading(true)
    const fetchSong = async () => {
      const tracks: AxiosResponse = await axios.get(
        `${process.env.REACT_APP_API_URL}/tracks/charts`,
      )
      setTracks(tracks.data)
      setLoading(false)
    }
    fetchSong()
  }, [])
  return (
    <>
      <HtmlHead
        title="Jam Charts"
        description="The most comprehensive notes on Disco Biscuits jams on the internet - or at least it will be!"
      />
      <Grid container justify="space-between">
        <Grid item>
          <PageHeading text="Jam Charts" />
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Song</TableCell>
              <TableCell>Show</TableCell>
              <TableCell>Notes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tracks.map((track: ITrack) => (
              <TableRow style={{ verticalAlign: 'top' }}>
                <TableCell>
                  <Link component={RouterLink} to={`/songs/${track.song.slug}`}>
                    {track.song.title}
                  </Link>
                </TableCell>
                <TableCell component="th" scope="row">
                  <Link component={RouterLink} to={`/shows/${track.show.slug}`}>
                    <Typography>
                      <Moment format="M/D/YY">{track.show.date}</Moment>
                    </Typography>
                    <Typography>
                      {track.show.venue.name}
                      <br />
                      {track.show.venue.city}, {track.show.venue.state}
                    </Typography>
                  </Link>
                  {track.show.relisten_url && (
                    <Typography style={{ marginTop: 6 }}>
                      <Link href={track.show.relisten_url} target="blank">
                        <img src="/relisten.png" alt="relisten" />
                      </Link>
                    </Typography>
                  )}
                </TableCell>
                <TableCell style={{ width: '50%' }}>
                  {track.note.split('\n').map((item, key) => {
                    return (
                      <span key={key}>
                        {item}
                        <br />
                      </span>
                    )
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {loading && <ProgressBar />}
    </>
  )
}
export default Song
