/* eslint-disable jsx-a11y/label-has-associated-control */
import styledComponents from 'styled-components'
import { styled } from '@mui/material/styles'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, TextField } from '@mui/material'

import { ReactComponent as PlusIcon } from '../../../assets/icons/plus.svg'
import { addToBasket } from '../../../store/basket/basker.thunk'

const MealItemForm = ({ id, title, price }) => {
  const dispatch = useDispatch()
  const { error } = useSelector((state) => state.basket)

  const [amount, setAmount] = useState(1)

  const amountChangeHandler = (e) => {
    setAmount(+e.target.value)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    const basketitem = {
      id,
      price,
      title,
      amount,
    }
    dispatch(addToBasket(basketitem))
  }

  return (
    <StyledForm>
      <Container>
        <label htmlFor={id}>Amount</label>
        <StyledTextField
          value={amount}
          onChange={amountChangeHandler}
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          size="small"
          id={id}
          min={1}
          max={5}
          defaultChecked={1}
        />
      </Container>
      <StyledButton variant="contained" onClick={submitHandler}>
        <StyledIcon />
        Add
      </StyledButton>
      <span style={{ color: 'red' }}>{error}</span>
    </StyledForm>
  )
}

export default MealItemForm

const StyledTextField = styled(TextField)(() => ({
  '&': {
    width: '60px',
  },
  '& .MuiOutlinedInput-input': {
    height: '20px',
    padding: '5px 10px',
    fontSize: '20px',
  },
}))

const StyledButton = styled(Button)(() => ({
  '&': {
    backgroundColor: '#7e2a0a',
    borderRadius: '25px',
    padding: '10px 32px',
  },
  '&:hover': {
    backgroundColor: '#2c0d00',
  },
}))

const StyledIcon = styledComponents(PlusIcon)`
  margin-right: 10px;
`

const Container = styledComponents.div`
  margin-bottom: 12px;
  label {
    font-weight: 600;
    font-size: 18px;
    line-height: 27px;
    color: #222222;
    margin-right: 20px;
  }
  input {
    width: 60px;
    height: 32px;
    border: 1px solid #d6d6d6;
    border-radius: 6px;
    outline: none;
    padding: 4px 12px;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
  }
`

const StyledForm = styledComponents.form`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`
