import { Grow, IconButton, TextField } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import React, { useState } from 'react';
import NotificationButton from '../Notifications/Notifications/NotificationButton/NotificationButton';
import "./Navbar.scss";
import Profile from '../Profile/Profile';
import { useNavigate } from 'react-router';

const Navbar = () => {

    const [click, setClick] = useState(false)
    const handleClick = () => setClick(!click)
    const [searchString, setSearchString] = useState(null);
    const navigate = useNavigate();

    const [color, setColor] = useState(false)
    const changeColor = () => {
        if (window.scrollY >= 10) {
            setColor(true)
        } else {
            setColor(false)
        }
    }

    const handleSearch = () => {
        if (searchString != null){
            navigate(`/search/${searchString}`);
            window.location.reload();
        }
    }
    const handleSearchChange = (e: React.ChangeEvent<any>) => {
        setSearchString(e.target.value);
    }
    window.addEventListener('scroll', changeColor)


    const closeMenu = () => setClick(false)
    const [buttonState, setButtonState] = useState(false);
    const [buttonState1, setButtonState1] = useState(false);
    function ToggleButton(){
        setButtonState((prev) => !prev);
        if(!buttonState){
          setButtonState1(true);
        }
        else
        {
          setTimeout(() => {
            setButtonState1(false);
          }, 500);
        }
      }
    return (
        <div id="mainNavbar" className={color ? "header header_bg" : "header"}>
            <nav className='navbar'>
                <a href='/' className='logo'>
                    <img src="/logoS.png" alt='logo' />
                </a>
                <div className='hamburger' onClick={handleClick}>

                </div>
                <ul className={click ? "nav-menu active" : "nav-menu"}>
                    <TextField onChange={handleSearchChange} id='searchField' label="Search" variant="standard" type="search" />
                    <div style={{ marginTop: '9px' }}>
                        <IconButton type="submit" onClick={handleSearch}>
                            <SearchRoundedIcon />
                        </IconButton>
                    </div>
                    <div style={{ marginTop: '7px' }}>
                        <NotificationButton />
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
                    <div style={{ marginTop: '7px' }}>

                        <IconButton aria-label="delete" onClick={() => ToggleButton()}>
                            <AccountCircleIcon />
                        </IconButton>
                        {buttonState1?
                        <div style={{position: "fixed"}}>
                        <Grow 
                            in={buttonState}
                            style={{ transformOrigin: '0 0 0' }}
                            {...(buttonState ? { timeout: 500 } : {})}
                           
                        >
                          <div>

                           <Profile/>
                           
                          </div>
                          
                        </Grow>
                        </div>
                       :null}
                    </div>
                </ul>
            </nav>
        </div>
        
    )

}

export default Navbar