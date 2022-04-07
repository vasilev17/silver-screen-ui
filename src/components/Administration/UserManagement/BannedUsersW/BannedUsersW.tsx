import { Alert, Button, Checkbox, FormControlLabel, Slider, Snackbar, Tooltip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { FC, useEffect, useState } from 'react';
import AdminActionModal from '../../AdminActionModal/AdminActionModal';
import styles from './BannedUsersW.module.scss';

interface BannedUsersWProps {}

const BannedUsersW: FC<BannedUsersWProps> = () => {

  const token = localStorage.getItem('token');
  const [warningsLimitEnabled, setWarningsLimitEnabled] = useState(false);
  const [warningsLimit, setWarningsLimit] = useState(1);
  const [fakeReportsLimitEnabled, setFakeReportsLimitEnabled] = useState(false);
  const [fakeReportsLimit, setFakeReportsLimit] = useState(70);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("Test message.");
  const [alertErr, setAlertErr] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [userId, setUserId] = useState(-1);
  const [username, setUsername] = useState("#USERNAME#");
  const [rows, setRows] = useState([]);


  function ValueLabelComponent(props) {
    const { children, value } = props;
  
    return (
      <Tooltip enterTouchDelay={0} placement="top" title={value + "%"}>
        {children}
      </Tooltip>
    );
  }

  function FetchBannedUsers(){
    const requestOptions = {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json', 
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    };
    fetch(`${process.env.REACT_APP_API}/AdministrationManagment/LoadAllBannedUsers`, requestOptions)
      .then(response => {
        if(response.ok) {
          return response.json();
        } else {
          console.warn("Error while processing the request!");
        }
      })
      .then(data => {
        var bannedUsersList = [];
        data.bannedUsers.$values.map(user => {
          bannedUsersList.push({ id: user.userId, username: user.username, fakeReports: user.fakeReports, reports: user.reports, warnings: user.warnings });;;;
        });
        setRows(bannedUsersList);
      })
      .catch(error => {
        console.warn("Error while processing the request!"); 
      });
  }

  function FetchConfig() {
    const requestOptions = {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json', 
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    };
    fetch(`${process.env.REACT_APP_API}/AdministrationManagment/LoadConfig`, requestOptions)
      .then(response => {
        if(response.ok) {
          return response.json();
        }
      })
      .then(data => {
        if(data.warningsLimit !== null){
          setWarningsLimit(data.warningsLimit);
          setWarningsLimitEnabled(true);
        }
        if(data.fakeReportsLimit !== null){
          setFakeReportsLimit(data.fakeReportsLimit);
          setFakeReportsLimitEnabled(true);
        }
      })
      .catch(error => {
        console.error("Error fetching configuration!");
      });
  }
  
  function UnbanUser(userID:number, username:string) {
    setUserId(userID);
    setUsername(username);
    setOpenModal(true);
  }

  function ApplyChanges(){
    const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json', 
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    };
    fetch(`${process.env.REACT_APP_API}/AdministrationManagment/SaveConfig?isFakeReportsSelected=${fakeReportsLimitEnabled}&isThereALimit=${warningsLimitEnabled}&fakeReports=${fakeReportsLimit}&warningsLimit=${warningsLimit}`, requestOptions)
      .then(response => {
        if(response.ok) {
          return response.json();
        } else {
          setAlertMsg(`Config failed to update!`);
          setAlertErr(true);
          setOpenAlert(true);
        }
      })
      .then(data => {
        setAlertMsg(data.message);
        setAlertErr(false);
        setOpenAlert(true);
      })
      .catch(error => {
        setAlertMsg(`Config failed to update!`);
        setAlertErr(true);
        setOpenAlert(true);
      });
  }

  const columns = [
    { field: 'username', headerName: 'Username', width: 150 },
    { field: 'fakeReports', headerName: 'Fake reports', width: 100 },
    { field: 'reports', headerName: 'Reports', width: 70 },
    { field: 'warnings', headerName: 'Warnings', width: 80 },
    { field: 'actions', headerName: 'Actions', width: 90, sortable: false,
      renderCell: (params) => (
        <strong>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => UnbanUser(params.row.id, params.row.username)}
            style={{ marginLeft: 0, background: "#915f2d", color: "#d9d9d9", fontSize: '0.7rem' }}
          >
            Unban
          </Button>
        </strong>
      ), 
    }
  ];
  
  // const rows = [
  //   { id: 0, username: 'user1', fakeReports: 412, reports: 0, warnings: 4 },
  //   { id: 1, username: 'user2', fakeReports: 100, reports: 3, warnings: 4 },
  //   { id: 2, username: 'user3', fakeReports: 52, reports: 1, warnings: 4 },
  // ];

  useEffect(() => {
    FetchConfig();
    FetchBannedUsers();
  },[])
  

  return(
    <div className={styles.BannedUsersW}>
      <div style={{ height: 270, width: 500 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={3}
          rowsPerPageOptions={[3]}
        />
      </div>
      <div className={styles.AddPriv}>
        <div className={styles.AddPriv_title}>Ban user automatically if:</div>
        <FormControlLabel control={<Checkbox checked={fakeReportsLimitEnabled} onChange={() => setFakeReportsLimitEnabled((prev) => !prev)} style={{color:'#666666'}} />} style={{color:'#666666'}} label="They reach a specified fake reports limit:" />
        <div style={{display: 'inline-flex'}}>
          <div className={styles.AddPriv_leftLabel}>0%</div>
          <Slider
            disabled={!fakeReportsLimitEnabled}
            valueLabelDisplay="auto"
            components={{
              ValueLabel: ValueLabelComponent,
            }}
            value={fakeReportsLimit}
            onChange={(e) => setFakeReportsLimit(parseInt((e.target as HTMLInputElement).value))}
            style={{color:'#666666'}}
            defaultValue={80}
          />  
          <div className={styles.AddPriv_rightLabel}>100%</div>
        </div>
        <div style={{display: 'inline-flex'}}>
          <FormControlLabel control={<Checkbox checked={warningsLimitEnabled} onChange={() => setWarningsLimitEnabled((prev) => !prev)} style={{color:'#666666'}} />} style={{color:'#666666'}} label="They reach a specified warnings limit:" />
          <input disabled={!warningsLimitEnabled} min={1} max={99} type="number" id="nWarnings" name="NumberOfWarnings" required value={warningsLimit} onChange={(e) => setWarningsLimit(parseInt(e.target.value))} className={styles.AddPriv_textBox}/>
        </div>
        <Button variant="contained" onClick={ApplyChanges} style={{background: '#333333', color: '#808080', width: '13rem', alignSelf: 'center', fontSize: '0.8rem', marginTop: '0.4rem'}}>Apply settings</Button>
      </div>
      <Snackbar open={openAlert} autoHideDuration={3000} onClose={() => setOpenAlert(false)} anchorOrigin={{vertical:'bottom', horizontal:  'right'}}>
        <Alert onClose={() => setOpenAlert(false)} severity={alertErr ? "error" : "success"} sx={{ width: '100%' }}>
          {alertMsg}
        </Alert>
      </Snackbar>
      <AdminActionModal RefreshMethod={FetchBannedUsers} windowType={3} openModal={openModal} setOpenModal={setOpenModal} reportId={-1} userId={userId} username={username}/>
    </div>
  );
  }

export default BannedUsersW;
