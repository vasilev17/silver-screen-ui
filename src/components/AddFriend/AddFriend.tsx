import { Button, CardActions, TextField } from '@mui/material';
import React, { FC, SyntheticEvent, useState } from 'react';
import styles from './AddFriend.module.scss';

interface AddFriendProps { }

const AddFriend: FC<AddFriendProps> = () => {

  const [id, setId] = useState(' ');
  const [message, setMessage] = useState(' ');
  var token = localStorage.getItem('token');

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await fetch(`${process.env.REACT_APP_API}/User/SendFriendRequest`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`},
      
      body: JSON.stringify({
        friendID:id,
        message,

      })
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Error while processing the request!");
        }
      }).then(data => {
          console.log(data.token);
          window.location.reload();
        
          


        
      });
      

  }

  return (
<div>
    <div>
      <form onSubmit={submit}>

        <div >

          <TextField className={styles.id}
            fullWidth
            label="Id"
            id="filled-size-normal"
            defaultValue=""
            // variant="filled"
            required onChange={e => setId(e.target.value)}
            variant="standard"

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
      </form>
    </div>
    </div>


  );
};

export default AddFriend;
