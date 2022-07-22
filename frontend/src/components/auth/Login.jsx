import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import { AuthContext } from '../../shared/context/auth-context'

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'

const Login = () => {
  const auth = useContext(AuthContext)
  const navigate = useNavigate()

  const [ errorMsg, setErrorMsg ] = useState({
    email: '',
    password: '',
  })
  const [ formData, setFormData ] = useState({
    email: '',
    password: '',
  })
  const { email, password } = formData

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post(
      'http://localhost:8000/api/users/login/',
      {
        email,
        password
      },
      {
        'Content-Type': 'application/json',
      }
    )
    .then(res => {
      auth.login(res.data.userid, res.data.token)
    })
    .catch(err => setErrorMsg(err.response.data))
    // .catch(err => console.log(err))
  }

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    if(auth.isLoggedIn) {
      navigate("/betting-table")
    }
  })

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
    >
      <form onSubmit={handleSubmit}>
        <Card sx={{ mt: 20, p: 5, width: 500 }} >
          <CardHeader
            avatar={
              <img src="./logo.png" width="100px" alt="betsniper" loading="lazy" />
            }
            title="Welcome to Betsniper"
            titleTypographyProps={{variant: 'h6'}}
            subheader="Login to view betting table"
          />
          <CardContent>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              type="email"
              variant="outlined"
              size="small"
              sx={{ my: 1 }}
              value={email}
              onChange={onChange}
              error={!!errorMsg?.email}
              helperText={errorMsg?.email}
            />
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              variant="outlined"
              size="small"
              sx={{ my: 1 }}
              value={password}
              onChange={onChange}
              error={!!errorMsg?.password}
              helperText={errorMsg?.password}
            />
          </CardContent>
          <CardActions>
            <Grid container justifyContent="space-around">
              <Button variant="contained" type="submit">Login</Button>
              <Button variant="outlined" onClick={() => navigate('/signup')}>Signup</Button>
            </Grid>
          </CardActions>
        </Card>
      </form>
    </Grid>
  );
}

export default Login;
