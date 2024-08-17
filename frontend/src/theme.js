import { createTheme } from '@mui/material/styles'

// Define your custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#F3D250',
    },
    secondary: {
      main: '#000000',
    },
    text: {
      primary: '#000000',
      secondary: '#000000',
    },
    //
  },
  typography: {
    color: '#000000',
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          wordBreak: 'break-word',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        InputProps: {
          style: {
            borderRadius: 0,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
    MuiToggleButtonGroup: {
      styleOverrides: {
        grouped: {
          marginTop: 0,
          borderTop: '1px solid #ccc',
          borderBottom: '1px solid #ccc',
          borderLeft: '1px solid #ccc',
          borderRight: '1px solid #ccc',
          '&:not(:first-of-type)': {
            marginTop: 0,
            borderTop: '1px solid #ccc',
          },
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          border: '1px solid #ccc',
          '&.Mui-selected': {
            backgroundColor: '#F3D250',
            outline: 'none',
            '&:hover': {
              backgroundColor: '#F3D250',
              filter: 'brightness(80%)',
            },
            '&:active': {
              outline: 'none',
            },
          },
          '&:hover': {
            backgroundColor: '#F3D250',
            filter: 'brightness(90%)',
          },
          '&:active': {
            outline: 'none',
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          '&:hover': {
            color: '#F3D250',
          },
        },
      },
    },
  },
})

export default theme
