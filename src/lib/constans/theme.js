import { store } from '../../store'

export const lightTheme = {
  palette: {
    primary: {
      main: '#ba3c06',
      light: '#8a2b06',
      dark: '#481805',
      contrastText: '#fff',
    },
    secondary: {
      main: '#8a2b06',
      light: '#8a2b06',
      dark: '#8a2b06',
      contrastText: '#fff',
    },
  },
}

export const darkTheme = {
  palette: {
    primary: {
      main: '#66290e',
      light: '#481805',
      dark: '#8a2b06',
      contrastText: '#fff',
    },
    secondary: {
      main: '#8a2b06',
      light: '#8a2b06',
      dark: '#8a2b06',
      contrastText: '#fff',
    },
  },
}

export const getTheme = () => {
  const currentTheme = store.getState().ui.themeMode

  return currentTheme === 'light' ? lightTheme : darkTheme
}
