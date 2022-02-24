import { IconButton, TextField, Tooltip } from '@mui/material';
import React, { FC, useState } from 'react';
import styles from './AdministrationPage.module.scss';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import { SettingsInputAntennaTwoTone } from '@mui/icons-material';


interface AdministrationPageProps { }

const AdministrationPage: FC<AdministrationPageProps> = () => {
  const [title, setTitle] = useState("");
  const [count, setCount] = useState(1);
  const handleClick = (e: React.ChangeEvent<any>) => {
    alert(title + count);

  };
  const handleTitleChange  = (e: React.ChangeEvent<any>) =>{
    setTitle(e.target.value);
    
  }
  const handleCountChange  = (e: React.ChangeEvent<any>) =>{
    
   
            setCount(e.target.value);
  }
  return(
  <div className={styles.AdministrationPage}>
    
      <TextField id="standard-basic" label="Add movie/s by title" required variant="standard" onChange={handleTitleChange}/>
      <Tooltip title="How much movies do you want to add?">
        <TextField sx={{ width: "73px" }} id="outlined-number" label="Number" type="number" InputProps={{ inputProps: { min: 1} }} defaultValue="1" variant="standard" onChange={handleCountChange} InputLabelProps={{ shrink: true, }} />
      </Tooltip>
      <IconButton aria-label="fingerprint" type ="submit" color="secondary" onClick={handleClick}>
        <FingerprintIcon />
      </IconButton>
    
  </div>
  );
}

export default AdministrationPage;
