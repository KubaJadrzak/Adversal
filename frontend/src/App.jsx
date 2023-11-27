import { BrowserRouter as Router } from "react-router-dom"
import Navbar from "./components/Navbar"
import AppRoutes from "./routes/AppRoutes"
import StyledEngineProvider from '@mui/material/StyledEngineProvider'
import { Box } from "@mui/material"
import './App.css';

function App() {
  if(!localStorage.getItem('id')){
    localStorage.setItem("id", 1)
  }
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
