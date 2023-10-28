import { BrowserRouter as Router } from "react-router-dom"
import './App.css';
import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes"

function App() {
    return (
      <Router>
        <div className="app">
          <h1>Self-learning app</h1>
          <Navbar/>
          <AppRoutes />
        </div>
      </Router>
  )
}

export default App
