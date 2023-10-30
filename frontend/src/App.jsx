import { BrowserRouter as Router } from "react-router-dom"
import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes"
import { Box } from "@mui/material";
import './App.css';

function App() {
    return (
      <Router>
        <Box className="app">
          <Navbar/>
          <AppRoutes />
        </Box>
      </Router>
  )
}

export default App
