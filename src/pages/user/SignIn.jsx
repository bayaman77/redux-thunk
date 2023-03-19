import { Grid, TextField, Button, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { signIn } from '../../store/auth/auth.thunk'

const SignInPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const emailHandler = (e) => {
    setEmail(e.target.value)
    setError('')
  }
  const passwordHandler = (e) => {
    setPassword(e.target.value)
    setError('')
  }

  const submitHandler = (event) => {
    event.preventDefault()

    const data = {
      email,
      password,
    }

    dispatch(signIn(data))
      .unwrap()
      .then(() => navigate('/'))
      .catch((e) => {
        setError(e.response.data.message)
      })
  }

  const isEmailValid = () => {
    return email.length === 0 || (email.length > 0 && email.includes('@'))
  }
  const isPasswordValid = () => {
    return (
      password.length === 0 || (password.length > 0 && password.length >= 6)
    )
  }

  return (
    <Grid display="flex" justifyContent="center">
      <Grid
        sx={{ background: '#fff', width: '500px', padding: '20px' }}
        marginTop={10}
      >
        <form onSubmit={submitHandler}>
          <Grid display="flex" flexDirection="column">
            <TextField
              error={!isEmailValid()}
              value={email}
              onChange={emailHandler}
              label="Email"
              sx={{ marginBottom: '20px' }}
            />
            <TextField
              error={!isPasswordValid()}
              value={password}
              onChange={passwordHandler}
              label="Password"
            />
            {error && (
              <Typography
                textAlign="center"
                sx={{ color: (theme) => theme.palette.error.main }}
              >
                {error}
              </Typography>
            )}
            <Button type="submit">Sign In</Button>
            <Link to="/signup">{`Don't have account?`}</Link>
          </Grid>
        </form>
      </Grid>
    </Grid>
  )
}

export default SignInPage
