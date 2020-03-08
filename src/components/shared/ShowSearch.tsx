import React, { useState } from 'react'
import { makeStyles, Theme, createStyles, Paper, InputBase, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import axios, { AxiosResponse } from 'axios'
import { IShow } from '../shows/Show';

interface ISearch {
  setShows: (setlists: IShow[]) => void
  setLoading: (boolean) => void
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      height: 40,
      marginBottom: 20
    },
    input: {
      marginLeft: theme.spacing(1),
      fontSize: 15,
      flex: 1,
    },
    iconButton: {
      padding: 0,
    },
  }),
);

const ShowSearch: React.FC<ISearch> = ({setShows, setLoading}) => {
  const [search, setSearch] = useState("")
  const classes = useStyles();

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  }
  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearchClick()
    }
  }

  const handleSearchClick = () => {
    if (search === "") {
      return
    }
    setLoading(true)
    const searchShows = async () => {
      setShows([])
      const data: AxiosResponse = await axios.get(`${process.env.REACT_APP_API_URL}/shows?search=${search}`)
      setShows(data.data)
      setLoading(false)
    }
    searchShows()
  }
  return (
    <Paper className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Search by date, venue, city, state, song, photos, youtube, relisten..."
        onKeyDown={handleSearchKeyDown}
        onChange={handleSearchChange}
        fullWidth={true}
        inputProps={{ 'aria-label': 'search' }}
      />
      <IconButton onClick={handleSearchClick} className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  )
}

export default ShowSearch