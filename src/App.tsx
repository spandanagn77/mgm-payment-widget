import React from 'react';

import './App.css';
//import EnclosingPage from './components/EnclosingPage';
import PaymentWidget from './components/PaymentWidget';

import { Route, Routes, BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="pageContainer">
      <BrowserRouter>
        <PaymentWidget />
      </BrowserRouter>
    </div>
  );
}

export default App;
