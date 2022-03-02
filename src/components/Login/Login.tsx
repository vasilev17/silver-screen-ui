import { Button, CardActions, Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material';
import React, { FC, SyntheticEvent, useEffect, useState } from 'react';
import styles from './Login.module.scss';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
interface LoginProps {

}



const Login: FC<LoginProps> = () => {



  const [email, setEmail] = useState(' ');
  const [password, setPassword] = useState(' ');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState(' ');
  const [passwordError, setPasswordError] = useState(' ');
  function SendToRegister() {
    navigate("/register");
  }
  const handleCheckBoxChange = (event) => {
    setRememberMe(event.target.checked)
  };
  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    
    await fetch('http://localhost:5000/User/Login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
        rememberMe
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
          
            setEmailError("email or password is wrong");
            setPasswordError("email or password is wrong");
         


        }
      });

      

  }
  return (
    <div className={styles.Login}>
      <form onSubmit={submit}>
        <div >

          <span className={styles.sign_in}><h1>Sign In</h1></span>

          <TextField className={styles.email}
            fullWidth
            label="Email"
            id="filled-size-normal"
            defaultValue=""
            // variant="filled"
            required onChange={e => setEmail(e.target.value)}
            variant="standard"
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
            required onChange={e => setPassword(e.target.value)}
            variant="standard"
            type="password"
            error={passwordError != " "}
            helperText={passwordError}
          />
        </div>
        <CardActions>
          <Button className={styles.login}
            fullWidth
            variant="contained"
            size="large"
            type="submit">

            <span><h1>SIGN IN</h1></span>
          </Button>
        </CardActions>

        <FormGroup className={styles.rememberme}>
          
          <FormControlLabel  
          id ="rememberme" 
          control={<Checkbox />} 
          label="Remember me" 
          onChange={handleCheckBoxChange}
          />
        </FormGroup>
        <div >
          <div className={styles.createaccounttext}>
            <span><h6>Don't have an account?</h6></span>
          </div>
          <div className={styles.createaccount}>
            <Button variant="outlined" type = "button" onClick={() => SendToRegister()} >Create account</Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;


