import { fetchAPI } from "../../lib/fetchApi";

export const basketActiontypes = {
  ADD_ITEM_SUCCESS: "ADD_ITEM_SUCCESS",
  GET_BASKET_SUCCESS: "GET_BASKET_SUCCESS",
};

const initialState = {
  items: [],
};

export const basketReducer = (state = initialState, action) => {
  switch (action.type) {
    case basketActiontypes.GET_BASKET_SUCCESS:
      return {
        ...state,
        items: action.payload,
      };

    default:
      return state;
  }
};

export const getBasket = () => async (dispatch) => {
  try {
    const { data } = await fetchAPI("basket");

    dispatch({
      type: basketActiontypes.GET_BASKET_SUCCESS,
      payload: data.items,
    });
  } catch (error) {
    console.log(error);
  }
};

export const addToBasket = (newItem) => async (dispatch) => {
  try {
    const { data } = await fetchAPI(`foods/${newItem.id}/addToBasket`, {
      method: "POST",
      body: { amount: newItem.amount },
    });

    dispatch(getBasket());
  } catch (error) {
    console.log(error);
  }
};

export const updateBasketitem =
  ({ id, amount }) =>
  async (dispatch) => {
    try {
      await fetchAPI(`basketitem/${id}/update`, {
        method: "PUT",
        body: { amount },
      });

      dispatch(getBasket());
    } catch (error) {
      console.log(error);
    }
  };

export const deleteBasketitem = (id) => async (dispatch) => {
  try {
    await fetchAPI(`basketitem/${id}/delete`, {
      method: "DELETE",
    });

    dispatch(getBasket());
  } catch (error) {
    console.log(error);
  }
};
