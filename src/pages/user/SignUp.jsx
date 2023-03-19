import { Button, Grid, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { userRoles } from '../../lib/constans/common'
import { signUp } from '../../store/auth/auth.thunk'

const SignUpPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const submitHandler = (event) => {
    event.preventDefault()
    const data = {
      email,
      name,
      password,
      role: userRoles.ADMIN,
    }
    dispatch(signUp(data))
      .unwrap()
      .then(() => navigate('/'))
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
              value={name}
              onChange={(e) => setName(e.target.value)}
              label="Name"
            />
            <TextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
            />
            <TextField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
            />
            <TextField
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              label="ConfirmPassword"
            />
            <Button type="submit">Sign Up</Button>
            <Link to="/signin">Have an account?</Link>
          </Grid>
        </form>
      </Grid>
    </Grid>
  )
}

export default SignUpPage
