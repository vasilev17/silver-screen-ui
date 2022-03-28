import { Avatar, Box, Button, Fade, Grow, IconButton, Input, Modal, Stack, styled, TextField, Typography } from '@mui/material';
import React, { FC, SyntheticEvent, useEffect, useState } from 'react';
import styles from './Profile.module.scss';
import { useNavigate } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import Login from '../Login/Login';
import SearchIcon from '@mui/icons-material/Search';
import FriendList from '../FriendList/FriendList';
import UploadAvatar from '../Profile/UploadAvatar/UploadAvatar';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};





interface ProfileProps { }

const Profile: FC<ProfileProps> = () => {




  function SendToRegister() {
    navigate("/register");
  }
  function SendToLogin() {
    navigate("/login");
  }
  function RemoveToken() {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  }
  function SendToAddFriend() {
    navigate("/addfriend");
    window.location.reload();

  }
  const [username, setUsername] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const navigate = useNavigate();

  const [code, setCode] = useState(<></>);
  const Input = styled('input')({
    display: 'none',
  });
  var token = localStorage.getItem('token');
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/User/UserGetInfo`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },

    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          localStorage.removeItem("token");

        };


      }).then(data => {

        setUsername(data.username);
        setAvatar(data.avatar);


        if (data !== null) {

          setCode(
            <form onSubmit={submit}>
              <div className={styles.frame2}>
                <div className={styles.logout}>
                  <Button variant="outlined" type="button" onClick={() => RemoveToken()}>Logout</Button>
                </div>
                <div className={styles.username} >

                  {data.username}


                </div>

                <div className={styles.avatar}>
                  
                        <Avatar src={data.avatar} />

                      

                </div>
                <div className={styles.friendsList}>
                  <div className={styles.friends}>
                    <h1>Friends</h1>
                  </div>
                  <div className={styles.addFriend}>
                    <IconButton onClick={() => SendToAddFriend()}>
                      <PersonAddIcon />
                    </IconButton>
                  </div>
                </div>
                <div className={styles.friendsList2}>
                  <FriendList />
                </div>

              </div>

            </form>
          );
          console.log("logout")
        } else {
          setCode(
            <div className={styles.frame}>
              <><div className={styles.FriendsList}>
                <div className={styles.login}>
                  <Button variant="outlined" type="button" onClick={() => SendToLogin()}>Sign In</Button>

                </div>
                <div className={styles.register}>
                  <Button variant="outlined" type="button" onClick={() => SendToRegister()}>Sign Up</Button>
                </div>
              </div><div>


                </div></>
            </div>


          );
          console.log("login")
        }
      })
      .catch(error => {
        setCode(

          <div className={styles.frame}>
            <><div className={styles.FriendsList}>
              <div className={styles.login}>
                <Button variant="outlined" type="button" onClick={() => SendToLogin()}>Sign In</Button>

              </div>
              <div className={styles.register}>
                <Button variant="outlined" type="button" onClick={() => SendToRegister()}>Sign Up</Button>
              </div>
            </div><div>


              </div></>
          </div>


        );

      });


  }, [])


  const [uploadavatar, setUploadAvatar] = useState(' ');
  var token = localStorage.getItem('token');
  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await fetch(`${process.env.REACT_APP_API}/User/UploadAvatar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },

      body: JSON.stringify({
        uploadavatar

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

    <>{code}</>



  );






}


export default Profile;
