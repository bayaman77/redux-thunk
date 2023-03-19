import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  deleteBasketRequest,
  getBasketRequest,
  postBasketRequest,
  putBasketRequest,
  submitRequest,
} from '../../api/mealsServise'

export const getBasket = createAsyncThunk(
  'basket/getBasket',
  async (_, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().auth
      const { data } = await getBasketRequest(token)
      return data.data.items
    } catch (error) {
      return rejectWithValue('something went wrong getBasket ')
    }
  }
)

export const addToBasket = createAsyncThunk(
  'basket/addToBasket',
  async (newItem, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await postBasketRequest(newItem)
      dispatch(getBasket())
      return data.data.items
    } catch (error) {
      return rejectWithValue('something went wrong basket')
    }
  }
)

export const deleteBasketitem = createAsyncThunk(
  'basket/deleteBasket',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await deleteBasketRequest(id)
      dispatch(getBasket())
      return data.data.items
    } catch (error) {
      return rejectWithValue('something  went wrong delete ')
    }
  }
)

export const updateBasketitem = createAsyncThunk(
  'basket/updateBasket',
  async ({ id, amount }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await putBasketRequest(id, amount)
      dispatch(getBasket())
      return data.data.items
    } catch (error) {
      return rejectWithValue('something went wrong update')
    }
  }
)

export const submitOrder = createAsyncThunk(
  'basket/submitOrder',
  async ({ orderData }, { dispatch, rejectWithValue }) => {
    try {
      await submitRequest(orderData)
      return dispatch(getBasket())
    } catch (error) {
      return rejectWithValue('something went wrong submitorder')
    }
  }
)
