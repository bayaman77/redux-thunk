import React, { useCallback, useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import "./App.css";
import Basket from "./components/basket/Basket";
import Header from "./components/header/Header";
import Meals from "./components/meals/Meals";
import Summary from "./components/summary/Summary";
import Snackbar from "./components/UI/Snackbar";
import { store } from "./store";
import { uiActions } from "./store/ui/uiSlice";

const AppContent = () => {
  const dispatch = useDispatch()
  const [isBasketVisible, setBasketVisible] = useState(false);
  const {isOpen, severity, message} = useSelector(state => state.ui.snackbar)
  const showBasketHandler = useCallback(() => {
    setBasketVisible((prev) => !prev);
  }, []);

  return (
    <>
      <Header onShowBasket={showBasketHandler} />
      <Content>
        <Summary />
        <Meals />
        {isBasketVisible && <Basket open={isBasketVisible} onClose={showBasketHandler} />}
        <Snackbar
        isOpen={isOpen}
        onClose={() => dispatch(uiActions.closeSnackbar())}
        message={message}
        severity={severity}
      />
      </Content>
    </>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <AppContent/>
    </Provider>
  )
}

export default App;

const Content = styled.div`
  margin-top: 101px;
`;

/*

GET /foods
headers: {userID: 'your_name'}

GET /basket
headers: {userID: 'your_name'}

POST /foods/:foodId/addToBasket
BODY: { amount: number }
headers: {userID: 'your_name'}

DELETE /basketItem/:id/delete
headers: {userID: 'your_name'}

PUT /basketItem/:id/update
BODY: { amount: number }
headers: {userID: 'your_name'}

*/
