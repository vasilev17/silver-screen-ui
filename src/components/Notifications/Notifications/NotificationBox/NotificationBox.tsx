import React, { FC, useEffect, useState } from 'react';
import styles from './NotificationBox.module.scss';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import NotificationSkeleton from '../NotificationSkeleton/NotificationSkeleton';
import NotificationElement from '../NotificationElement/NotificationElement';

interface NotificationBoxProps {}

const NotificationBox: FC<NotificationBoxProps> = () => {
  
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [notificationsData, setNotificationsData] = useState(null);
  var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJib2Jvc3QzIiwidXNlcklEIjoiOSIsImV4cCI6MTY0NTcyMTU0OCwiaXNzIjoic2lsdmVyc2NyZWVuYmciLCJhdWQiOiJzaWx2ZXJzY3JlZW5iZyJ9.NE6r-Sx3st99GS9bvq0crKkCASwiWRs-HA0DxHQGPu0";

  function GetNotifications(){
    const requestOptions = {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json', 
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    };
    fetch(`http://localhost:5000/NotificationManagement/GetNotifications`, requestOptions)
      .then(response => {
        if(response.ok) {
          return response.json();
        } else {
          console.warn("Error while processing the request!");
          setInfoLoaded(true);
        }
      })
      .then(data => {
        console.log(data);
        setNotificationsData(data);
        setInfoLoaded(true);
      })
      .catch(error => {
        console.warn("Error while processing the request!"); 
        setInfoLoaded(true);
      });
  }

  function DisplayNotifications(shouldDisplaySkeleton:boolean){
    if(!shouldDisplaySkeleton){
      return(
        <>
          <NotificationSkeleton />
          <NotificationSkeleton />
          <NotificationSkeleton />
          <NotificationSkeleton />
          <NotificationSkeleton />
        </>
      );
    }
    else
    {
      if(notificationsData == null)
      {
        return (
          <>
            <div style={{padding: "5%"}}>
              Server didn't respond.
            </div>
          </>
        )
      }
      else if(notificationsData.length == 0){
        return (
          <>
            <div style={{padding: "5%"}}>
              No notifications to display.
            </div>
          </>
        )
      } 
      else {
        return (
          <>
            {notificationsData.map(data => (
              <div key={data.id} id={`NotificationN${data.id}`}>
                <NotificationElement 
                  id={data.id} 
                  movie={data.movie || null}
                  author={data.author} 
                  type={data.type} 
                  content={data.content} 
                  active={data.active.toString()}
                />
              </div>
            ))}
          </>
        )
      }
      
    }
  }

  useEffect(() => {
    GetNotifications();
  },[])

  return(
    <div className={styles.CenterComponent1}>
      <div className={styles.CenterComponent2}>
        <div className={styles.BoxComponent}>
          <div className={styles.BoxComponent_title_box}>
            <h3 className={styles.BoxComponent_title_text}>Notifications</h3>
            <div className={styles.BoxComponent_title_closeButton}>
              <IconButton aria-label="close" size="small" sx={{color:"#c9c9c98c"}}>
                <CloseIcon />
              </IconButton>
            </div>
          </div>
          <div style={{maxHeight: "200px", overflowY: "scroll", overflowX: "hidden"}}>
            {DisplayNotifications(infoLoaded)}    
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotificationBox;
