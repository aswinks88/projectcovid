import React from 'react'
import './Header.css'
import logo from './covid19.png'
function Header() {
    return (
         <nav className='navbar' style={{backgroundColor: 'red', color: 'white'}}>
               <div className='container-fluid'>
               <div className='navbar-brand'>
                    <img src ={logo} width='60' height="60" alt="covid19-dashboard-nz"/>
                    &nbsp;COVID19 Dashboard New Zealand
                    </div>
                    {/* <div className='navbar-header'>
                         <h2>Covid-19 Tracker</h2>
                    </div> */}
               </div>
          </nav>
    )
}

export default Header
