import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'
import SummaryofCovid from './components/SummaryofCovid/SummaryofCovid'
function App() {
  return (
    <div className='container'>
    <p className='navbar-brand'>Covid Tracker</p>
      <SummaryofCovid />
    </div>
  );
}

export default App;
