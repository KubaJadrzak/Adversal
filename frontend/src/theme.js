import { createTheme } from '@mui/material/styles'
import { amber } from '@mui/material/colors'

// Define your custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#F3D250', // Customize primary color
    },
    // You can customize other colors like error, warning, info, etc.
  },
  typography: {
    // You can customize typography here
  },
  components: {
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
    MuiToggleButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          border: 'none', // Remove border completely
          '&.Mui-selected': {
            backgroundColor: '#F3D250',
            outline: 'none',
            '&:hover': {
              backgroundColor: '#CAA330', // Darker color on hover when selected
            },
            '&:active': {
              outline: 'none',
            },
          },
          '&:hover': {
            backgroundColor: '#E1C642', // Slightly darker color on hover
          },
          '&:active': {
            outline: 'none',
          },
        },
      },
    },
  },
})

export default theme