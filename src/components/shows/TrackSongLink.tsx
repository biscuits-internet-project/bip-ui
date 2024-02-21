import React, { useState, useContext } from 'react'
import { ITrack } from './Tracklist'
import { Link as RouterLink } from 'react-router-dom'
import {
  Popover,
  Typography,
  Link,
  makeStyles,
  Theme,
  createStyles,
  ClickAwayListener,
  Chip,
  Grid,
} from '@material-ui/core'
import Paragraph from '../shared/Paragraph'
import { AppContext } from '../../context/AppProvider'
import Rating from './Rating'
import StarIcon from '@material-ui/icons/Star'
import Moment from 'react-moment'
import { IShow } from './Show'

interface Props {
  track: ITrack
  show: IShow
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: 20,
      width: 350,
      backgroundColor: '#212121',
      //color: "#e6b800"
    },
    popover: {},
    jamchart: {
      backgroundColor: '#333333', //purple[700],
      padding: 4,
    },
  }),
)

const TrackSongLink: React.FC<Props> = ({ show, track }) => {
  const { state } = useContext(AppContext)
  const [openedPopoverId, setOpenedPopoverId] = useState<string | null>(null)
  const [anchorEl, setAnchorEl] = useState(null)
  const classes = useStyles()

  const handlePopoverOpen = (event, trackSlug) => {
    event.preventDefault()
    setAnchorEl(event.currentTarget)
    setOpenedPopoverId(trackSlug)
  }

  const handleClickAway = () => {
    setOpenedPopoverId(null)
    setAnchorEl(null)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
    setOpenedPopoverId(null)
  }

  return (
    <>
      <span className={track.note ? classes.jamchart : ''}>
        <ClickAwayListener onClickAway={handleClickAway}>
          <Link
            component={RouterLink}
            to="#"
            onClick={(e) => handlePopoverOpen(e, track.slug)}
          >
            {track.song_title}
          </Link>
        </ClickAwayListener>
        <Popover
          id={track.slug}
          className={classes.popover}
          classes={{
            paper: classes.paper,
          }}
          open={openedPopoverId === track.slug}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'center',
            horizontal: 'center',
          }}
          onClose={handlePopoverClose}
        >
          <>
            <Grid
              container
              justify="space-between"
              style={{ marginBottom: 10 }}
            >
              <Grid item>
                <Typography>
                  <Link component={RouterLink} to={`/songs/${track.song_slug}`}>
                    {track.song_title}
                  </Link>
                  {' - '}
                  <Moment format="M/D/YY">{show.date}</Moment>
                </Typography>
              </Grid>
              <Grid item>
                <Chip
                  icon={<StarIcon />}
                  label={
                    track.average_rating === 0 ? '-' : track.average_rating
                  }
                  size="small"
                />
              </Grid>
            </Grid>

            {state.currentUser ? (
              <Grid container>
                <Grid item>Your rating: &nbsp;&nbsp;</Grid>
                <Grid>
                  <Rating
                    rateable_id={track.id}
                    rateable_type="Track"
                    currentUser={state.currentUser}
                  />
                </Grid>
              </Grid>
            ) : (
              <Link component={RouterLink} to="/login">
                Login to add ratings
              </Link>
            )}

            {track.note && (
              <Paragraph style={{ marginTop: 20 }}>
                {track.note.split('\n').map((item, key) => {
                  return (
                    <span key={key}>
                      {item}
                      <br />
                    </span>
                  )
                })}
              </Paragraph>
            )}
          </>
        </Popover>
      </span>
    </>
  )
}

export default TrackSongLink
