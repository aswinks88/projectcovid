import React from 'react'
import './Header.css'
import logo from './covid19.png'
import Modal from 'react-modal'
import HamburgerMenu from 'react-hamburger-menu'
const customStyles = {
     content : {
       top                   : '50%',
       left                  : '50%',
       right                 : 'auto',
       bottom                : 'auto',
       marginRight           : '-50%',
       transform             : 'translate(-50%, -50%)',
       marginTop             : '25px'
     }
   }
   Modal.setAppElement('#root')
function Header() {
     var subtitle;
     const [modalIsOpen,setIsOpen] = React.useState(false);
     const [menuOpen, setOpen] = React.useState(false)
     function openModal() {
       setIsOpen(true)
     }
     function handleClick() {
    
          // if(menuOpen){
          setOpen(false)
         
          // console.log('close')
          // } else{
          //      setOpen(true)
          //      console.log('open')
          // }
     }
     function afterOpenModal() {
       // references are now sync'd and can be accessed.
       subtitle.style.color = '#f00';
     }
   
     function closeModal(){
       setIsOpen(false)
     }
    return (
         <nav className='navbar' style={{backgroundColor: 'red', color: 'white'}}>
               <div className='container-fluid'>
               <div className='navbar-brand'> <img src ={logo} width='50' height="50" alt="covid19-dashboard-nz"/>
                    &nbsp;COVID19 Dashboard New Zealand</div>
                    <div className="navbar-toggler" data-toggle="collapse" data-target="#menuexpand"
                    aria-controls="menuexpand" aria-expanded="false" aria-label="Toggle navigation">
                    <HamburgerMenu
                    className='ham'
                    isOpen={menuOpen}
                    menuClicked={handleClick}
                    width={25}
                    height={15}
                    strokeWidth={2}
                    rotate={0}
                    color='white'
                    borderRadius={0}
                    animationDuration={0.5}
                    />
                    </div>

                    <div className="collapse navbar-collapse" id="menuexpand">
                    <ul className='nav navbar-nav mr-auto menu'>
                         <li  className="nav-item">
                              <a className="nav-link fa-pull-left" href='#' onClick={openModal}>About</a>
                         </li>
                         </ul>
                    </div>
                         {/* <li>
                         <a href='#'><i class="fas fa-info-circle"></i></a>
                         </li> */}       
                         {/* <i className="fas fa-info-circle"></i>&nbsp; */}
               </div>
               <div className='covidInfo' id='root'>
                             
               </div>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="About Covid Dashboard"
        >
        <div className='scroll'>

          <h2 ref={_subtitle => (subtitle = _subtitle)}>About this COVID-19 Dashboard</h2>
               <p>
                    This is a simple COVID-19 dashboard for NZ. <br/> The information that is shown here is collected from 
                    Minisry of Health services, New Zealand and 
                    COVID-19 Data <br/>Repository by the Center for Systems Science and Engineering (CSSE) at
                    Johns Hopkins University and these sources update the data at different <br/>times. 
               </p>
               <p>
                    The graph shown here represent changes over the time since the first case identified in New Zealand.<br/>
                    Each chart has pan and zoom enabled and when you scroll or pinch(mobile) on chart area it automatically zooms in and out<br/> and 
                    pan towards X-axis.
                    Also, it stops the page scrolling up and down when the mouse pointer is at the map area.<br/>
                    Some browsers may not support<br/> this features (Firefox mobile).
                    <ul>
                         <li>Total Confirmed Cases - shows the daily total of confirmed cases till date</li>
                         <li>Recovery vs Death rate - compares the recovery rate and death rate till date</li>
                         <li>Cases by DHB - shows a detailed information on number of confirmed, recovered, active and deceased cases in each District Health Board(DHB)</li>
                         <li>Age group affected - compares different age groups and gender affected</li>
                         <li>Gender - Female to Male ratio</li>
                    </ul>
               </p>             
               <p>
               Please refer <a href='https://www.health.govt.nz/our-work/diseases-and-conditions/covid-19-novel-coronavirus/covid-19-current-situation/covid-19-current-cases'>
               Ministry of Health
               </a> website for more up to date information on covid-19.
               </p>
          </div>
          <button className='btn bg-red waves-effect' onClick={closeModal}>close</button>
        </Modal>
          </nav>
    )
}

export default Header
