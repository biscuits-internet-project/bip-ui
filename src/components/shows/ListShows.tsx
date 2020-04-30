import React, { memo, useContext } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import Setlist from './Setlist'
import { IShow } from './Show'
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Link,
  Box,
  Button,
} from '@material-ui/core'
import Moment from 'react-moment'
import { AppContext } from '../../context/AppProvider'
import SawItSwitch from './SawItSwitch'
import Rating from './Rating'
import FavoriteSwitch from './FavoriteSwitch'
import moment from 'moment'

const ListShows = ({ shows }) => {
  const { state, dispatch } = useContext(AppContext)
  const { currentUser } = state

  const toggleView = (viewSetlists) => {
    dispatch({ type: 'TOGGLE_VIEW_SETLISTS', payload: viewSetlists })
  }

  return (
    <>
      <Box style={{ marginTop: 10, marginBottom: 10, textAlign: 'right' }}>
        <Button onClick={() => toggleView(!state.viewSetlists)}>
          {state.viewSetlists ? 'View Compact List' : 'View Setlists'}
        </Button>
      </Box>

      {state.viewSetlists ? (
        <>
          {shows.map((show: IShow) => {
            return (
              <React.Fragment key={show.slug}>
                <div id={moment(show.date).format('MMM')}></div>
                <Setlist key={show.id} show={show} />
              </React.Fragment>
            )
          })}
        </>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Venue</TableCell>
                <TableCell>Relisten</TableCell>
                {currentUser && (
                  <>
                    <TableCell>Saw it</TableCell>
                    <TableCell>Rating</TableCell>
                    <TableCell>Favorite</TableCell>
                  </>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {shows.map((show: IShow) => (
                <TableRow key={show.slug} id={moment(show.date).format('MMM')}>
                  <TableCell>
                    <Link component={RouterLink} to={`/shows/${show.slug}`}>
                      <Moment format="M/D/YY">{show.date}</Moment>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link
                      component={RouterLink}
                      to={`/venues/${show.venue.slug}`}
                    >
                      {show.venue.name}
                      <br />
                      {show.venue.city}
                      <span>, </span>
                      {show.venue.state}
                    </Link>
                  </TableCell>
                  <TableCell>
                    {show.relisten_url && (
                      <Link href={show.relisten_url} target="blank">
                        <img src="/relisten.png" alt="relisten" />
                      </Link>
                    )}
                  </TableCell>
                  {currentUser && (
                    <>
                      <TableCell>
                        <SawItSwitch
                          showId={show.id}
                          currentUser={currentUser}
                        />
                      </TableCell>
                      <TableCell>
                        <Rating
                          rateable_id={show.id}
                          rateable_type="Show"
                          currentUser={currentUser}
                        />
                      </TableCell>
                      <TableCell>
                        <FavoriteSwitch
                          showId={show.id}
                          currentUser={currentUser}
                        />
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  )
}

export default memo(
  ListShows,
  (prev, next) => prev.shows.length === next.shows.length,
)
