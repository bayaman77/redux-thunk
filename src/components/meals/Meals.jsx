import { memo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import getMeals from '../../store/meals/meals.thunks'

import MealItem from './meal-item.jsx/MealItem'

const Meals = () => {
  const dispatch = useDispatch()

  const { meals = [], isLoading, error } = useSelector((state) => state.meals)

  useEffect(() => {
    dispatch(getMeals())
  }, [dispatch])

  return (
    <Card>
      {isLoading && !error && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {meals.map((meal) => {
          // eslint-disable-next-line no-underscore-dangle
          return <MealItem meal={meal} key={meal._id} />
        })}
      </ul>
    </Card>
  )
}

export default memo(Meals)

const Card = styled.div`
  background: #ffffff;
  border-radius: 16px;
  width: 75%;
  margin: 230px auto;
  padding: 40px 40px 16px 40px;
`
