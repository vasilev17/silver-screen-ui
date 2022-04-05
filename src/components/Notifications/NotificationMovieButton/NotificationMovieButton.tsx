import React, { FC, useEffect, useState } from 'react';
import styles from './NotificationMovieButton.module.scss';
import NotifyMeIcon from '@mui/icons-material/NotificationAddRounded';
import NotifyMeActiveIcon from '@mui/icons-material/NotificationsActiveRounded';

interface NotificationMovieButtonProps {
  movieId: number,
  snackbarAlert
}

const NotificationMovieButton: FC<NotificationMovieButtonProps> = (props) => {
  const [isMovieSubscriptionSet, setIsMovieSubscriptionSet] = useState(false);

  function getSubscriptionStatus(){
    const requestOptions = {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json', 
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
      },
    };
    fetch(`${process.env.REACT_APP_API}/NotificationManagement/GetSubscribedFilmStatus?movieId=${props.movieId}`, requestOptions)
      .then(response => {
        if(response.ok) {
          return response.json();
        }
      })
      .then(data => {
        setIsMovieSubscriptionSet(data.status);
      })
      .catch(error => {
        console.warn("Error while processing the request!");
      });
  }

  function setSubscriptionStatus(status:boolean) {
    const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json', 
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        movieId: props.movieId,
        status: status
      })
    };
    fetch(`${process.env.REACT_APP_API}/NotificationManagement/SetFilmReleaseNotification`, requestOptions)
      .then(response => {
        if(response.ok) {
          return response.json();
        }
      })
      .then(data => {
        status = !status;
        setIsMovieSubscriptionSet(status);
        props.snackbarAlert(`Notification successfully ${status? "set":"removed"}!`, "success");
      })
      .catch(error => {
        console.warn("Error while processing the request!");
        props.snackbarAlert("Notification setting error!", "error");
      });
  }

  useEffect(() => {
    getSubscriptionStatus();
  },[])
  

  return (
    <div className={styles.NotificationMovieButton}>
      {
        isMovieSubscriptionSet ?
          <NotifyMeActiveIcon onClick={() => setSubscriptionStatus(true)} sx={{ fontSize: '2.3em' }} />
          :
          <NotifyMeIcon onClick={() => setSubscriptionStatus(false)} sx={{ fontSize: '2.3em' }} />
      }
    </div>
  );
}

export default NotificationMovieButton;
