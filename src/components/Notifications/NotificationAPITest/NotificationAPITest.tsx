import { Button, styled, TextField } from '@mui/material';
import React, { FC, useEffect } from 'react';
import styles from './NotificationAPITest.module.scss';

interface NotificationAPITestProps {}

var token: any = null;

const handleChange = (event: any) => {
  token = event.target.value;
};

const BlackTextField = styled(TextField)({
  backgroundColor: "#4e4e4e29",
  '& label.Mui-focused': {
    color: '#c9c9c9c4',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#c9c9c9c4',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#c9c9c98c',
    },
    '&:hover fieldset': {
      borderColor: '#c9c9c9',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#c9c9c9c4',
    },
  },
});

function getNotificationsRequest(){
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
        console.log(response.json());
      } else {
        console.warn("Error while processing the request!");
      }
    });
}

const NotificationAPITest: FC<NotificationAPITestProps> = () => {
  useEffect(() => {
    var navbar = document.getElementById('mainNavbar');
    navbar.remove();
  },[])
  return(
    <div className={styles.CenterComponent1}>
      <div className={styles.CenterComponent2}>
        <div className={styles.BoxComponent}>
          <div className={styles.BoxComponent_title_box}>
            <h2 className={styles.BoxComponent_title_text}>Get notifications</h2>
          </div>
          <BlackTextField onChange={handleChange} fullWidth label="Authenication token" variant="outlined" style={{marginBottom: '4%', width: '80%'}} />
          <br></br>
          <Button variant="contained" onClick={getNotificationsRequest} style={{background: '#4e4e4e', color: 'white'}}>Get request for notifications</Button>
        </div>
      </div>
    </div>
  );
}
export default NotificationAPITest;
