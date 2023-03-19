import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import React, { useMemo } from 'react'
import { Provider, useDispatch, useSelector } from 'react-redux'

import Snackbar from './components/UI/Snackbar'
import { darkTheme, lightTheme } from './lib/constans/theme'
import { store } from './store'
import { uiActions } from './store/ui/ui.slice'
import AppRoutes from './routes/Routes'

const AppContent = () => {
  const dispatch = useDispatch()
  const { isOpen, severity, message } = useSelector(
    (state) => state.ui.snackbar
  )

  const themeMode = useSelector((state) => state.ui.themeMode)

  const theme = useMemo(() => {
    const currentTheme =
      themeMode === 'light' ? { ...lightTheme } : { ...darkTheme }

    return createTheme(currentTheme)
  }, [themeMode])

  return (
    <ThemeProvider theme={theme}>
      <Snackbar
        isOpen={isOpen}
        onClose={() => dispatch(uiActions.closeSnackbar())}
        message={message}
        severity={severity}
      />
      <AppRoutes />
    </ThemeProvider>
  )
}

const App = () => (
  <BrowserRouter>
    <Provider store={store}>
      <AppContent />
    </Provider>
  </BrowserRouter>
)

export default App

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
