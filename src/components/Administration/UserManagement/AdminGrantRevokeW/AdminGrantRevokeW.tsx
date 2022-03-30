import React, { FC, useEffect, useState } from 'react';
import styles from './AdminGrantRevokeW.module.scss';
import { DataGrid } from '@mui/x-data-grid';
import { Alert, Button, Snackbar } from '@mui/material';


interface AdminGrantRevokeWProps {}

const AdminGrantRevokeW: FC<AdminGrantRevokeWProps> = () => {

  const [rows, setRows] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("Test message.");
  const [alertErr, setAlertErr] = useState(false);
  const token = localStorage.getItem('token');

  function FetchAdministrators() {
    const requestOptions = {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json', 
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    };
    fetch(`${process.env.REACT_APP_API}/AdministrationManagment/ListAdministrators`, requestOptions)
      .then(response => {
        if(response.ok) {
          return response.json();
        } else {
          console.warn("Error while processing the request!");
        }
      })
      .then(data => {
        var adminsList = [];
        data.adminList.$values.map(user => {
          adminsList.push({ id: user.id, username: user.username });
        });
        setRows(adminsList);
      })
      .catch(error => {
        console.warn("Error while processing the request!"); 
      });
  }

  function RevokeAdmin(targetUsername:string){
    const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json', 
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    };
    fetch(`${process.env.REACT_APP_API}/AdministrationManagment/RevokeAdminToUser?username=${targetUsername}`, requestOptions)
      .then(response => {
        if(response.ok) {
          return response.json();
        } else {
          setAlertMsg(`Error while revoking "${targetUsername}" admin privileges. Maybe he is not an admin?`);
          setAlertErr(true);
          setOpenAlert(true);
        }
      })
      .then(data => {
        setAlertMsg(data.message);
        setAlertErr(false);
        setOpenAlert(true);
        FetchAdministrators();
      })
      .catch(error => {
        setAlertMsg(`Error while revoking "${targetUsername}" admin privileges. Maybe he is not an admin?`);
        setAlertErr(true);
        setOpenAlert(true);
      });
  }

  function BanUser(targetUsername:string){
    // alert(`Ban user ${targetUsername}`);    
    setAlertMsg("Ban functionality is disabled!");
    setAlertErr(true);
    setOpenAlert(true);
  }

  function GrantAdmin(){
    const targetUsername = (document.getElementById('aUsername') as HTMLInputElement).value;
    const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json', 
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    };
    fetch(`${process.env.REACT_APP_API}/AdministrationManagment/GrantAdminToUser?username=${targetUsername}`, requestOptions)
      .then(response => {
        if(response.ok) {
          return response.json();
        } else {
          setAlertMsg(`Error while granting "${targetUsername}" admin privileges. Maybe he already has admin rights?`);
          setAlertErr(true);
          setOpenAlert(true);
        }
      })
      .then(data => {
        setAlertMsg(data.message);
        setAlertErr(false);
        setOpenAlert(true);
        FetchAdministrators();
      })
      .catch(error => {
        setAlertMsg(`Error while granting "${targetUsername}" admin privileges. Maybe he already has admin rights?`);
        setAlertErr(true);
        setOpenAlert(true);
      });
  }

  const columns = [
    { field: 'username', headerName: 'Username', width: 200 },
    { field: 'actions', headerName: 'Actions', width: 280, sortable: false,
      renderCell: (params) => (
        <strong>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => RevokeAdmin(params.row.username)}
            style={{ marginLeft: 0, background: "#833a3a", color: "#d9d9d9", fontSize: '0.7rem' }}
          >
            Revoke admin privileges
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => BanUser(params.row.username)}
            style={{ marginLeft: 14, background: "#833a3a", color: "#d9d9d9", fontSize: '0.7rem' }}
          >
            Ban user
          </Button>
        </strong>
      ), 
    }
  ];

  useEffect(() => {
    FetchAdministrators();
  },[])
  


  return (
    <div className={styles.AdminGrantRevokeW}>
      <div style={{ height: 270, width: 500 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={3}
          rowsPerPageOptions={[3]}
        />
      </div>
      <div className={styles.AddPriv}>
        <div className={styles.AddPriv_title}>Add admin privileges to user:</div>
        <div className={styles.AddPriv_textBoxLabel}>Username:</div>
        <div style={{display: 'inline-flex'}}>
          <input type="text" id="aUsername" name="Username" required className={styles.AddPriv_textBox} />
          <Button variant="contained" onClick={GrantAdmin} style={{background: '#333333', color: '#808080', marginLeft: '1rem', fontSize: '0.8rem'}}>Add</Button>
        </div>
      </div>
      <Snackbar open={openAlert} autoHideDuration={3000} onClose={() => setOpenAlert(false)} anchorOrigin={{vertical:'bottom', horizontal:  'right'}}>
        <Alert onClose={() => setOpenAlert(false)} severity={alertErr ? "error" : "success"} sx={{ width: '100%' }}>
          {alertMsg}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default AdminGrantRevokeW;
