import { Avatar, IconButton, Tooltip } from '@mui/material';
import React, { FC } from 'react';
import styles from './NotificationElement.module.scss';
import CloseIcon from '@mui/icons-material/Close';
import { style } from '@mui/system';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';


interface NotificationElementProps {
  id:number,
  author:{
    avatar:string,
    id:number,
    username:string
  }
  type:string,
  content:string,
  movie?:{
    id:number,
    title:string,
  },
  active:boolean,  
}

const NotificationElement: FC<NotificationElementProps> = (notificationInfo) => {  
  function DestroyNotificaton()
  {
    var element = document.getElementById(`NotificationN${notificationInfo.id}`);
    element.parentNode.removeChild(element);
    //Todo deletion code
  }
  
  function DisplayNotification(){
    if(notificationInfo.type === 'TextOnly' && notificationInfo.movie === null){
      return (
        <>
          <div className={styles.NotificationBox}>
            <Avatar alt={notificationInfo.author.username} src={notificationInfo.author.avatar}/>
            <Tooltip title="Expand notification">
              <a href="#" className={styles.NotificationBox_textExpand}>{notificationInfo.content}</a>
            </Tooltip>
            <Tooltip title="Delete notification">
              <IconButton onClick={() => DestroyNotificaton()} aria-label="close" size="small" sx={{color:"#c9c9c98c", marginTop: "2%"}} className={styles.NotificationBox_closeButton}>
                <CloseIcon />
              </IconButton>
            </Tooltip>
          </div>
        </>
      );
    } 
    else if(notificationInfo.type === 'TextOnly')
    {  
      var username1 = notificationInfo.author.username;
      var title = notificationInfo.movie.title;
      if(username1.length>20)
      {
        username1 = username1.substring(0, 20) + "...";
      }
      if(title.length>20)
      {
        title = title.substring(0, 20) + "...";
      }
      return (
        <>
          <div className={styles.NotificationBox}>
            <Avatar alt={notificationInfo.author.username} src={notificationInfo.author.avatar}/>
            <Tooltip title="Expand notification">
              <a href="#" className={styles.NotificationBox_textExpand}><b style={{color: "#d37dff"}}>{username1}</b> recommended you <i><b style={{color: "#ff9562"}}>{title}</b></i>.</a>
            </Tooltip>
            <Tooltip title="Delete notification">
              <IconButton onClick={() => DestroyNotificaton()} aria-label="close" size="small" sx={{color:"#c9c9c98c", marginTop: "2%"}} className={styles.NotificationBox_closeButton}>
                <CloseIcon />
              </IconButton>
            </Tooltip>
          </div>
        </>
      );
    }
    else if(notificationInfo.type === 'FriendRequest'){
      var username2 = notificationInfo.author.username;
      if(username2.length>17)
      {
        username2 = username2.substring(0, 17) + "...";
      }
      return (
        <>
          <div className={styles.NotificationBox}>
            <Avatar alt={notificationInfo.author.username} src={notificationInfo.author.avatar}/>
            <Tooltip title="Expand notification">
              <a href="#" className={styles.NotificationBox_textExpand}><b style={{color: "#d37dff"}}>{username2}</b> wants to become your friend!</a>
            </Tooltip>
            <Tooltip title="Accept">
              <IconButton onClick={() => DestroyNotificaton()} aria-label="close" size="small" color="success" sx={{ marginTop: "2%"}} className={styles.NotificationBox_closeButton}>
                <CheckCircleOutlineIcon style={{fontSize: "26px"}} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Decline">
              <IconButton onClick={() => DestroyNotificaton()} aria-label="close" size="small" color="error" sx={{ marginTop: "2%"}} className={styles.NotificationBox_closeButton}>
                <DoDisturbIcon />
              </IconButton>
            </Tooltip>
          </div>
        </>
      );
    }
  }

  return(
    <div>
      {/* ID: {notificationInfo.id}
      <br/>
      User: {notificationInfo.Author.username} [ID: {notificationInfo.author.id}]
      <br/>
      User Avatar: {notificationInfo.Author.avatar}
      <br/>
      Type: {notificationInfo.type}
      <br/>
      MovieID: {notificationInfo.movie?.id}
      <br/> 
      MovieTitle: {notificationInfo.movie?.title}
      <br/> 
      Contents: {notificationInfo.content}
      <br/> 
      Active: {notificationInfo.active} */}
      {DisplayNotification()}
      <div style={{borderBottom: 'solid 1.5px #c9c9c98c'}}/>
    </div>
  );
};

export default NotificationElement;
