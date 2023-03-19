import { axiosInstance } from '../config/axiosInstance'

export const putBasketRequest = (id, basketAmount) => {
  return axiosInstance.put(`/basketitem/${id}/update`, { amount: basketAmount })
}
export const deleteBasketRequest = (id) => {
  return axiosInstance.delete(`/basketitem/${id}/delete`)
}

export const getBasketRequest = (token) => {
  return axiosInstance.get('/basket', { headers: { Authorization: token } })
}
export const postBasketRequest = (newItem) => {
  return axiosInstance.post(`/foods/${newItem.id}/addToBasket`)
}

export const getMealsRequest = () => {
  return axiosInstance.get('/foods')
}

export const submitRequest = (orderData) => {
  return axiosInstance.post(
    `https://jsonplaceholder.typicode.com/posts`,
    orderData
  )
}

export const createMealReq = (data, token) => {
  return axiosInstance.post(`/foods`, data, {
    headers: { Authorization: token },
  })
}
