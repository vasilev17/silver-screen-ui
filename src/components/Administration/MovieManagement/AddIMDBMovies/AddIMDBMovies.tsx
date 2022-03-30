import { Alert, Collapse, IconButton, InputLabel, NativeSelect, TextField, Tooltip } from '@mui/material';
import React, { FC, useState } from 'react';
import styles from './AddIMDBMovies.module.scss';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import { SettingsInputAntennaTwoTone } from '@mui/icons-material';
import { fontSize } from '@mui/system';


interface AddIMDBMoviesProps { }

const AddIMDBMovies: FC<AddIMDBMoviesProps> = () => {
  const [title, setTitle] = useState("");
  const [contentType, setContentType] = useState("movie");
  const [alertMessage, setAlertMessage] = useState("You successfully added movie/s!");
  const [alertStatus, setAlertStatus] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  const [alertMessageUpcoming, setAlertMessageUpcoming] = useState("You successfully added movie/s!");
  const [alertStatusUpcoming, setAlertStatusUpcoming] = useState(false);
  const [count, setCount] = useState(1);
  const [countUpcoming, setCountUpcoming] = useState(1);
  const [titleError, setTitleError] = useState(' ');
  const [countError, setCountError] = useState(' ');
  const [countErrorUpcoming, setCountErrorUpcoming] = useState(' ');
  const [openAlert, setOpenAlert] = useState(false);
  const [openAlertUpcoming, setOpenAlertUpcoming] = useState(false);
  var token: string = localStorage.getItem("token");

  const handleClick = (e: React.ChangeEvent<any>) => {
    function addMoviesToDB() {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      };
      fetch(`${process.env.REACT_APP_API}/IMDbAPI/AddMoviesToDB?title=${title}&count=${count}&contentType=${contentType}`, requestOptions)
        .then(response => {
         // if (response.ok) {
           // setAlertStatus(true);
            return response.json();

          //} else {
            //setAlertStatus(false);
            //return response.json();
            
          //}

        })
        .then(data => {
          if (isNaN(data)) {
            setAlertStatus(false);
            setAlertMessage(data.errorMessage)
            openAlertWindow();
          } else {
            setAlertStatus(true);
            setAlertMessage("You successfully added " + data + " movie/s!");
            openAlertWindow();
          }

        });
    }

    addMoviesToDB();

  };
  const openAlertWindow = ()=>{
    setOpenAlert(true);
    setTimeout(() => {
      setOpenAlert(false);
    }, 2000)
    
  }
  const handleClickUpcoming = (e: React.ChangeEvent<any>) => {
    function addUpcomingMoviesToDB() {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      };
      fetch(`${process.env.REACT_APP_API}/IMDbAPI/AddUpComingMoviesToDB?count=${countUpcoming}`, requestOptions)
        .then(response => {
          if (response.ok) {
            setAlertStatusUpcoming(true);
            return response.json();

          } else {
            setAlertStatusUpcoming(false);
            return response.json();
          }

        })
        .then(data => {
          if (!alertStatusUpcoming) {
            setAlertMessageUpcoming(data.errorMessage)
            setOpenAlertUpcoming(true);
            setTimeout(() => {
              setOpenAlertUpcoming(false);
            }, 2000)
          } else {
            setAlertMessageUpcoming("You successfully added " + data + " movie/s!");
            setOpenAlertUpcoming(true);
            setTimeout(() => {
              setOpenAlertUpcoming(false);
            }, 2000)
          }

        });
    }

    addUpcomingMoviesToDB();

  };
  const handleTitleChange = (e: React.ChangeEvent<any>) => {
    if (e.target.value == '') {
      setTitleError("Empty input");
    } else {
      setTitleError(" ");

    }
    setTitle(e.target.value);

  }
  const handleCountChange = (e: React.ChangeEvent<any>) => {
    if (e.target.value < 1) {
      setCountError("Invalid number");
    } else {
      setCountError(" ");

    }
    setCount(e.target.value);
  }
  const handleContentTypeChange = (e: React.ChangeEvent<any>) => {
    setContentType(e.target.value);
  }
  const handleCountUpcomingChange = (e: React.ChangeEvent<any>) => {
    if (e.target.value < 1) {
      setCountErrorUpcoming("Invalid number");
    } else {
      setCountErrorUpcoming(" ");

    }
    setCountUpcoming(e.target.value);
  }
  return (
    <div className={styles.AddIMDBMovies}>
      <div>
        <div className={styles.AddMovieContainer}>
        <TextField id="standard-basic" label="Add movie/s by title" error={titleError != " "} helperText={titleError} required variant="standard" onChange={handleTitleChange} />
        <div className={styles.ContentTypeContainer}>
        <InputLabel sx={{fontSize: "1rem"}} className={styles.ContentTypeLabel} variant="standard" htmlFor="uncontrolled-native">
          ContentType
        </InputLabel>
        <NativeSelect
          onChange={handleContentTypeChange}
          defaultValue={"movie"}
          inputProps={{
            name: 'ContentType',
            id: 'uncontrolled-native',
          }}
        >
          <option value={"tv"}>TVSeries</option>
          <option value={"movie"}>Movie</option>
        </NativeSelect>
        </div>
        <Tooltip title="How much movies do you want to add?">
          <TextField sx={{ width: "73px" }} id="outlined-number" error={countError != " "} helperText={countError} required label="Number" type="number" InputProps={{ inputProps: { min: 1 } }} defaultValue="1" variant="standard" onChange={handleCountChange} InputLabelProps={{ shrink: true, }} />
        </Tooltip>
        <Tooltip title="Submit">
          <IconButton aria-label="fingerprint" type="submit" color="secondary" onClick={handleClick}>
            <FingerprintIcon />
          </IconButton>
        </Tooltip>
      </div>
      <div>
        <Collapse sx={{ top: "200px", left: "20px" }} in={openAlert}>
          <Alert sx={{ width: "250px" }} severity={alertStatus ? "success" : "error"}>{alertMessage}</Alert>
        </Collapse>
      </div>
      </div>

      {/* <div>
        <TextField sx={{ marginLeft: "20px" }} id="standard-read-only-input" label=" " defaultValue="Add upcoming movie/s" InputProps={{ readOnly: true, }} variant="standard" />
        <Tooltip title="How much movies do you want to add?">
          <TextField sx={{ width: "73px" }} id="outlined-number" error={countErrorUpcoming != " "} helperText={countErrorUpcoming} required label="Number" type="number" InputProps={{ inputProps: { min: 1 } }} defaultValue="1" variant="standard" onChange={handleCountUpcomingChange} InputLabelProps={{ shrink: true, }} />
        </Tooltip>
        <Tooltip title="Submit">
          <IconButton aria-label="fingerprint" type="submit" color="secondary" onClick={handleClickUpcoming}>
            <FingerprintIcon />
          </IconButton>
        </Tooltip>
      </div>
      <div>
        <Collapse sx={{ top: "200px", left: "20px" }} in={openAlertUpcoming}>
          <Alert sx={{ width: "250px" }} severity={alertStatusUpcoming ? "success" : "error"}>{alertMessageUpcoming}</Alert>
        </Collapse>
      </div> */}
    </div>


  );
}

export default AddIMDBMovies;
