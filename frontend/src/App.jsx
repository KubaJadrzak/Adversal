import { BrowserRouter as Router } from 'react-router-dom'
import Navbar from './components/Navbar'
import AppRoutes from './routes/AppRoutes'
import StyledEngineProvider from '@mui/material/StyledEngineProvider'
import { Box, Divider } from '@mui/material'
import AlertPopup from './components/alerts/AlertPopup'
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme'
import './App.css'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>
        <Router>
          <Box className='app'>
            <AlertPopup />
            <Box className='app-navbar'>
              <Navbar />
            </Box>
            <Box className='app-content'>
              <AppRoutes />
            </Box>
          </Box>
        </Router>
      </StyledEngineProvider>
    </ThemeProvider>
  )
}

export default App
