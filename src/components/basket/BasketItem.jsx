import { Button } from '@mui/material'
import React from 'react'
import styledComponents from 'styled-components'
import { styled } from '@mui/material/styles'

const BasketItem = ({ title, price, amount, increment, decrement, error }) => {
  return (
    <Container>
      <span style={{ color: 'red' }}>{error}</span>
      <Title>{title}</Title>
      <Content>
        <PriceAndAmountContainer>
          <Price>${price}</Price>
          <Amount>X{amount}</Amount>
        </PriceAndAmountContainer>
        <CounterContainer>
          <StyledButton
            borderStyle="sqaured"
            variant="outlined"
            onClick={decrement}
          >
            -
          </StyledButton>
          <StyledButton
            borderStyle="sqaured"
            variant="outlined"
            onClick={increment}
          >
            +
          </StyledButton>
        </CounterContainer>
      </Content>
    </Container>
  )
}

export default BasketItem

const StyledButton = styled(Button)(() => ({
  '&': {
    padding: '10px 32px',
    border: '1px solid #7e2a0a;',
    color: '#7e2a0a',
  },
  '&:hover': {
    border: '1px solid #7e2a0a;',
    backgroundColor: '#7e2a0a',
    color: 'white',
  },
}))

const Container = styledComponents.div`
  padding: 24px 0;
  width: 95%;
  border-bottom: 1px solid gray;
`
const Title = styledComponents.p`
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
  color: #222222;
  margin-bottom: 12px;
`

const Price = styledComponents.p`
  font-weight: 600;
  font-size: 18px;
  line-height: 27px;
  color: #ad5502;
`

const Amount = styledComponents.span`
  border: 1px solid #d6d6d6;
  border-radius: 6px;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #222222;
  display: block;
  padding: 6px 14px;
`

const PriceAndAmountContainer = styledComponents.div`
  width: 153px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const CounterContainer = styledComponents.div`
  display: flex;
  gap: 14px;
`

const Content = styledComponents.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
