import React, {useContext} from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { ExitToApp } from '@material-ui/icons';
import {AppContext} from '../../context/AppProvider'

const LeftNavbar = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
    >
      <img alt="logo" style={{ width: '64px', height: '64px' }} src="/logo.svg" />
      <Typography variant="h6" style={{ marginLeft: '30px' }}>
        BIP Admin
      </Typography>
    </div>
  )
}

const RightNavbar = ({dispatch}) => {
  const logout = () => {
    localStorage.removeItem('token')
		dispatch({type: "LOGOUT"})
  }
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        marginRight: '16px',
      }}
    >
      <IconButton color="primary" onClick={logout}>
        <ExitToApp/>
      </IconButton>
    </div>
  )
}

const Navbar = () => {
  const {dispatch} = useContext(AppContext) 
  return (
    <Grid container>
      <AppBar position="static">
        <Toolbar disableGutters>
          <Grid item xs={3}>
            <LeftNavbar />
          </Grid>
          <Grid item xs={6}>
          </Grid>
          <Grid item xs={3}>
            <RightNavbar dispatch={dispatch}/>
          </Grid>
        </Toolbar>
      </AppBar>
    </Grid>
  )
}

export default Navbar