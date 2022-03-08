import React, {useState} from 'react';
import NotificationButton from '../Notifications/Notifications/NotificationButton/NotificationButton';
import "./Navbar.scss";

const Navbar = () => {

  const [click, setClick] = useState(false)
  const handleClick = () => setClick(!click)

  const closeMenu = () => setClick(false)

  return (
      <div id="mainNavbar" className='header'>
          <nav className='navbar'>
              <a href='/' className='logo'>
                  <img src="logoS.png" alt='logo' />
              </a>
              <div className='hamburger' onClick={handleClick}>

              </div>
              <ul className={click ? "nav-menu active" : "nav-menu"}>
                  <div style={{marginTop: '7px'}}>
                  <NotificationButton/>
                  </div>
                  <li className='nav-item'>
                      <a href='/' onClick={closeMenu}>Home</a>
                  </li>
                  <li className='nav-item'>
                      <a href='/series' onClick={closeMenu}>Series</a>
                  </li>
                  <li className='nav-item'>
                      <a href='/movies' onClick={closeMenu}>Movies</a>
                  </li>
                  <li className='nav-item'>
                      <a href='/mylist' onClick={closeMenu}>My List</a>
                  </li>
              </ul>
          </nav>
      </div>
  )
}

export default Navbar