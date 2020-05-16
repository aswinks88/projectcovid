import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'
import '@fortawesome/fontawesome-free/css/fontawesome.css'
import '@fortawesome/fontawesome-free/css/brands.css'
import '@fortawesome/fontawesome-free/css/solid.css'
import SummaryofCovid from './components/SummaryofCovid/SummaryofCovid'
import Maps from './components/Maps/Maps'
import Chart from './components/Chart/Charts'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
function App() {
  return (
    <div className='container'>
      <Header />
      <SummaryofCovid />
      <Maps />
      <Chart />
      <Footer />
    </div>
  );
}

export default App;
