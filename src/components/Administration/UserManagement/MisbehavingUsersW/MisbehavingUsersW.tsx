import { Alert, Button, Snackbar } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { FC, useEffect, useState } from 'react';
import AdminActionModal from '../../AdminActionModal/AdminActionModal';
import styles from './MisbehavingUsersW.module.scss';

interface MisbehavingUsersWProps {}

const MisbehavingUsersW: FC<MisbehavingUsersWProps> = () => {

  const token = localStorage.getItem('token');
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("Test message.");
  const [alertErr, setAlertErr] = useState(false);
  const [selectedUser, setSelectedUser] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [userId, setUserId] = useState(-1);
  const [username, setUsername] = useState("#USERNAME#");
  const [windowType, setWindowType] = useState(0);
  const [rows, setRows] = useState([]);


  function SelectUser(userId, username){
    setSelectedUser(userId);
    setAlertMsg(`Selected ${username} with ID ${userId}`);
    setUserId(userId);
    setUsername(username);
    setAlertErr(false);
    setOpenAlert(true);
  }

  function ExecuteAction(actionNumber: number){
    if(userId === -1){
      setAlertMsg(`Please select user using the select button in the table.`);
      setAlertErr(true);
      setOpenAlert(true);
      return;
    }
    setWindowType(actionNumber);
    setOpenModal(true);
  }
  

  function fetchUsers(){
    const requestOptions = {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json', 
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    };
    fetch(`${process.env.REACT_APP_API}/AdministrationManagment/LoadAllUsers`, requestOptions)
      .then(response => {
        if(response.ok) {
          return response.json();
        } else {
          console.warn("Error while processing the request!");
        }
      })
      .then(data => {
        var userList = [];
        data.allUsers.$values.map(user => {
          userList.push({ id: user.userId, username: user.username, fakeReports: user.fakeReports, reports: user.reports, warnings: user.warnings });;;;
        });
        setRows(userList);
      })
      .catch(error => {
        console.warn("Error while processing the request!"); 
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
            onClick={() => SelectUser(params.row.id, params.row.username)}
            style={{ marginLeft: 0, background: "#2d5591", color: "#d9d9d9", fontSize: '0.7rem' }}
          >
            Select
          </Button>
        </strong>
      ), 
    }
  ];
  
  // const rows = [
  //   { id: 0, username: 'user1', fakeReports: 12, reports: 24, warnings: 1 },
  //   { id: 1, username: 'user2', fakeReports: 3, reports: 4, warnings: 0 },
  //   { id: 2, username: 'user3', fakeReports: 0, reports: 2, warnings: 0 },
  // ];
  useEffect(() => {
    fetchUsers();
  }, [])
  
  
  return(
    <div className={styles.MisbehavingUsersW}>
      <div style={{ height: 270, width: 500 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={3}
          rowsPerPageOptions={[3]}
        />
      </div>
      <div className={styles.AddPriv}>
        <div className={styles.AddPriv_title}>Available actions:</div>
        <Button variant="contained" onClick={() => ExecuteAction(2)} style={{background: '#333333', color: '#808080', width: '16rem', marginBottom: '0.7rem'}}>Clear user statistics</Button>
        <Button variant="contained" onClick={() => ExecuteAction(0)} style={{background: '#333333', color: '#808080', width: '16rem', marginBottom: '0.7rem'}}>Issue a warning to the user</Button>
        <Button variant="contained" onClick={() => ExecuteAction(1)} style={{background: '#333333', color: '#808080', width: '16rem'}}>Issue a ban to the user</Button>
      </div>
      
      <Snackbar open={openAlert} autoHideDuration={2000} onClose={() => setOpenAlert(false)} anchorOrigin={{vertical:'bottom', horizontal:  'right'}}>
        <Alert onClose={() => setOpenAlert(false)} severity={alertErr ? "error" : "success"} sx={{ width: '100%' }}>
          {alertMsg}
        </Alert>
      </Snackbar>

      <AdminActionModal RefreshMethod={fetchUsers} windowType={windowType} openModal={openModal} setOpenModal={setOpenModal} reportId={-1} userId={userId} username={username}/>
    </div>
  );
}
export default MisbehavingUsersW;
