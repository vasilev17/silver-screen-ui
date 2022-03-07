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
  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await fetch('http://localhost:5000/User/Register', {
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
        } else {
          console.error(data.errorMessage);

          if (data.errorMessage === "This username is already in use") {
          setUsernameError(data.errorMessage);
          setEmailError(" ");
          setPasswordError(" ");
          }else if (data.errorMessage === "This email is already in use") {
            setEmailError(data.errorMessage);
            setUsernameError(" ");
            setPasswordError(" ");
          
          }else if(data.errorMessage === "wrong password"){
            setPasswordError(data.errorMessage);
            setConfirmPasswordError(data.errorMessage);
            setEmailError(" ");
            setUsernameError(" ");
          }else{
            setPasswordError(data.errorMessage);
            setConfirmPasswordError(data.errorMessage);
          }
          
          

        }
      });

  }
  function SendToLogin() {
    navigate("/login");
  }
  return (
    <div className={styles.Login}>
      <form onSubmit={submit}>
        <div >

          <span className={styles.sign_in}><h1>Create an account</h1></span>

          
            
        
          <TextField className={styles.email}
            fullWidth
            label="Username"
            id="filled-size-normal"
            defaultValue=""
            variant="filled"
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
              variant="filled"
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
            variant="filled"
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
            variant="filled"
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