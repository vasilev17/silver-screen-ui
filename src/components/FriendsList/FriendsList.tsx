import { Box, Button, Fade, Grow, Modal, TextField, Typography } from '@mui/material';
import React, { FC, SyntheticEvent, useEffect, useState } from 'react';
import styles from './FriendsList.module.scss';
import { useNavigate } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import Login from '../Login/Login';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};





interface FriendsListProps { }

const FriendsList: FC<FriendsListProps> = () => {


  

  function SendToRegister() {
    navigate("/register");
  }
  function SendToLogin() {
    navigate("/login");
  }
  function RemoveToken() {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  }
  const [username, setUsername] = useState(' ');
  const [avatar, setAvatar] = useState(' ');
  const [buttonState, setButtonState] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  const [code, setCode] = useState(<></>);
    
     
  var token = localStorage.getItem('token');
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/User/UserGetInfo`, {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json', 
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => {
        if (response.ok) {
          setCode(

            <div className={styles.frame}>
            <div className={styles.logout}>
              <Button variant="outlined" type="button" onClick={() => RemoveToken()}>Logout</Button>
            </div>
    
          </div>

            
          );
          console.log("logout")
        }else{
          setCode (

            <div className={styles.frame}>
            <><div className={styles.FriendsList}>
              <div className={styles.login}>
                <Button variant="outlined" type="button" onClick={() => SendToLogin()}>Sign In</Button>
    
              </div>
              <div className={styles.register}>
                <Button variant="outlined" type="button" onClick={() => SendToRegister()}>Sign Up</Button>
              </div>
            </div><div>
    
    
              </div></>
          </div>
      
         
          );
          console.log("login")
        };


      }).catch(error => {
        setCode (

          <div className={styles.frame}>
          <><div className={styles.FriendsList}>
            <div className={styles.login}>
              <Button variant="outlined" type="button" onClick={() => SendToLogin()}>Sign In</Button>
  
            </div>
            <div className={styles.register}>
              <Button variant="outlined" type="button" onClick={() => SendToRegister()}>Sign Up</Button>
            </div>
          </div><div>
  
  
            </div></>
        </div>
    
       
        );
        
      });
  },[])
      
  



      
      
    
  return(

    <>{code}</>



  );
    
    






}


export default FriendsList;
