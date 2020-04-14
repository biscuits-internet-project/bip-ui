import React, { useContext, useEffect, useState } from 'react'
import PageHeading from '../shared/PageHeading'
import { AppContext } from '../../context/AppProvider'
import { IShow } from '../shows/Show'
import axios, { AxiosResponse } from 'axios'
import ListShows from '../shows/ListShows'
import {
  TableContainer,
  Paper,
  Table,
  TableRow,
  TableCell,
} from '@material-ui/core'
import ProgressBar from '../shared/ProgressBar'

const UserShows: React.FC = () => {
  const { state } = useContext(AppContext)
  const { currentUser } = state
  const [loading, setLoading] = useState(false)
  const [shows, setShows] = useState<IShow[]>([])
  const [ratingAvg, setRatingAvg] = useState(0)

  useEffect(() => {
    setLoading(true)
    const fetchShows = async () => {
      const resp: AxiosResponse = await axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}/shows/user`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: currentUser?.token,
        },
      })
      setShows(resp.data)
    }
    fetchShows()
    setLoading(false)

    if (state.ratings.length > 0) {
      setRatingAvg(
        Math.round(
          (state.ratings.map((r) => r.value).reduce((a, b) => a + b, 0) /
            state.ratings.length) *
            10,
        ) / 10,
      )
    } else {
      setRatingAvg(0)
    }
  }, [currentUser, state.attendances, state.favorites, state.ratings])

  return (
    <>
      <PageHeading text="My Shows" />

      <TableContainer component={Paper}>
        <Table>
          <TableRow>
            <TableCell style={{ width: '20%' }}>Attended:</TableCell>
            <TableCell>{state.attendances.length}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Rated:</TableCell>
            <TableCell>{state.ratings.length}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Average Rating:</TableCell>
            <TableCell>{ratingAvg}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Favorites:</TableCell>
            <TableCell>{state.favorites.length}</TableCell>
          </TableRow>
        </Table>
      </TableContainer>

      <ListShows shows={shows} />

      {loading && <ProgressBar />}
    </>
  )
}

export default UserShows
