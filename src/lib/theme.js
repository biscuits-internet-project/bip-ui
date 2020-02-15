import createMuiTheme from '@material-ui/core/styles/createMuiTheme'

const bodyFont = 'Quicksand, Helvetica, sans-serif'
const headingFont = 'Quicksand, Helvetica, sans-serif'
const unit = 4

const colors = {
  primary: 'rgb(61, 88, 102)',
  secondary: 'rgb(143, 166, 178);',
}

const baseTheme = {
  typography: {
    fontFamily: bodyFont,
    fontSize: 14,
    color: colors.primary,
    h1: { fontFamily: headingFont },
    h2: { fontFamily: headingFont },
    h3: { fontFamily: headingFont, fontWeight: '700' },
    h4: { fontFamily: headingFont, fontWeight: '700', marginBottom: '16px'},
    h5: { fontFamily: headingFont },
    h6: { fontFamily: headingFont, fontSize: '16px' },
  },
}

export const defaultTheme = createMuiTheme({
  ...baseTheme,
  palette: {
    ...baseTheme.palette,
    type: 'light',
    background: {
      default: 'rgb(244, 247, 250)',
    },
  },
})
