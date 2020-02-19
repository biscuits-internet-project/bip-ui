import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';


const baseTheme = {
  typography: {
    fontSize: 15,
    h1: { margin: 0, padding: 0, fontSize: 26 },
    h2: { margin: 0, padding: 0, fontSize: 22 },
    h3: { margin: 0, padding: 0, fontSize: 20, paddingBottom: 15 },
    h4: { margin: 0, padding: 0 },
    h5: { margin: 0, padding: 0 },
    h6: { margin: 0, padding: 0 },
    body1: {
      paddingBottom: 15,
      fontSize: 15
    },
    body2: {
      paddingBottom: 15,
      fontSize: 14
    },
    overrides: {
      MuiCardHeader: {
        fontSize: 18
      }
    }
  },
}

export const darkTheme = createMuiTheme({
  ...baseTheme,
  palette: {
    type: 'dark',
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
