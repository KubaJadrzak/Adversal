import { createTheme } from '@mui/material/styles'

// Define your custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#F3D250', // Customize primary color
    },
    secondary: {
      main: '#000000', // Black color
    },
    text: {
      primary: '#000000', // Primary text color (dark mode)
      secondary: '#000000', // Secondary text color (light mode)
    },
    // Optionally define error, warning, info, etc.
  },
  typography: {
    color: '#000000',
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          wordBreak: 'break-word', // Add word break
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        InputProps: {
          style: {
            borderRadius: 0, // Set border radius to 0 for square edges
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0, // Set border radius to 0 for square edges
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 0, // Set border radius to 0 for square edges
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
              backgroundColor: '#F3D250', // Darker color on hover when selected
              filter: 'brightness(80%)',
            },
            '&:active': {
              outline: 'none',
            },
          },
          '&:hover': {
            backgroundColor: '#F3D250', // Slightly darker color on hover
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
            color: '#F3D250', // Change link color to primary color on hover
          },
        },
      },
    },
  },
})

export default theme
