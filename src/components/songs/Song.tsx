import React, { useState, useEffect, useContext } from 'react'
import { Link as RouterLink, useParams } from 'react-router-dom'
import axios, { AxiosResponse } from 'axios'
import { IVenue } from '../../stores/venues/types'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import {
  Link,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
} from '@material-ui/core'
import Moment from 'react-moment'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import PageHeading from '../shared/PageHeading'
import { AppContext } from '../../context/AppProvider'
import SongForm from './SongForm'
import Paragraph from '../shared/Paragraph'
import HtmlHead from '../shared/HtmlHead'
import ProgressBar from '../shared/ProgressBar'
import { ISong } from '../../stores/songs/types'
import { useSelector, useDispatch } from 'react-redux'
import { songsSelector } from '../../stores/songs/selectors'

interface ITrack {
  id: string
  annotations: string[]
  position: number
  segue: string
  set: string
  venue: IVenue
  show: IShow
  note: string
  all_timer: boolean
  previous_track?: ITrack
  next_track?: ITrack
  song?: ISong
  song_id: string
}

interface IShow {
  date: Date
  notes?: string
  slug: string
  venue: IVenue
  relisten_url?: string
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  }),
)

const Song: React.FC = () => {
  const { state, dispatch } = useContext(AppContext)
  const classes = useStyles()
  const params = useParams()
  const [loading, setLoading] = useState(false)
  const [song, setSong] = useState<ISong | undefined>(undefined)
  const [formOpen, setFormOpen] = useState(false)
  const [id, setId] = useState('')
  const [songsPlayed, setTracks] = useState<ITrack[]>([])
  const [allTimers, setAllTimers] = useState<ITrack[]>([])
  const [jamCharts, setJamCharts] = useState<ITrack[]>([])
  const [displayTracks, setDisplayTracks] = useState<ITrack[]>([])
  const { currentUser } = state
  const admin = currentUser?.roles.includes('admin')
  const songs = useSelector(songsSelector)

  const initViewJamCharts = state.viewJamCharts ? true : false

  const handleOpen = (type: string, id: string) => {
    setId(id)
    type === 'form' ? setFormOpen(true) : setDeleteOpen(true)
  }

  const handleClose = (type: string) => {
    type === 'form' ? setFormOpen(false) : setDeleteOpen(false)
    setFormOpen(false)
    setTimeout(() => setId(''), 500)
  }

  const setDeleteOpen = (type) => {
    type === 'form' ? setFormOpen(false) : setDeleteOpen(false)
    setFormOpen(false)
    setTimeout(() => setId(''), 500)
  }

  const toggleView = (jamcharts) => {
    if (jamcharts) {
      setDisplayTracks(jamCharts)
    } else {
      setDisplayTracks(songsPlayed)
    }
    dispatch({ type: 'TOGGLE_VIEW_JAM_CHARTS', payload: jamcharts })
  }

  useEffect(() => {
    setLoading(true)
    if (songs.length === 0) {
      return
    }
    const fetchSong = async () => {
      const song: AxiosResponse = await axios.get(
        `${process.env.REACT_APP_API_URL}/songs/${params.id}`,
      )
      setSong(song.data)

      const resp: AxiosResponse = await axios.get(
        `${process.env.REACT_APP_API_URL}/tracks/songs/${params.id}`,
      )

      let tracks: ITrack[] = resp.data

      tracks.forEach((track) => {
        if (track.previous_track) {
          track.previous_track.song = songs.find(
            (s) => s.id === track.previous_track?.song_id,
          )
        }
        if (track.next_track) {
          track.next_track.song = songs.find(
            (s) => s.id === track.next_track?.song_id,
          )
        }
      })
      setTracks(tracks)

      const allTimers = tracks.filter((x) => x.all_timer)
      setAllTimers(allTimers)
      const jamCharts = tracks.filter((x) => x.note != null && x.note !== '')
      setJamCharts(jamCharts)

      if (initViewJamCharts) {
        setDisplayTracks(jamCharts)
      } else {
        setDisplayTracks(tracks)
      }

      setLoading(false)
    }
    fetchSong()
  }, [initViewJamCharts, params.id, songs])

  return (
    <>
      {song && (
        <>
          <HtmlHead
            title={song.title}
            description="Lyrics, history, and a list of every time played."
          />
          <Grid container justify="space-between">
            <Grid item>
              <PageHeading text={song.title} />
            </Grid>
            <Grid item>
              {admin && (
                <div style={{ alignContent: 'right' }}>
                  <Button onClick={() => handleOpen('form', song.id)}>
                    Edit Song
                  </Button>
                </div>
              )}
            </Grid>
          </Grid>
          <Dialog open={formOpen} onClose={() => handleClose('form')}>
            <DialogTitle>Edit Song</DialogTitle>
            <DialogContent>
              <SongForm id={id} handleClose={() => handleClose('form')} />
            </DialogContent>
          </Dialog>

          {song.featured_lyric && (
            <>
              <Paragraph>
                <em>{song.featured_lyric}</em>
              </Paragraph>
              <div style={{ height: 20 }}></div>
            </>
          )}

          <TableContainer component={Paper}>
            <Table>
              <TableRow>
                <TableCell>Author</TableCell>
                <TableCell>{song.author_name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Times played</TableCell>
                <TableCell>
                  {song.times_played} (
                  {(song.shows_since_last_played || 0) > 0
                    ? `${song.shows_since_last_played} shows ago`
                    : 'last show'}
                  )
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Debut</TableCell>
                <TableCell>
                  {song.first_played_show && (
                    <Link
                      component={RouterLink}
                      to={`/shows/${song.first_played_show.slug}`}
                    >
                      <Moment format="M/D/YY">
                        {song.first_played_show.date}
                      </Moment>
                      <span> - </span>
                      {song.first_played_show.venue.name}
                      <span> - </span>
                      {song.first_played_show.venue.city}
                      <span>, </span>
                      {song.first_played_show.venue.state}
                    </Link>
                  )}
                  {song.first_played_show &&
                    song.first_played_show.relisten_url && (
                      <>
                        <span
                          style={{ paddingLeft: 12, verticalAlign: 'middle' }}
                        >
                          <Link
                            href={song.first_played_show.relisten_url}
                            target="blank"
                          >
                            <img src="/relisten.png" alt="relisten" />
                          </Link>
                        </span>
                      </>
                    )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Last played</TableCell>
                <TableCell>
                  {song.last_played_show && (
                    <Link
                      component={RouterLink}
                      to={`/shows/${song.last_played_show.slug}`}
                    >
                      <Moment format="M/D/YY">
                        {song.last_played_show.date}
                      </Moment>
                      <span> - </span>
                      {song.last_played_show.venue.name}
                      <span> - </span>
                      {song.last_played_show.venue.city}
                      <span>, </span>
                      {song.last_played_show.venue.state}
                    </Link>
                  )}

                  {song.last_played_show && song.last_played_show.relisten_url && (
                    <>
                      <span
                        style={{ paddingLeft: 12, verticalAlign: 'middle' }}
                      >
                        <Link
                          href={song.last_played_show.relisten_url}
                          target="blank"
                        >
                          <img src="/relisten.png" alt="relisten" />
                        </Link>
                      </span>
                    </>
                  )}
                </TableCell>
              </TableRow>
              {song.notes && (
                <TableRow>
                  <TableCell>Notes</TableCell>
                  <TableCell>{song.notes}</TableCell>
                </TableRow>
              )}
              {allTimers.length > 0 && (
                <TableRow>
                  <TableCell>All Timers</TableCell>
                  <TableCell>
                    {allTimers.map((allTimer) => {
                      return (
                        <Typography key={allTimer.show.slug}>
                          <Link
                            component={RouterLink}
                            to={`/shows/${allTimer.show.slug}`}
                          >
                            <Moment format="M/D/YY">
                              {allTimer.show.date}
                            </Moment>
                            <span> - </span>
                            {allTimer.show.venue.name}
                            <span> - </span>
                            {allTimer.show.venue.city}
                            <span>, </span>
                            {allTimer.show.venue.state}
                          </Link>
                        </Typography>
                      )
                    })}
                  </TableCell>
                </TableRow>
              )}
            </Table>
          </TableContainer>

          <div style={{ height: 20 }}></div>

          {song.lyrics && (
            <ExpansionPanel>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.heading}>Lyrics</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Paragraph dangerouslySetInnerHTML={{ __html: song.lyrics }} />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          )}

          {song.history && (
            <ExpansionPanel>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.heading}>History</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography
                  dangerouslySetInnerHTML={{ __html: song.history }}
                />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          )}
          {song.tabs && (
            <ExpansionPanel>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.heading}>Guitar Tabs</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Paragraph dangerouslySetInnerHTML={{ __html: song.tabs }} />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          )}

          <div style={{ height: 20 }}></div>
        </>
      )}

      <Box style={{ marginTop: 0, marginBottom: 10, textAlign: 'right' }}>
        <Button onClick={() => toggleView(!state.viewJamCharts)}>
          {state.viewJamCharts ? 'View All' : 'View Jam Charts'}
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Show</TableCell>
              <TableCell>Song Before</TableCell>
              <TableCell>Song After</TableCell>
              <TableCell>Notes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayTracks.map((track: ITrack) => (
              <TableRow key={track.id}>
                <TableCell>
                  <Link component={RouterLink} to={`/shows/${track.show.slug}`}>
                    <Typography>
                      <Moment format="M/D/YY">{track.show.date}</Moment>
                    </Typography>
                    <Typography>
                      {track.venue.name}
                      <br />
                      {track.venue.city}
                      <span>, </span>
                      {track.venue.state}
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
                <TableCell>
                  {track.previous_track && (
                    <>
                      <Link
                        component={RouterLink}
                        to={`/songs/${track.previous_track.song?.slug}`}
                      >
                        {track.previous_track?.song?.title}
                      </Link>{' '}
                      {track.previous_track?.segue}
                    </>
                  )}
                </TableCell>
                <TableCell>
                  {track.next_track && (
                    <>
                      {track.segue} {''}
                      <Link
                        component={RouterLink}
                        to={`/songs/${track.next_track.song?.slug}`}
                      >
                        {track.next_track?.song?.title}
                      </Link>
                    </>
                  )}
                </TableCell>
                <TableCell>{track.note}</TableCell>
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
