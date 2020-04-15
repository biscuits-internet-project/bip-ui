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
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ISongPlayed {
  annotations: string[]
  position: number
  segue: string
  set: string
  venue: IVenue
  show: IShow
  note: string
  all_timer: boolean
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
    chart_container: {
      border: '1px solid #424242',
      'border-radius': `5px`,
      padding: `10px 0px 0px`,
      margin: `20px 0px`,
      [theme.breakpoints.up('md')]: {
        padding: `50px 50px 10px`,
      },
    }

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
  const [songsPlayed, setSongsPlayed] = useState<ISongPlayed[]>([])
  const [allTimers, setAllTimers] = useState<ISongPlayed[]>([])
  const [jamCharts, setJamCharts] = useState<ISongPlayed[]>([])
  const [displayTracks, setDisplayTracks] = useState<ISongPlayed[]>([])
  const { currentUser } = state
  const admin = currentUser?.roles.includes('admin')

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
    const fetchSong = async () => {
      const song: AxiosResponse = await axios.get(
        `${process.env.REACT_APP_API_URL}/songs/${params.id}`,
      )
      setSong(song.data)

      const tracks: AxiosResponse = await axios.get(
        `${process.env.REACT_APP_API_URL}/tracks/songs/${params.id}`,
      )

      setSongsPlayed(tracks.data)
      const allTimers = tracks.data.filter((x) => x.all_timer)
      setAllTimers(allTimers)
      const jamCharts = tracks.data.filter(
        (x) => x.note != null && x.note !== '',
      )
      setJamCharts(jamCharts)

      if (initViewJamCharts) {
        setDisplayTracks(jamCharts)
      } else {
        setDisplayTracks(tracks.data)
      }

      setLoading(false)
    }
    fetchSong()
  }, [initViewJamCharts, params.id])
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

									{song.last_played_show && song.last_played_show.relisten_url &&
										<>
											<span style={{ paddingLeft: 12, verticalAlign: "middle" }}>
												<Link href={song.last_played_show.relisten_url} target="blank">
													<img src="/relisten.png" alt="relisten" />
												</Link>
											</span>
										</>
									}
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>
									Most common year
								</TableCell>
								<TableCell>
									{song.most_common_year}
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>
									Least common year
								</TableCell>
								<TableCell>
									{song.least_common_year}
								</TableCell>
							</TableRow>
							{song.notes &&
								<TableRow>
									<TableCell>
										Notes
									</TableCell>
									<TableCell>
										{song.notes}
									</TableCell>
								</TableRow>
							}
							{allTimers.length > 0 &&
								<TableRow>
									<TableCell>
										All Timers
									</TableCell>
									<TableCell>
										{allTimers.map((allTimer) => {
											return (
												<Typography key={allTimer.show.slug}>
													<Link component={RouterLink} to={`/shows/${allTimer.show.slug}`}>
														<Moment format="M/DD/YYYY">
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
							}
						</Table>
					</TableContainer>

          <div  className={classes.chart_container}>
            <Typography className={classes.heading}>Times Played Per Year</Typography>
	          <ResponsiveContainer height={300} >
							<BarChart data={song.yearly_play_chart_data} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
						    <CartesianGrid strokeDasharray="3 3"/>
						    <XAxis dataKey="name" style={{ fill: '#FFF' }} />
						    <YAxis unit=" plays" angle={-45} yAxisId="left" orientation='left' style={{ fill: '#FFF' }} />
						    <Tooltip cursor={{ fill: "#333" }} labelStyle={{ color: "rgb(187, 134, 252)" }}/>
						    <Legend />
						    <Bar name="Times Played" dataKey="plays" fill="#BB86FC" yAxisId="left" />
					    </BarChart>
					   </ResponsiveContainer>
					</div>

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
                <Paragraph>
                  <div dangerouslySetInnerHTML={{ __html: song.lyrics }} />
                </Paragraph>
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
                <Paragraph>
                  <div dangerouslySetInnerHTML={{ __html: song.tabs }} />
                </Paragraph>
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
              <TableCell>Notes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayTracks.map((s: ISongPlayed) => (
              <TableRow>
                <TableCell>
                  <Link component={RouterLink} to={`/shows/${s.show.slug}`}>
                    <Typography>
                      <Moment format="M/D/YY">{s.show.date}</Moment>
                    </Typography>
                    <Typography>
                      {s.venue.name}
                      <br />
                      {s.venue.city}
                      <span>, </span>
                      {s.venue.state}
                    </Typography>
                  </Link>
                  {s.show.relisten_url && (
                    <Typography style={{ marginTop: 6 }}>
                      <Link href={s.show.relisten_url} target="blank">
                        <img src="/relisten.png" alt="relisten" />
                      </Link>
                    </Typography>
                  )}
                </TableCell>
                <TableCell style={{ width: '70%' }}>{s.note}</TableCell>
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
