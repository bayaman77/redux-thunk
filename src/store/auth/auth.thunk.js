import { createAsyncThunk } from '@reduxjs/toolkit'
import authServise from '../../api/authServise'
import { STORAGE_KEYS } from '../../lib/constans/common'

export const signUp = createAsyncThunk(
  'auth/signup',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await authServise.signUp(payload)
      const userData = data.data

      localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(userData))

      return userData
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const signIn = createAsyncThunk(
  'auth/signin',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await authServise.signIn(payload)
      const userData = data.data

      localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(userData))

      return userData
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const signOut = createAsyncThunk('auth/signOut', async () => {
  return localStorage.removeItem(STORAGE_KEYS.AUTH)
})
