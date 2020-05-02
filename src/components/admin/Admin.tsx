import React, { useContext, useState, useEffect, useCallback } from 'react'
import { Helmet } from 'react-helmet'
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Avatar,
  Typography,
  Link,
} from '@material-ui/core'
import { AppContext } from '../../context/AppProvider'
import axios, { AxiosResponse } from 'axios'
import PageHeading from '../shared/PageHeading'
import LinkButton from '../shared/LinkButton'

interface IMetrics {
  total_show_count: number
  show_ratings_distinct_user_count: number
  track_ratings_distinct_user_count: number
  ratings_distinct_show_count: number
  ratings_distinct_track_count: number
  track_ratings_count: number
  show_ratings_count: number
  user_count: number
  review_count: number
  review_users_count: number
  sawit_count: number
  favorite_count: number
  blog_post_count: number
  blog_post_comment_count: number
}

const Admin: React.FC = () => {
  const { state } = useContext(AppContext)
  const { currentUser } = state
  const [metrics, setMetrics] = useState<IMetrics | undefined>(undefined)

  useEffect(() => {
    const fetchMetrics = async () => {
      const data: AxiosResponse = await axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}/metrics`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: currentUser?.token,
        },
      })
      setMetrics(data.data)
    }
    fetchMetrics()
  }, [])

  if (metrics === undefined) {
    return <Typography>Loading...</Typography>
  }

  return (
    <>
      <Helmet>
        <title>Biscuits Internet Project - Admin Dashboard</title>
      </Helmet>
      <Grid container justify="space-between">
        <Grid item>
          <PageHeading text="Admin Dashboard" />
        </Grid>
        <Grid item>
          <Link
            underline="none"
            href={`${process.env.REACT_APP_API_URL}/clear`}
            target="blank"
          >
            <Button>Clear Cache</Button>
          </Link>
        </Grid>
      </Grid>

      <Typography variant="h2" style={{ marginTop: 20, marginBottom: 10 }}>
        Metrics
      </Typography>

      <TableContainer>
        <Table style={{ width: 350 }}>
          <TableBody>
            <TableRow>
              <TableCell>User Count</TableCell>
              <TableCell>{metrics.user_count}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Show Count</TableCell>
              <TableCell>{metrics.total_show_count}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Show Ratings</TableCell>
              <TableCell>
                {metrics.show_ratings_distinct_user_count} users
                <br />
                {metrics.ratings_distinct_show_count} shows
                <br />
                {metrics.show_ratings_count} total
                <br />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Track Ratings</TableCell>
              <TableCell>
                {metrics.track_ratings_distinct_user_count} users
                <br />
                {metrics.ratings_distinct_track_count} tracks
                <br />
                {metrics.track_ratings_count} total
                <br />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Show Reviews</TableCell>
              <TableCell>
                {metrics.review_count} reviews
                <br />
                {metrics.review_users_count} users
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Sawit Count</TableCell>
              <TableCell>{metrics.sawit_count}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Favorite Count</TableCell>
              <TableCell>{metrics.favorite_count}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Blog Post Count</TableCell>
              <TableCell>{metrics.blog_post_count}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Blog Post Comment Count</TableCell>
              <TableCell>{metrics.blog_post_comment_count}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default Admin
