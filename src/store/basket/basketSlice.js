import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAPI } from "../../lib/fetchApi";

const initialState = {
  items: [],
  isloading: false,
  error: "dfsf",
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    builder.addCase(addToBasket.rejected, (state, action) => {
      state.isloading = false;
      state.error = action.payload;
    });
    builder.addCase(addToBasket.pending, (state) => {
      state.isloading = true;
    });
    builder.addCase(addToBasket.fulfilled, (state) => {
      state.isloading = false;
      state.error = ''
    });


    builder.addCase(getBasket.fulfilled, (state, action) => {
      state.isloading = false
      state.items = action.payload;
      state.error = ''
    });
    builder.addCase(getBasket.pending, (state) => {
      state.isloading = true;
    });
    builder.addCase(getBasket.rejected, (state, action) => {
      state.isloading = false
      state.error = action.payload;
    });


    builder.addCase(updateBasketitem.fulfilled, (state) => {
      state.isloading = false
    });
    builder.addCase(updateBasketitem.pending, (state) => {
      state.isloading = true
    });
    builder.addCase(updateBasketitem.rejected, (state, action) => {
      state.isloading = false
      state.error = action.payload
    });


    builder.addCase(deleteBasketitem.fulfilled, (state) => {
      state.isloading = false
    });
    builder.addCase(deleteBasketitem.pending, (state) => {
      state.isloading = true
    });
    builder.addCase(deleteBasketitem.rejected, (state,action) => {
      state.isloading = false
      state.error = action.payload
    });


  },
});

export const basketActions = basketSlice.actions;

export const getBasket = createAsyncThunk(
  "basket/getBasket",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await fetchAPI("basket");

      return data.items;
    } catch (error) {
      return rejectWithValue('Getting the basket failed!')
    }
  }
);

export const addToBasket = createAsyncThunk(
  "basket/addToBasket",
  async (newItem, { dispatch, rejectWithValue }) => {
    try {
      await fetchAPI(`foods/${newItem.id}/addToBasket`, {
        method: "POST",
        body: { amount: newItem.amount },
      });

      dispatch(getBasket());
    } catch (error) {
      return rejectWithValue("Adding to basket failed!");
    }
  }
);

export const updateBasketitem = createAsyncThunk(
  'basket/updateBasketItem',
  async ({ id, amount },{dispatch, rejectWithValue}) => {
    try {
      await fetchAPI(`basketitem/${id}/update`, {
        method: "PUT",
        body: { amount },
      });

      dispatch(getBasket());
    } catch (error) {
      return rejectWithValue("Updating failed!");
    }
  }
)

export const deleteBasketitem = createAsyncThunk( 'basket/deleteBasketitem',
 async (id,{dispatch, rejectWithValue}) => {
  try {
    await fetchAPI(`basketitem/${id}/delete`, {
      method: "DELETE",
    });

    dispatch(getBasket());
  } catch (error) {
    return rejectWithValue("Deleting failed!");
  }
})


export const submitOrder = createAsyncThunk(
  "basket/submitOrder",
  async ({orderData}, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await fetch("https://jsonplaceholder.typicode.com/posts",{
        method: 'POST',
        body: orderData
      });

     dispatch(getBasket())
     
    } catch (error) {
      
      return rejectWithValue('Something went wrong!')
    }
  }
);