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

const Signup = () => {
  const navigate = useNavigate()
  const auth = useContext(AuthContext)

  const [ formData, setFormData ] = useState({
    email: '',
    password: '',
    confirm_password: ''
  })
  const [ errorMsg, setErrorMsg ] = useState(null)

  const { email, password, confirm_password } = formData

  const handleSubmit = (e) => { 
    e.preventDefault()
    axios.post(
      'http://localhost:8000/api/users/signup/',
      {
        email,
        password1: password,
        password2: confirm_password,
      },
      {
        'Content-Type': 'application/json',
      }
    )
    .then(res => navigate('/login'))
    .catch(err => setErrorMsg(err.response.data))
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
            subheader="Sign up for free"
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
              helperText={errorMsg?.email?.join(" ")}
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
              error={!!errorMsg?.password1}
              helperText={errorMsg?.password1?.join(" ")}
            />
            <TextField
              fullWidth
              id="confirm-password"
              name="confirm_password"
              label="Confirm Password"
              type="password"
              variant="outlined" 
              size="small"
              sx={{ my: 1 }}
              value={confirm_password}
              onChange={onChange}
              error={!!errorMsg?.password2}
              helperText={errorMsg?.password2?.join(" ")}
            />
          </CardContent>
          <CardActions>
            <Grid container justifyContent="space-around">
              <Button variant="contained" type="submit">Submit</Button>
              <Button variant="outlined" onClick={() => navigate('/login')}>Already have an account</Button>
            </Grid>
          </CardActions>
        </Card>
      </form>
    </Grid>
  );
}

export default Signup;
