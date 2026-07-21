import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import AppRoutes from './Routes/AppRoutes';
import Navbar from './Components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;