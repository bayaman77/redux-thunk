import { createSlice } from '@reduxjs/toolkit'
import { STORAGE_KEYS, userRoles } from '../../lib/constans/common'
import { signIn, signOut, signUp } from './auth.thunk'

const initialState = {
  isAuthorized: false,
  token: '',
  user: {
    role: userRoles.GUEST,
    email: '',
    name: '',
  },
}

const getInitialState = () => {
  const json = localStorage.getItem(STORAGE_KEYS.AUTH)

  if (json) {
    const userData = JSON.parse(json)
    const state = { ...userData, isAuthorized: true }
    return state
  }

  return initialState
}

const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialState(),
  extraReducers: (builder) => {
    builder.addCase(signUp.fulfilled, (state, { payload }) => {
      state.isAuthorized = true
      state.token = payload.token
      state.user = {
        name: payload.user.name,
        email: payload.user.email,
        role: payload.user.role,
      }
    })
    builder.addCase(signIn.fulfilled, (state, { payload }) => {
      state.isAuthorized = true
      state.token = payload.token
      state.user = {
        name: payload.user.name,
        email: payload.user.email,
        role: payload.user.role,
      }
    })
    builder.addCase(signOut.fulfilled, (state) => {
      state.isAuthorized = false
      state.token = ''
      state.user = {
        name: '',
        email: '',
        role: userRoles.GUEST,
      }
    })
  },
})

export default authSlice
