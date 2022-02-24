import { IconButton, TextField, Tooltip } from '@mui/material';
import React, { FC } from 'react';
import styles from './AdministrationPage.module.scss';
import FingerprintIcon from '@mui/icons-material/Fingerprint';


interface AdministrationPageProps {}

const AdministrationPage: FC<AdministrationPageProps> = () => (
  <div className={styles.AdministrationPage}>
    <TextField id="standard-basic" label="Add movie/s by title" variant="standard" />
    <Tooltip title="How much movies do you want to add?">
    <TextField  sx= {{width:"73px"}} id="outlined-number" label="Number" type="number" defaultValue="1" variant="standard" InputLabelProps={{shrink: true,}}/> 
      </Tooltip>
    <IconButton aria-label="fingerprint" color="secondary">
  <FingerprintIcon />
</IconButton>
  </div>
);

export default AdministrationPage;
