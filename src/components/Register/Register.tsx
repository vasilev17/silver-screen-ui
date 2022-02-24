import React, { FC } from 'react';
import styles from './Register.module.scss';
import { Button, CardActions, TextField } from '@mui/material';

interface RegisterProps {}

const Register: FC<RegisterProps> = () => (
  <div className={styles.Login}>
    <div >
            
            <span className={styles.sign_in}><h1>Create an account</h1></span>
            
            <TextField className={styles.email}
              fullWidth
              label="Email"
          id="filled-size-normal"
          defaultValue=""
          variant="filled"
            />
            <div >
            <TextField className={styles.username}
              fullWidth
              label="Username"
          id="filled-size-normal"
          defaultValue=""
          variant="filled"
            />
            </div>
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
          <div >
            <TextField className={styles.confirmPassword}
              fullWidth
              label="Confirm Password"
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
              
              <span><h1>SIGN UP</h1></span>
          </Button>
          </CardActions>

          <div >
          <div className={styles.createaccounttext}>
          <span><h6>Already have an account?</h6></span>
          </div>
          <div className={styles.createaccount}>
          <Button variant="outlined">Log in</Button>
          </div>
          </div>

  </div>
);

export default Register;
