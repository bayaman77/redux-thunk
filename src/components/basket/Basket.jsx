import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { deleteBasketitem, updateBasketitem } from "../../store/basket/basketSlice";
import Modal from "../UI/Modal";
import BasketItem from "./BasketItem";
import TotalAmount from "./TotalAmount";

const Basket = ({ onClose }) => {
const dispatch = useDispatch()

  const {items, error} = useSelector(state => state.basket)

  const getTotalPrice = useCallback(() => {
    return items.reduce((sum, { price, amount }) => (sum += price * amount), 0);
  }, [items]);

  const decrement = useCallback(
    (id, amount) => {
      if (amount > 1) {
        dispatch(updateBasketitem({ amount: amount - 1, id: id }));
      } else {
        dispatch(deleteBasketitem(id));
      }
    },
    [dispatch]
  );

  const increment = useCallback(
    (id, amount) => {
      dispatch(updateBasketitem({ amount: amount + 1, id: id }));
    },
    [dispatch]
  );

  return (
    <Modal onClose={onClose}>
      <Content>
        {items.length ? (
          <FixedHeigthContainer>
            {items.map((item) => (
              <BasketItem
              error = {error}
                increment={() => increment(item._id, item.amount)}
                decrement={() => decrement(item._id, item.amount)}
                title={item.title}
                price={item.price}
                amount={item.amount}
                key={item._id}
              />
            ))}
          </FixedHeigthContainer>
        ) : null}
        <TotalAmount price={getTotalPrice()} onClose={onClose} />
      </Content>
    </Modal>
  );
};

export default Basket;

const Content = styled.div`
  width: 100%;
  height: 100%;
  padding: 1.5rem 1rem;
`;

const FixedHeigthContainer = styled.div`
  max-height: 228px;
  overflow-y: scroll;
  margin-bottom: 30px;
`;
