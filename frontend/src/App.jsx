import { useState } from 'react';
import './App.css';
import ProductsList from "./components/products"

function App() {
  return <>
  <div className="app">
    <h1>Self-learning app</h1>
    <p>Find this application layout in client/src/App.jsx</p>
    <ProductsList />
  </div>
  </>
}

export default App
