import createMuiTheme from '@material-ui/core/styles/createMuiTheme'

const baseTheme = {
  typography: {
    fontSize: 14,
    h1: { margin: 0, padding: 0 },
    h2: { margin: 0, padding: 0 },
    h3: { margin: 0, padding: 0 },
    h4: { margin: 0, padding: 0 },
    h5: { margin: 0, padding: 0 },
    h6: { margin: 0, padding: 0 },
  },
  props: {
    MuiTypography: {
      variantMapping: {
        h1: 'h2',
        h2: 'h2',
        h3: 'h2',
        h4: 'h2',
        h5: 'h2',
        h6: 'h2',
        subtitle1: 'h2',
        subtitle2: 'h2',
        body1: 'span',
        body2: 'span',
      },
    },
  },
}


export const darkTheme = createMuiTheme({
  ...baseTheme,
  palette: {
    type: 'dark',
  },
})

export const lightTheme = createMuiTheme({
  ...baseTheme,
  palette: {
    type: 'light',
  },
})
