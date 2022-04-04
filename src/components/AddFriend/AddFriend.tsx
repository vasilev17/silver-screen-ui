import { Button, CardActions, TextField } from '@mui/material';
import React, { FC, SyntheticEvent, useState } from 'react';
import styles from './AddFriend.module.scss';

interface AddFriendProps { }

const AddFriend: FC<AddFriendProps> = () => {

  const [username, setUsername] = useState(' ');
  const [message, setMessage] = useState(' ');
  const [errormessage, setErrorMessage] = useState(' ');
  const [response, setResponse] = useState(' ');
  var token = localStorage.getItem('token');

  document.title = `Silver Screen - Add Friend`;
  
  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await fetch(`${process.env.REACT_APP_API}/User/SendFriendRequest`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`},
      
      body: JSON.stringify({
        username,
        message,

      })
    })
      .then(response => {
        if (response.ok) {
          setResponse("Sent Request");
          setErrorMessage(" ");
          return response.json();
        } else {
          setErrorMessage("this username doesn't exist");
          setResponse(" ");
        }
      })
      

  }

  return (
    <div className={styles.everything}>
      <form onSubmit={submit}>

      <div className={styles.header}>
        <h1>ADD FRIEND</h1>
      </div >
        <div >

          <TextField className={styles.id}
            fullWidth
            label="Username"
            id="filled-size-normal"
            defaultValue=""
            // variant="filled"
            required onChange={e => setUsername(e.target.value)}
            variant="standard"
            error={errormessage != " "}
            helperText={errormessage}
          />
        </div>
        <div >
          <TextField className={styles.message}
            fullWidth
            label="Message"
            id="filled-size-normal"
            defaultValue=""
            required onChange={e => setMessage(e.target.value)}
            variant="standard"
          />
        </div>
        <CardActions>
          <Button className={styles.submit}
            fullWidth
            variant="contained"
            size="large"
            type="submit">
            <span><h1>Submit</h1></span>
            
          </Button>
        </CardActions>
        <div className={styles.request}>{response}</div>
        
      </form>
    </div>
    


  );
};

export default AddFriend;
