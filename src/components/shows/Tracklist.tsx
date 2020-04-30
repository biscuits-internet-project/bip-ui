import React from 'react'
import { Typography, makeStyles, createStyles, Box } from '@material-ui/core'
import { v4 as uuidv4 } from 'uuid'
import TrackSongLink from './TrackSongLink'
import { IShow } from './Show'

export interface ITracklist {
  show: IShow
}

export interface ITrack {
  id: string
  slug: string
  note: ''
  all_timer: false
  song_title: string
  song_slug: string
  song_id: string
  segue: string
  position: number
  set: string
  annotations: string[]
  annotations_with_newlines: string
  average_rating: number
}

const useStyles = makeStyles(() =>
  createStyles({
    annotations: {
      fontStyle: 'italic',
      marginTop: 8,
    },
    set: {
      marginTop: 8,
    },
  }),
)

const Tracklist: React.FC<ITracklist> = ({ show }) => {
  const classes = useStyles()
  let annLookup = {}

  const orderTracks = (tracks) => {
    let sets = {}
    tracks.forEach((track) => {
      if (!sets[track.set]) {
        sets[track.set] = []
      }
      sets[track.set].push(track)

      track.annotations.forEach((ann) => {
        if (!annLookup.hasOwnProperty(ann)) {
          annLookup[ann] = Object.keys(annLookup).length + 1
        }
      })
    })
    return sets
  }
  let sets = orderTracks(show.tracks)

  return (
    <div>
      {Object.keys(sets).map((key) => {
        return (
          <Typography key={uuidv4()} className={classes.set}>
            <span style={{ paddingRight: 6 }}>{key} </span>
            {sets[key].map((track: ITrack, index: number) => {
              return (
                <span key={uuidv4()} style={{ lineHeight: 2 }}>
                  <TrackSongLink track={track} show={show} />

                  {track.annotations.map((a, i) => {
                    return <sup key={i}> {annLookup[a]}</sup>
                  })}
                  {track.segue && (
                    <span style={{ paddingRight: 4, paddingLeft: 4 }}>
                      {' '}
                      {track.segue}{' '}
                    </span>
                  )}
                  {track.segue === '' && sets[key].length > index + 1 && (
                    <span style={{ paddingRight: 8 }}>, </span>
                  )}
                </span>
              )
            })}
          </Typography>
        )
      })}

      {annLookup &&
        Object.keys(annLookup).map(function (key) {
          return (
            <Box key={key} className={classes.annotations}>
              <strong>{annLookup[key]}</strong> {key}
            </Box>
          )
        })}
    </div>
  )
}

export default Tracklist
