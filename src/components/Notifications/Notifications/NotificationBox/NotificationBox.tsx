import React, { FC, useEffect, useState } from 'react';
import styles from './NotificationBox.module.scss';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import NotificationSkeleton from '../NotificationSkeleton/NotificationSkeleton';
import NotificationElement from '../NotificationElement/NotificationElement';

interface NotificationBoxProps {
  notificationInfo,
  setNotificationInfo,
  infoLoaded: boolean,
  setButtonState
}

const NotificationBox: FC<NotificationBoxProps> = (notifications) => {

  function DisplayNotifications(shouldDisplaySkeleton:boolean) {
    console.warn(shouldDisplaySkeleton);
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
      if(notifications.notificationInfo == null)
      {
        return (
          <>
            <div style={{padding: "5%"}}>
              Server didn't respond.
            </div>
          </>
        )
      }
      else if(notifications.notificationInfo.length == 0){
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
            {notifications.notificationInfo.map(data => (
              <div key={data.id} id={`NotificationN${data.id}`}>
                <NotificationElement 
                  id={data.id} 
                  movie={data.movie || null}
                  author={data.author} 
                  type={data.type} 
                  content={data.content} 
                  active={data.active.toString()}
                  setNotificationsData={notifications.setNotificationInfo}
                  NotificationsData={notifications.notificationInfo}
                  setButtonState={notifications.setButtonState}
                />
              </div>
            ))}
          </>
        )
      }
      
    }
  }

  // useEffect(() => {
  //   //GetNotifications();
  //   //gets rid of the navbar
  //   // var navbar = document.getElementById('mainNavbar');
  //   // navbar.hidden = true;  
  // },[])

  return(
    <div className={styles.CenterComponent1}>
      <div className={styles.CenterComponent2}>
        <div className={styles.BoxComponent}>
          <div className={styles.BoxComponent_title_box}>
            <h3 className={styles.BoxComponent_title_text}>Notifications</h3>
            <div className={styles.BoxComponent_title_closeButton}>
              <IconButton onClick={() => notifications.setButtonState((prev) => !prev)} aria-label="close" size="small" sx={{color:"#c9c9c98c"}}>
                <CloseIcon />
              </IconButton>
            </div>
          </div>
          <div style={{maxHeight: "200px", overflowY: "scroll", overflowX: "hidden"}}>
            {DisplayNotifications(notifications.infoLoaded)}    
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotificationBox;
