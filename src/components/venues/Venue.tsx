import React, { useState, useEffect, useContext } from 'react'
import { useParams, Link as RouterLink } from 'react-router-dom'
import axios, { AxiosResponse } from 'axios'
import { IShow } from '../shows/Show'
import {
  LinearProgress,
  TableContainer,
  Paper,
  Table,
  TableRow,
  TableCell,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Button,
} from '@material-ui/core'
import Moment from 'react-moment'
import PageHeading from './../shared/PageHeading'
import VenueForm from './VenueForm'
import { AppContext } from '../../context/AppProvider'
import ListShows from '../shows/ListShows'
import HtmlHead from '../shared/HtmlHead'
import { IVenue } from '../../stores/venues/types'

const Venue: React.FC = () => {
  const params = useParams()
  const [loading, setLoading] = useState(false)
  const [venue, setVenue] = useState<IVenue | undefined>(undefined)
  const [shows, setShows] = useState<IShow[]>([])
  const [formOpen, setFormOpen] = useState(false)
  const [id, setId] = useState('')
  const { state } = useContext(AppContext)
  const { currentUser } = state
  const admin = currentUser?.roles.includes('admin')

  const handleOpen = (type: string, id: string) => {
    setId(id)
    setFormOpen(true)
  }

  const handleClose = (type: string) => {
    setFormOpen(false)
    setTimeout(() => setId(''), 500)
  }

  useEffect(() => {
    setLoading(true)
    const fetchVenue = async () => {
      const venue: AxiosResponse = await axios.get(
        `${process.env.REACT_APP_API_URL}/venues/${params.id}`,
      )
      setVenue(venue.data)

      const shows: AxiosResponse = await axios.get(
        `${process.env.REACT_APP_API_URL}/shows?venue=${params.id}`,
      )
      setShows(shows.data)

      setLoading(false)
    }
    fetchVenue()
  }, [params.id, state.venues])
  return (
    <>
      {venue && (
        <>
          <HtmlHead
            title={`${venue.name} - ${venue.city}, ${venue.state}`}
            description={`Get a list of every time the Disco Biscuits have played at ${venue.name}`}
          />
          <Grid container justify="space-between">
            <Grid item>
              <PageHeading text={venue.name} />
            </Grid>
            <Grid item>
              {admin && (
                <div style={{ alignContent: 'right' }}>
                  <Button onClick={() => handleOpen('form', venue.id)}>
                    Edit Venue
                  </Button>
                </div>
              )}
            </Grid>
          </Grid>
          <Dialog open={formOpen} onClose={() => handleClose('form')}>
            <DialogTitle>Edit Venue</DialogTitle>
            <DialogContent>
              <VenueForm id={id} handleClose={() => handleClose('form')} />
            </DialogContent>
          </Dialog>

          <TableContainer component={Paper}>
            <Table>
              <TableRow>
                <TableCell>Location</TableCell>
                <TableCell>
                  {venue.city}, {venue.state}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Times played</TableCell>
                <TableCell>{venue.times_played}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>First played</TableCell>
                <TableCell>
                  {venue.first_played_show && (
                    <Link
                      component={RouterLink}
                      to={`/shows/${venue.first_played_show.slug}`}
                    >
                      <Moment format="M/DD/YYYY">
                        {venue.first_played_show.date}
                      </Moment>
                    </Link>
                  )}
                  {venue.first_played_show &&
                    venue.first_played_show.relisten_url && (
                      <>
                        <span> </span>
                        <Link
                          href={venue.first_played_show.relisten_url}
                          target="blank"
                        >
                          <img src="/relisten.png" alt="relisten" />
                        </Link>
                      </>
                    )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Last played</TableCell>
                <TableCell>
                  {venue.last_played_show && (
                    <Link
                      component={RouterLink}
                      to={`/shows/${venue.last_played_show.slug}`}
                    >
                      <Moment format="M/DD/YYYY">
                        {venue.last_played_show.date}
                      </Moment>
                    </Link>
                  )}
                  {venue.last_played_show &&
                    venue.last_played_show.relisten_url && (
                      <>
                        <span> </span>
                        <Link
                          href={venue.last_played_show.relisten_url}
                          target="blank"
                        >
                          <img src="/relisten.png" alt="relisten" />
                        </Link>
                      </>
                    )}
                </TableCell>
              </TableRow>
            </Table>
          </TableContainer>

          <div style={{ height: 30 }}></div>

          <ListShows shows={shows} />

          {loading && (
            <>
              <div style={{ height: 30 }}></div>
              <LinearProgress />
              <div style={{ height: 30 }}></div>
            </>
          )}
        </>
      )}
    </>
  )
}
export default Venue
