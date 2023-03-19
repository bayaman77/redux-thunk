import { AppBar, Button, Grid, IconButton, Toolbar } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { signOut } from '../../../store/auth/auth.thunk'

const menus = [
  {
    path: 'meals',
    title: 'Meals',
  },
  {
    path: 'orders',
    title: 'Orders',
  },
]

const AdminHeader = () => {
  const dispatch = useDispatch()
  // const navigate = useNavigate()

  const signOutHandler = () => {
    dispatch(signOut())
    // navigate('signin')
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Grid
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{ width: '100%' }}
        >
          <Grid>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            {menus.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                style={{ marginRight: '10px' }}
              >
                {item.title}
              </NavLink>
            ))}
          </Grid>
          <Button color="inherit" onClick={signOutHandler}>
            Sign Out
          </Button>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default AdminHeader
