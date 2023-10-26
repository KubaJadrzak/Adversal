import { useState } from 'react';
import './App.css';
import ProductsList from "./components/ProductsList"

function App() {
  return <>
  <div className="app">
    <h1>Self-learning app</h1>
    <ProductsList />
  </div>
  </>
}

export default App
