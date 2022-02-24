import { Avatar, ButtonBase, IconButton, styled, Tooltip } from '@mui/material';
import React, { FC } from 'react';
import styles from './NotificationElement.module.scss';
import CloseIcon from '@mui/icons-material/Close';
import { unmountComponentAtNode } from 'react-dom';


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
          <div style={{display: 'flex', justifyContent: 'space-between', padding: '3%'}}>
            <Avatar alt={notificationInfo.author.username} src={notificationInfo.author.avatar}/>
            <Tooltip title="Expand notification">
              <a href="#" style={{marginLeft: '5%', color: 'inherit', textDecoration: 'none'}}>{notificationInfo.content}</a>
            </Tooltip>
            <Tooltip title="Delete notification">
              <IconButton onClick={() => DestroyNotificaton()} aria-label="close" size="small" sx={{color:"#c9c9c98c"}} style={{width: '2rem', height: '2rem', marginTop: '2%'}}>
                <CloseIcon />
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
