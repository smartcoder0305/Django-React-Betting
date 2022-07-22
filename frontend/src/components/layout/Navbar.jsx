import React, { useContext } from 'react'

import { AuthContext } from '../../shared/context/auth-context'

import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import AccountCircle from '@mui/icons-material/AccountCircle'
import ExitToApp from '@mui/icons-material/ExitToApp'

const Navbar = () => {

  const auth = useContext(AuthContext)

  const handleLogout = () => {
    auth.logout()
  }

  return (
    <Box sx={{display: 'flex', marginBottom: '64px'}} >
      <AppBar component="nav">
        <Toolbar sx={{backgroundColor: '#394A54'}}>
          <Box component="div" sx={{flexGrow: 1}}>
            <Grid container alignItems={'center'}>
              <img src="./logo.png" width="50px" alt="betsniper" loading="lazy" />
              <Typography variant="h5">Betsniper</Typography>
            </Grid>
          </Box>
          {
            auth.isLoggedIn &&
            <Box >
              <Button size="small" sx={{color: 'white'}}>
                <AccountCircle />My Account
              </Button>
              <Button size="small" sx={{color: 'white'}} onClick={handleLogout}>
                <ExitToApp />Log Out
              </Button>
            </Box>
          }
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar