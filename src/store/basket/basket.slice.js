import { createSlice } from '@reduxjs/toolkit'

import {
  addToBasket,
  deleteBasketitem,
  getBasket,
  updateBasketitem,
} from './basker.thunk'

const initialState = {
  items: [],
  isloading: false,
  error: 'ds',
}

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addToBasket.rejected, (state, action) => {
      state.isloading = false
      state.error = action.payload
    })
    builder.addCase(addToBasket.pending, (state) => {
      state.isloading = true
    })
    builder.addCase(addToBasket.fulfilled, (state) => {
      state.isloading = false
      state.error = ''
    })

    builder.addCase(getBasket.fulfilled, (state, action) => {
      state.isloading = false
      state.items = action.payload
      state.error = ''
    })
    builder.addCase(getBasket.pending, (state) => {
      state.isloading = true
    })
    builder.addCase(getBasket.rejected, (state, action) => {
      state.isloading = false
      state.error = action.payload
    })

    builder.addCase(updateBasketitem.fulfilled, (state) => {
      state.isloading = false
    })
    builder.addCase(updateBasketitem.pending, (state) => {
      state.isloading = true
    })
    builder.addCase(updateBasketitem.rejected, (state, action) => {
      state.isloading = false
      state.error = action.payload
    })

    builder.addCase(deleteBasketitem.fulfilled, (state) => {
      state.isloading = false
    })
    builder.addCase(deleteBasketitem.pending, (state) => {
      state.isloading = true
    })
    builder.addCase(deleteBasketitem.rejected, (state, action) => {
      state.isloading = false
      state.error = action.payload
    })
  },
})

export const basketActions = basketSlice.actions
