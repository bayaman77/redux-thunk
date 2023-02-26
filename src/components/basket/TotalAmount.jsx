import { Button } from "@mui/material";
import {styled} from "@mui/system";
import React, { useCallback, useMemo } from "react";
import styledComponents from "styled-components";
// import Button from "../UI/Button";

const TotalAmount = ({ price, onClose, onOrder }) => {

    const orderBtn = useCallback(() => price > 0 ? <ContainedButton variant="contained" onClick={onOrder}>Order</ContainedButton> : null,[onOrder, price])
    
    const fixedPrice = useMemo(() => price.toFixed(2), [price]) 
  return (
    <div style={{ paddingTop: 'px'}}>
      <InfoContainer>
        <Label>Total amount</Label>
        <Price>${fixedPrice}</Price>
      </InfoContainer>

      <ActionButtonsContainer>
        <OutlinedButton variant="outlined" onClick={onClose}>
          Close
        </OutlinedButton>
        {orderBtn()}
      </ActionButtonsContainer>
    </div>
  );
};

export default TotalAmount;

const ContainedButton = styled(Button)(()=>({
  '&': {
    backgroundColor: '#7e2a0a',
    borderRadius: '25px',
    padding: '10px 32px'
  },
  '&:hover': {
    backgroundColor: '#2c0d00'
  }
}))

const OutlinedButton = styled(Button)(()=>({
  '&': {
    border:'1px solid #7e2a0a',
    color: '#7e2a0a',
    borderRadius: '25px',
    padding: '10px 32px'
  },
  '&:hover': {
    backgroundColor: '#2c0d00',
    color: 'white'
  }
}))

const Label = styledComponents.p`
  font-weight: 700;
  font-size: 20px;
  line-height: 30px;
  text-align: center;
  color: #222222;
`;

const Price = styledComponents.p`
  font-weight: 600;
  font-size: 22px;
  line-height: 33px;
  text-align: center;
  color: #222222;
`;

const InfoContainer = styledComponents.div`
  display: flex;
  justify-content: space-between;
`;

const ActionButtonsContainer = styledComponents.div`
  margin-top: 24px;
  display: flex;
  justify-content: end;
  gap: 1rem;
`;
