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
    MuiToggleButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          outline: 'none',
          border: 'none', // Remove border completely
          outline: 'none',
          borderColor: 'transparent', // Set border color to transparent by default
          '&.Mui-selected': {
            backgroundColor: '#F3D250',
            '&:hover': {
              backgroundColor: '#CAA330', // Darker color on hover when selected
            },
          },
          '&:hover': {
            backgroundColor: '#E1C642', // Slightly darker color on hover
          },
        },
      },
    },
  },
})

export default theme
