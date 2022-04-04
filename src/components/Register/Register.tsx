import React, { FC, SyntheticEvent, useEffect, useState } from 'react';
import styles from './Register.module.scss';
import { Button, CardActions, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface RegisterProps { }

const Register: FC<RegisterProps> = () => {
  const [username, setUsername] = useState(' ');
  const [email, setEmail] = useState(' ');
  const [password, setPassword] = useState(' ');
  const [confirmpassword, setConfirmPassword] = useState(' ');
  const navigate = useNavigate();
  const [usernameError, setUsernameError] = useState(' ');
  const [emailError, setEmailError] = useState(' ');
  const [passwordError, setPasswordError] = useState(' ');
  const [confirmpasswordError, setConfirmPasswordError] = useState(' ');

  useEffect(() => {

    document.title = `Silver Screen - Register`;

  }, []);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();


    await fetch(`${process.env.REACT_APP_API}/User/Register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        username,
        password,
        confirmpassword
      })
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Error while processing the request!");
        }
      })
      .then(data => {
        if (data.errorMessage == null) {
          console.log(data.token);
          localStorage.setItem("token", data.token);
          navigate("/");
          window.location.reload();
        } else {
          console.error(data.errorMessage);

          let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

          
          if (data.errorMessage == "This username is already in use") {
          setUsernameError(data.errorMessage);
          setEmailError(" ");
          setPasswordError(" ");
          setConfirmPasswordError(" ");
          }else if (data.errorMessage == "Username is not valid") {
          setUsernameError(data.errorMessage);
          setEmailError(" ");
          setPasswordError(" ");
          setConfirmPasswordError(" ");
          }else if (data.errorMessage == "The username requires more than 3 and less than 20 characters") {
          setUsernameError(data.errorMessage);
          setEmailError(" ");
          setPasswordError(" ");
          setConfirmPasswordError(" ");
        
          }else if (data.errorMessage == "This email is already in use") {
            setEmailError(data.errorMessage);
            setUsernameError(" ");
            setPasswordError(" ");
            setConfirmPasswordError(" ");
            
          }else if (data.errorMessage == "Invalid Email") {
            setEmailError(data.errorMessage);
            setUsernameError(" ");
            setPasswordError(" ");
            setConfirmPasswordError(" ");
            
          }else if(data.errorMessage === "wrong password"){
            setPasswordError(data.errorMessage);
            setConfirmPasswordError(data.errorMessage);
            setEmailError(" ");
            setUsernameError(" ");
          }else{
            setPasswordError(data.errorMessage);
            setConfirmPasswordError(data.errorMessage);
            setEmailError(" ");
            setUsernameError(" ");
          }
          
          

        }
      });

  }
  function SendToLogin() {
    navigate("/login");
  }
  return (
    <div className={styles.everything}>
      <form onSubmit={submit}>
        <div >

          <span className={styles.sign_in}><h1>Create an account</h1></span>

          
            
        
          <TextField className={styles.email}
            fullWidth
            label="Username"
            id="filled-size-normal"
            defaultValue=""
            variant="standard"
            required onChange={e => setUsername(e.target.value)}
            error={usernameError != " "}
            helperText={usernameError}
          />
          </div>
          <div >
          <TextField className={styles.username}
              fullWidth
              label="Email"
              id="filled-size-normal"
              defaultValue=""
              variant="standard"
              required onChange={e => setEmail(e.target.value)}
            error={emailError != " "}
            helperText={emailError} 
            />
          
        </div>
          
        <div >
          <TextField className={styles.password}
            fullWidth
            label="Password"
            id="filled-size-normal"
            defaultValue=""
            variant="standard"
            type="password"
            required onChange={e => setPassword(e.target.value)}
            error={passwordError != " "}
            helperText={passwordError}
          />
        </div>
        <div >
          <TextField className={styles.confirmPassword}
            fullWidth
            label="Confirm Password"
            id="filled-size-normal"
            defaultValue=""
            required onChange={e => setConfirmPassword(e.target.value)}
            variant="standard"
            type="password"
            error={confirmpasswordError != " "}
            helperText={confirmpasswordError}
          />
        </div>
        <CardActions>
          <Button className={styles.login}
            fullWidth
            variant="contained"
            size="large"
            type="submit">
            <span><h1>SIGN UP</h1></span>
          </Button>
        </CardActions>

        <div >
          <div className={styles.createaccounttext}>
            <span><h6>Already have an account?</h6></span>
          </div>
          <div className={styles.createaccount}>
            <Button variant="outlined" type = "button" onClick={() => SendToLogin()}>Log in</Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
