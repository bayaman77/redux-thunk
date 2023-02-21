import React, { useCallback, useState } from "react";
import { Provider } from "react-redux";
import styled from "styled-components";
import "./App.css";
import Basket from "./components/basket/Basket";
import Header from "./components/header/Header";
import Meals from "./components/meals/Meals";
import Summary from "./components/summary/Summary";
import { store } from "./store";

const AppContent = () => {
  const [isBasketVisible, setBasketVisible] = useState(false);

  const showBasketHandler = useCallback(() => {
    setBasketVisible((prev) => !prev);
  }, []);

  return (
    <>
      <Header onShowBasket={showBasketHandler} />
      <Content>
        <Summary />
        <Meals />
        {isBasketVisible && <Basket onClose={showBasketHandler} />}
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
