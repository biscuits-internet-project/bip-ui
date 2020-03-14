import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';

const baseTheme = {
  typography: {
    fontSize: 15,
    h1: { margin: 0, padding: 0, fontSize: 26 },
    h2: { margin: 0, padding: 0, fontSize: 22 },
    h3: { margin: 0, padding: 0, fontSize: 20, paddingBottom: 15 },
    h4: { margin: 0, padding: 0, fontSize: 18, paddingBottom: 15 },
    h5: { margin: 0, padding: 0 },
    h6: { margin: 0, padding: 0 },
    overrides: {
      MuiCardHeader: {
        fontSize: 18
      },
      MuiTextField: {
        marginBottom: 10
      }
    }
  },
}

export const darkTheme = createMuiTheme({
  ...baseTheme,
  palette: {
    type: 'dark',
    primary: { light: purple[300], main: purple[500], dark: purple[700] },
    secondary: { light: purple[300], main: purple[900], dark: purple[700] },
  },
  overrides: {
    MuiLink: {
      root: {
        color: "#BB86FC"
      },
    },
  },
})

export const lightTheme = createMuiTheme({
  ...baseTheme,
  palette: {
    type: 'light',
  },
})
