import { BrowserRouter as Router } from "react-router-dom"
import Navbar from "./components/Navbar"
import AppRoutes from "./routes/AppRoutes"
import StyledEngineProvider from '@mui/material/StyledEngineProvider'
import { Box, StepLabel } from "@mui/material"
import './App.css';

function App() {
    return (
      <StyledEngineProvider injectFirst>
        <Router>
          <Box className="app">
            <Navbar/>
            <AppRoutes />
          </Box>
        </Router>
      </StyledEngineProvider>
  )
}

export default App
