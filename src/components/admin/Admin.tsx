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
} from '@material-ui/core'
import { AppContext } from '../../context/AppProvider'
import axios, { AxiosResponse } from 'axios'
import PageHeading from '../shared/PageHeading'

interface IMetrics {
  total_show_count: number
  ratings_distinct_user_count: number
  ratings_distinct_show_count: number
  user_count: number
  rating_count: number
  review_count: number
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

  const handleDelete = async (id?: string) => {
    const metrics = await axios({
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}/metrics`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: currentUser?.token,
      },
    })
    setMetrics(metrics.data)
  }

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
          <PageHeading text="Admin" />
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
              <TableCell>Ratings Unique User Count</TableCell>
              <TableCell>{metrics.ratings_distinct_user_count}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Ratings Unique Show Count</TableCell>
              <TableCell>{metrics.ratings_distinct_show_count}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Show Rating Count</TableCell>
              <TableCell>{metrics.rating_count}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Show Review Count</TableCell>
              <TableCell>{metrics.review_count}</TableCell>
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
