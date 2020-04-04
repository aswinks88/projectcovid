import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'
import '@fortawesome/fontawesome-free/css/fontawesome.css'
import '@fortawesome/fontawesome-free/css/brands.css'
import '@fortawesome/fontawesome-free/css/solid.css'
import SummaryofCovid from './components/SummaryofCovid/SummaryofCovid'
import Header from './components/Header/Header'
function App() {
  return (
    <div className='container'>
      {/* <Header /> */}
    {/* <p className='navbar-brand'>Covid Tracker</p> */}
      <SummaryofCovid />
    </div>
  );
}

export default App;
