import { Button, CardActions, TextField } from '@mui/material';
import React, { FC } from 'react';
import styles from './Login.module.scss';

interface LoginProps {
 
}
    
const Login: FC<LoginProps> = () => (
  <div className={styles.Login}>
    <div >
            
            <span className={styles.sign_in}><h1>Sign In</h1></span>
            
            <TextField className={styles.email}
              fullWidth
              label="Email"
          id="filled-size-normal"
          defaultValue=""
          variant="filled"
            />
            </div>
            <div >
            <TextField className={styles.password}
              fullWidth
              label="Password"
          id="filled-size-normal"
          defaultValue=""
          variant="filled"
          type = "password"
            />
          </div>
          <CardActions>
          <Button className={styles.login}
          fullWidth
            variant="contained"
            size="large">
              
              <span><h1>SIGN IN</h1></span>
          </Button>
          </CardActions>

  </div>
);

export default Login;
