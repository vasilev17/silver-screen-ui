import { Alert, Collapse, IconButton, TextField, Tooltip } from '@mui/material';
import React, { FC, useState } from 'react';
import styles from './AdministrationPage.module.scss';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import { SettingsInputAntennaTwoTone } from '@mui/icons-material';


interface AdministrationPageProps { }

const AdministrationPage: FC<AdministrationPageProps> = () => {
  const [title, setTitle] = useState("");
  const [count, setCount] = useState(1);
  const [titleError, setTitleError] = useState(' ');
  const [countError, setCountError] = useState(' ');
  const [openAlert, setOpenAlert] = useState(false);
  var token: string = localStorage.getItem("token"); 
  
  const handleClick = (e: React.ChangeEvent<any>) => {
    function addMoviesToDB(){
      const requestOptions = {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json', 
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      };
      fetch(`http://localhost:5000/IMDbAPI/AddMoviesToDB?title=${title}&count=${count}`, requestOptions)
        .then(response => {
          if(response.ok) {
            setOpenAlert(true);
            setTimeout(() => {
              setOpenAlert(false);
            }, 2000)
          } else {
            alert("Error while processing the request!");

          }
        });
    }
    addMoviesToDB();

  };
  const handleTitleChange  = (e: React.ChangeEvent<any>) =>{
    if(e.target.value==''){
      setTitleError("Empty input");
    }else{
      setTitleError(" ");
       
    }
    setTitle(e.target.value);
    
  }
  const handleCountChange  = (e: React.ChangeEvent<any>) =>{
    if(e.target.value<1){
      setCountError("Invalid number");
    }else{
      setCountError(" ");
       
    }
    setCount(e.target.value);
  }
  return(
  <div className={styles.AdministrationPage}>
      <div>
      <TextField id="standard-basic" label="Add movie/s by title" error = {titleError != " "} helperText={titleError} required variant="standard" onChange={handleTitleChange}/>
      <Tooltip title="How much movies do you want to add?">
        <TextField sx={{ width: "73px" }} id="outlined-number" error = {countError != " "} helperText={countError} label="Number" type="number" InputProps={{ inputProps: { min: 1} }}  defaultValue="1"  variant="standard" onChange={handleCountChange} InputLabelProps={{ shrink: true, }} />
      </Tooltip>
      <IconButton aria-label="fingerprint" type ="submit" color="secondary" onClick={handleClick}>
        <FingerprintIcon />
      </IconButton>
      </div>
      <div>
        <Collapse sx={{ top:"200px" , left:"20px"}} in={openAlert}>
        <Alert sx={{ width: "250px"}} severity="success">You successfully added movie/s!</Alert>
      </Collapse>
      </div>
      
    
  </div>
  );
}

export default AdministrationPage;
