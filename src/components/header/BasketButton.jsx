// import { Button } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
import styledComponents from "styled-components";
import { ReactComponent as BasketIcon } from "../../assets/icons/basket-icon.svg";

const BasketButton = ({ count, ...rest }) => {
  return (
    <StyledButton {...rest}>
      <BasketIcon />
      <StyledTitle>Your cart</StyledTitle>
      <StyledCount id="counter">{count || 0}</StyledCount>
    </StyledButton>
  );
};

export default BasketButton;

const StyledButton = styled('button')(({theme})=>({
  '&':{
    background: theme.palette.primary.dark,
    borderRadius: '30px',
    padding: '10px 32px',
    fontWeight: '600',
    fontSize: '16px',
    lineHeight: '24px',
    color: 'white',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
  },

  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    color: 'lightgray',
  },
  '&:hover > #counter':{
    backgroundColor: theme.palette.primary.main,
    color: 'lightgray',
  }
}))

const StyledTitle = styledComponents.span`
  margin-right: 24px;
  margin-left: 12px;
`;

const StyledCount = styledComponents.span`
  color: white;
  background: #8A2B06;
  border-radius: 30px;
  font-weight: 700;
  font-size: 20px;
  line-height: 27px;
  padding: 4px 20px;
`;
