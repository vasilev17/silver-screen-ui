import { Button, styled, TextField } from '@mui/material';
import { textAlign } from '@mui/system';
import React, { FC } from 'react';
import styles from './Notifications.module.scss';

interface NotificationsProps {}

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
  fetch(`http://localhost:5000/NotificationManagement/GetMovieNotifications`, requestOptions)
    .then(response => {
      if(response.ok) {
        console.log(response.json());
      } else {
        console.warn("Error while processing the request!");
      }
    });
}

const Notifications: FC<NotificationsProps> = () => (
  <div className={styles.Notifications} style={{display: "table", position: "absolute", top: "0", left: "0", width: "100%", height: "100%"}}>
    <div style={{display: "table-cell", verticalAlign: "middle"}}>
      <div style={{marginLeft: 'auto', marginRight: 'auto', width: '30%', backgroundColor: '#0000004f', textAlign: 'center', padding: '0% 0% 2% 0%', border: 'solid 1.5px #c9c9c98c'}}>
        <div style={{backgroundColor: '#0000006e', marginTop: '-1.2em', borderBottom: '1px solid rgba(201, 201, 201, 0.55)', marginBottom: '4%'}}>
          <h2 style={{padding: '1%', marginBottom: '1%'}}>Get notifications</h2>
        </div>
        <BlackTextField onChange={handleChange} fullWidth label="Authenication token" variant="outlined" style={{marginBottom: '4%', width: '80%'}} />
        <br></br>
        <Button variant="contained" onClick={getNotificationsRequest} style={{background: '#4e4e4e', color: 'white'}}>Get request for notifications</Button>
      </div>
    </div>  
  </div>
);

export default Notifications;
