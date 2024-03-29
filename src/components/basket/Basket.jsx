import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import { uiActions } from '../../store/ui/ui.slice'
import BasketItem from './BasketItem'
import TotalAmount from './TotalAmount'
import {
  deleteBasketitem,
  submitOrder,
  updateBasketitem,
} from '../../store/basket/basker.thunk'

const Basket = ({ open, onClose }) => {
  const dispatch = useDispatch()
  const { items, error } = useSelector((state) => state.basket)

  const getTotalPrice = useCallback(() => {
    // eslint-disable-next-line no-return-assign, no-param-reassign, prettier/prettier
    return items.reduce((sum, { price, amount }) => (sum += price * amount), 0)
  }, [items])

  const decrement = useCallback(
    (id, amount) => {
      if (amount > 1) {
        dispatch(updateBasketitem({ amount: amount - 1, id }))
      } else {
        dispatch(deleteBasketitem(id))
      }
    },
    [dispatch]
  )

  const increment = useCallback(
    (id, amount) => {
      dispatch(updateBasketitem({ amount: amount + 1, id }))
    },
    [dispatch]
  )

  const orderSubmitHandler = async () => {
    try {
      await dispatch(
        submitOrder({
          orderData: { items },
        })
      ).unwrap()

      dispatch(
        uiActions.showSnackbar({
          severity: 'success',
          message: 'Order completed successfuly',
        })
      )
      // eslint-disable-next-line no-shadow
    } catch (error) {
      dispatch(
        uiActions.showSnackbar({
          severity: 'error',
          message: 'Order failed, try again later',
        })
      )
    } finally {
      onClose()
    }
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: 'none',
    borderRadius: 5,
    boxShadow: 24,
    p: 4,
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Content>
          {items.length ? (
            <FixedHeigthContainer>
              {items.map((item) => (
                <BasketItem
                  error={error}
                  // eslint-disable-next-line no-underscore-dangle
                  increment={() => increment(item._id, item.amount)}
                  // eslint-disable-next-line no-underscore-dangle
                  decrement={() => decrement(item._id, item.amount)}
                  title={item.title}
                  price={item.price}
                  amount={item.amount}
                  // eslint-disable-next-line no-underscore-dangle
                  key={item._id}
                />
              ))}
            </FixedHeigthContainer>
          ) : null}
          <TotalAmount
            price={getTotalPrice()}
            onClose={onClose}
            onOrder={orderSubmitHandler}
          />
        </Content>
      </Box>
    </Modal>
  )
}

export default Basket

const Content = styled.div`
  width: 100%;
  height: 100%;
  padding: 1.5rem 1rem;
`

const FixedHeigthContainer = styled.div`
  max-height: 228px;
  overflow-y: scroll;
  margin-bottom: 30px;
`
