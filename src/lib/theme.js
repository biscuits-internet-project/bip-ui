import { createMuiTheme } from '@material-ui/core/styles'
import purple from '@material-ui/core/colors/purple'

const defaultTheme = createMuiTheme()

const baseTheme = {
  typography: {
    fontSize: 16,
    h1: { margin: 0, padding: 0, fontSize: 26 },
    h2: { margin: 0, padding: 0, fontSize: 22 },
    h3: { margin: 0, padding: 0, fontSize: 20, paddingBottom: 15 },
    h4: { margin: 0, padding: 0, fontSize: 18, paddingBottom: 15 },
    h5: { margin: 0, padding: 0 },
    h6: { margin: 0, padding: 0 },
    body1: { fontSize: 16 },
    body2: { fontSize: 15 },
    overrides: {
      MuiCardHeader: {
        fontSize: 18,
      },
      MuiTextField: {
        marginBottom: 10,
      },
      MUIDataTableFilter: {
        width: 300,
      },
    },
  },
}

export const darkTheme = createMuiTheme({
  ...baseTheme,
  palette: {
    type: 'dark',
    primary: { light: purple[300], main: purple[500], dark: purple[700] },
    secondary: { light: purple[100], main: purple[300], dark: purple[500] },
  },
  overrides: {
    MUIDataTableFilter: {
      root: {
        width: 300,
      },
    },
    MuiLink: {
      root: {
        color: '#BB86FC',
      },
    },
    MUIDataTable: {
      tableRoot: {
        tableLayout: 'fixed',
      },
    },
    MUIDataTableBodyCell: {
      root: {
        whiteSpace: 'normal !important',
      },
      stackedCommon: {
        height: 'inherit !important',
        padding: '12px !important',
      },
      cellStackedSmall: {
        width: '30% !important',
        color: 'silver',
      },
      responsiveStackedSmall: {
        width: '70% !important',
      },
    },
    MUIDataTableBodyRow: {
      responsiveStacked: {
        //borderBottom: 'solid 5px rgba(0, 0, 0, 0.15) !important',
      },
    },
    MuiTableCell: {
      root: {
        borderBottom: '0px',
      },
    },
    MuiTableRow: {
      root: {
        verticalAlign: 'top',
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
