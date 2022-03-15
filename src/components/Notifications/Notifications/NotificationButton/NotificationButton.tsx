import { Badge, Grow, IconButton } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import React, { FC, useEffect, useState } from 'react';
import styles from './NotificationButton.module.scss';
import NotificationBox from '../NotificationBox/NotificationBox';

interface NotificationButtonProps {}

const NotificationButton: FC<NotificationButtonProps> = () => {
  const [notificationsData, setNotificationsData] = useState([]);
  const [movieNotificationsData, setMovieNotificationsData] = useState([]);
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [buttonState, setButtonState] = useState(false);
  const [buttonState1, setButtonState1] = useState(false);

  var token = localStorage.getItem('token');

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

  function GetNotifications(){
    const requestOptions = {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json', 
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    };
    fetch(`${process.env.REACT_APP_API}/NotificationManagement/GetNotifications`, requestOptions)
      .then(response => {
        if(response.ok) {
          return response.json();
        } else {
          console.warn("Error while processing the request!");
          setInfoLoaded(true);
        }
      })
      .then(data => {
        setNotificationsData(data);
        setInfoLoaded(true);
      })
      .catch(error => {
        console.warn("Error while processing the request!"); 
        setInfoLoaded(true);
      });
  }

  function GetMovieNotifications(){
    const requestOptions = {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json', 
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    };
    fetch(`${process.env.REACT_APP_API}/NotificationManagement/GetMovieNotifications`, requestOptions)
      .then(response => {
        if(response.ok) {
          return response.json();
        } else {
          console.warn("Error while processing the request!");
          setInfoLoaded(true);
        }
      })
      .then(data => {
        setMovieNotificationsData(data);
        setInfoLoaded(true);
      })
      .catch(error => {
        console.warn("Error while processing the request!"); 
        setInfoLoaded(true);
      });
  }

  function LoadNotificationIcon(){
    if(infoLoaded){
      if(notificationsData === undefined && movieNotificationsData === undefined)
      {
        return(
          <>
            <Badge badgeContent={0} max={99} color="primary">
               <NotificationsIcon />
             </Badge >
          </>
        );
      }
      else if(movieNotificationsData === undefined)
      {
        return(
          <>
            <Badge badgeContent={notificationsData.length} max={99} color="primary">
               <NotificationsIcon />
             </Badge >
          </>
        );
      }
      else if(notificationsData === undefined)
      {
        return(
          <>
            <Badge badgeContent={movieNotificationsData.length} max={99} color="primary">
               <NotificationsIcon />
             </Badge >
          </>
        );
      }
      else
      {
        return(
          <>
            <Badge badgeContent={notificationsData.length + movieNotificationsData.length} max={99} color="primary">
               <NotificationsIcon />
             </Badge >
          </>
        );
      }
    }
    else
    {
      return(
        <>
          <Badge badgeContent={0} max={99} color="primary">
             <NotificationsIcon />
           </Badge >
        </>
      );
    }
  }

  useEffect(() => {
    GetNotifications();
    GetMovieNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <div className={styles.NotificationButton}>
      <IconButton onClick={() => ToggleButton()} aria-label="notifications">
           {LoadNotificationIcon()}
      </IconButton>
      {buttonState1?<div style={{position: "fixed"}}>
        <Grow
          in={buttonState}
          style={{ transformOrigin: '0 0 0' }}
          {...(buttonState ? { timeout: 500 } : {})}
        >
          <div>
            <NotificationBox 
              setButtonState={ToggleButton} 
              notificationInfo={notificationsData} 
              movieNotificationInfo={movieNotificationsData}
              setNotificationInfo={setNotificationsData}
              setMovieNotificationInfo={setMovieNotificationsData}
              infoLoaded={infoLoaded}
            />
          </div>
        </Grow>
      </div>:null}
    </div>
  );
}
export default NotificationButton;
