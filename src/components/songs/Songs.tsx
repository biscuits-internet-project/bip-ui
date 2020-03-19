import React, { useState, useEffect, useContext } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  Link,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@material-ui/core'
import MUIDataTable from 'mui-datatables'
import PageHeading from '../shared/PageHeading'
import SongForm from './SongForm'
import { ISong } from './Song'
import { AppContext } from '../../context/AppProvider'
import Moment from 'react-moment'
import HtmlHead from '../shared/HtmlHead'
import { useSelector } from 'react-redux'
import { songsSelector } from '../../stores/songs/selectors'

const Songs: React.FC = () => {
  const { state } = useContext(AppContext)
  const { currentUser } = state
  const admin = currentUser?.roles.includes('admin')
  const [formOpen, setFormOpen] = useState(false)
  const songs = useSelector(songsSelector)

  const handleOpen = () => {
    setFormOpen(true)
  }

  const handleClose = () => {
    setFormOpen(false)
  }

  const columns = [
    {
      name: 'Title',
      options: {
        filter: false,
        sort: true,
        sortDirection: 'none',
        searchable: true,
        customBodyRender: (value) => {
          return (
            <Link component={RouterLink} to={`/songs/${value[0]}`}>
              {value[1]}
            </Link>
          )
        },
      },
    },
    {
      name: 'Author',
      options: {
        filter: true,
        sort: true,
        sortDirection: 'none',
        searchable: true,
      },
    },
    {
      name: 'Original',
      options: {
        display: false,
        filter: true,
        sort: false,
        searchable: false,
      },
    },
    {
      name: 'Times Played',
      options: {
        filter: false,
        sort: true,
        sortDirection: 'desc',
        searchable: true,
      },
    },
    {
      name: 'Last Played',
      options: {
        filter: false,
        sort: true,
        searchable: false,
        customBodyRender: (value) => {
          return <Moment format="M/D/YY">{value}</Moment>
        },
      },
    },
  ]

  const options = {
    responsive: 'scrollFullHeight',
    filterType: 'multiselect',
    pagination: true,
    print: false,
    download: false,
    selectableRows: 'none',
    selectableRowsHeader: false,
    searchOpen: true,
    viewColumns: false,
    rowsPerPage: 150,
    rowsPerPageOptions: [150, 300, 600],
    customSort: (data, colIndex, order) => {
      return data.sort((a, b) => {
        if (colIndex === 0) {
          return (
            (a.data[colIndex][1].toLowerCase() <
            b.data[colIndex][1].toLowerCase()
              ? -1
              : 1) * (order === 'desc' ? 1 : -1)
          )
        } else if (colIndex === 1) {
          return (
            ((a.data[colIndex] ?? '').toLowerCase() <
            (b.data[colIndex] ?? '').toLowerCase()
              ? -1
              : 1) * (order === 'desc' ? 1 : -1)
          )
        } else if (colIndex === 4) {
          return (
            (new Date(a.data[colIndex]) < new Date(b.data[colIndex]) ? -1 : 1) *
            (order === 'desc' ? 1 : -1)
          )
        } else {
          return (
            (a.data[colIndex] < b.data[colIndex] ? -1 : 1) *
            (order === 'asc' ? 1 : -1)
          )
        }
      })
    },
  }

  const data = songs.map((s: ISong) => [
    [s.slug, s.title],
    s.author_name,
    s.cover ? 'cover' : 'original',
    s.times_played,
    s.date_last_played,
  ])

  return (
    <>
      <HtmlHead
        title="Song List"
        description="Search and sort a comprehensive list of Disco Biscuits originals and covers."
      />
      <Grid container justify="space-between">
        <Grid item>
          <PageHeading text="Songs" />
        </Grid>
        <Grid item>
          {admin && (
            <div style={{ alignContent: 'right' }}>
              <Button onClick={() => handleOpen()}>Add Song</Button>
            </div>
          )}
        </Grid>
      </Grid>
      <MUIDataTable data={data} columns={columns} options={options} />

      <Dialog open={formOpen} onClose={() => handleClose()}>
        <DialogTitle>Add Song</DialogTitle>
        <DialogContent>
          <SongForm id="" handleClose={() => handleClose()} />
        </DialogContent>
      </Dialog>
    </>
  )
}
export default Songs
