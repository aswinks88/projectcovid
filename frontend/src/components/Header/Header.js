import React from 'react'
import './Header.css'
function Header() {
    return (
         <nav className='navbar' style={{backgroundColor: 'red', color: 'white'}}>
               <div className='container-fluid'>
                    <div className='navbar-header'>
                         <h2>Covid-19 Tracker</h2>
                    </div>
               </div>
          </nav>
    )
}

export default Header
