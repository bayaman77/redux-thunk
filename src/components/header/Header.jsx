import { Button } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import styledComponents from 'styled-components'
import { styled } from '@mui/material/styles'

import { uiActions } from '../../store/ui/ui.slice'
import BasketButton from './BasketButton'
import { getBasket } from '../../store/basket/basker.thunk'
import { signOut } from '../../store/auth/auth.thunk'

const Header = ({ onShowBasket }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isAuthorized = useSelector((state) => state.auth.isAuthorized)
  const { items = [] } = useSelector((state) => state.basket)
  const themeMode = useSelector((state) => state.ui.themeMode)
  const [animationClass, setAnimationClass] = useState('')

  useEffect(() => {
    dispatch(getBasket())
  }, [dispatch])

  const calculateTotalAmount = useCallback(() => {
    const sum = items.reduce((s, item) => {
      return s + item.amount
    }, 0)
    return sum
  }, [items])

  useEffect(() => {
    setAnimationClass('bump')

    const id = setTimeout(() => {
      setAnimationClass('')
    }, 300)

    return () => {
      clearTimeout(id)
    }
  }, [items])

  const themeChangeHandler = () => {
    const theme = themeMode === 'light' ? 'dark' : 'light'
    dispatch(uiActions.changeTheme(theme))
  }

  const signOutHandler = () => {
    dispatch(signOut())
    // navigate('signin')
  }

  return (
    <Container>
      <Link to="/">
        <Logo>ReactMeals</Logo>
      </Link>
      <BasketButton
        className={animationClass}
        onClick={onShowBasket}
        count={calculateTotalAmount()}
      />
      <Button
        variant="contained"
        onClick={themeChangeHandler}
        sx={{ color: 'white', backgroundColor: '#d74910' }}
      >
        {themeMode === 'light' ? 'Turn dark mode' : 'Turn light mode'}
      </Button>
      {isAuthorized ? (
        <Button variant="contained" onClick={signOutHandler}>
          Sign Out
        </Button>
      ) : (
        <Button variant="contained" onClick={() => navigate('signin')}>
          Sign In
        </Button>
      )}
    </Container>
  )
}

export default Header

const Container = styled('div')(({ theme }) => ({
  '&': {
    position: 'fixed',
    top: '0',
    zIndex: '1',
    width: '100%',
    height: '101px',
    backgroundColor: theme.palette.primary.light,
    display: 'flex',
    justifyContent: 'space-between',
    alignContent: 'center',
    padding: '21px 120px',
  },
}))

// const Containers = styled.div`
//   position: fixed;
//   top: 0;
//   z-index: 1;
//   width: 100%;
//   height: 101px;
//   background-color: ${getTheme().palette.primary.light};
//   display: flex;
//   justify-content: space-between;
//   align-content: center;
//   padding: 21px 120px;

//   .bump {
//     animation: bump 300ms ease-out;
//   }

//   @keyframes bump {
//     0% {
//       transform: scale(1);
//     }
//     10% {
//       transform: scale(0.9);
//     }
//     30% {
//       transform: scale(1.1);
//     }
//     50% {
//       transform: scale(1.15);
//     }
//     100% {
//       transform: scale(1);
//     }
//   }
// `;

const Logo = styledComponents.p`
  font-weight: 600;
  font-size: 38px;
  line-height: 57px;
  color: #ffffff;
`
