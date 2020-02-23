import createMuiTheme from '@material-ui/core/styles/createMuiTheme'

const baseTheme = {
  typography: {
    fontSize: 15,
    h1: { margin: 0, padding: 0 },
    h2: { margin: 0, padding: 0 },
    h3: { margin: 0, padding: 0 },
    h4: { margin: 0, padding: 0 },
    h5: { margin: 0, padding: 0 },
    h6: { margin: 0, padding: 0 },
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
