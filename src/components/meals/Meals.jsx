import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { fetchAPI } from "../../lib/fetchApi";
import { getMeals, mealsActionTypes } from "../../store/meals/mealsReducer";
import MealItem from "./meal-item.jsx/MealItem";

const Meals = () => {
  const dispatch = useDispatch();

  const { meals, isLoading, error } = useSelector((state) => state.meals);


  useEffect(() => {
    dispatch(getMeals())
  }, []);

  return (
    <Card>
      {isLoading && !error && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {meals.map((meal) => {
          return <MealItem meal={meal} key={meal._id} />;
        })}
      </ul>
    </Card>
  );
};

export default memo(Meals);

const Card = styled.div`
  background: #ffffff;
  border-radius: 16px;
  width: 75%;
  margin: 230px auto;
  padding: 40px 40px 16px 40px;
`;
