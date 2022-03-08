import { IconButton, Tooltip } from '@mui/material';
import React, { FC } from 'react';
import styles from '../NotificationElement/NotificationElement.module.scss';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router';

/* eslint-disable jsx-a11y/anchor-is-valid */

interface NotificationMovieElementProps {
  id:number,
  date:Date,
  movie?:{
    id:number,
    title:string,
  },
  setNotificationsData,
  notificationsData,
  setButtonState
}

const NotificationMovieElement: FC<NotificationMovieElementProps> = (notificationInfo) => {  
  const navigate = useNavigate();

  function DestroyNotificaton()  {

    var notfArr = notificationInfo.notificationsData;
    notfArr = notfArr.filter(x => x.id !== notificationInfo.id);
    notificationInfo.setNotificationsData(notfArr);

    var token = localStorage.getItem('token');
    
    const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json', 
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        movieId: notificationInfo.movie.id,
        status: true        
      })
    };
    fetch(`${process.env.REACT_APP_API}/NotificationManagement/SetFilmReleaseNotification`, requestOptions)
      .then(response => {
        if(response.ok) {
          return response.json();
        } else {
          console.warn("Error while processing the request!");
        }
      })
      .catch(error => {
        console.warn("Error while processing the request!"); 
      });
  }

  function GoToMoviePage(){
    notificationInfo.setButtonState((prev) => !prev);
    navigate(`/movie/${notificationInfo.movie.id}`);
  }
  

  function DisplayNotification(){
    var title = notificationInfo.movie.title;
    if(title.length>20)
    {
      title = title.substring(0, 20) + "...";
    }
    return (
      <>
        <div className={styles.NotificationBox}>
          <Tooltip title="Go to movie page">
            <a onClick={() => GoToMoviePage()}  className={styles.NotificationBox_textExpand}><i><b style={{color: "#ff9562"}}>{title}</b></i> just got released. Go watch it in the theaters!</a>
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

  return(
    <div>
      {DisplayNotification()}
      <div style={{borderBottom: 'solid 1.5px #c9c9c98c'}}/>
    </div>
  );
};

export default NotificationMovieElement;
