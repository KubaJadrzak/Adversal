import { BrowserRouter as Router } from "react-router-dom"
import Navbar from "./components/Navbar"
import AppRoutes from "./routes/AppRoutes"
import StyledEngineProvider from '@mui/material/StyledEngineProvider'
import { Box } from "@mui/material"
import AlertPopup from "./components/alerts/AlertPopup"
import './App.css';

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <Router>
        <Box className="app">
          <AlertPopup />
          <Navbar/>
          <AppRoutes />
        </Box>
      </Router>
    </StyledEngineProvider>
  )
}

export default App
