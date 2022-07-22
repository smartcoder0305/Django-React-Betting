import React from 'react'
import Box from '@mui/material/Box'
import { Helmet } from 'react-helmet'

const PageNotFound = () => {
  return (
    <Box component='h1'>
      Page Not Found!
      <Helmet>
        <meta name="prerender-status-code" content="404" />
      </Helmet>
    </Box>
  )
}

export default PageNotFound