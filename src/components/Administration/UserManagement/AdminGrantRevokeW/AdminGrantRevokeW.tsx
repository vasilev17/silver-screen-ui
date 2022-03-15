import React, { FC } from 'react';
import styles from './AdminGrantRevokeW.module.scss';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';


interface AdminGrantRevokeWProps {}

const AdminGrantRevokeW: FC<AdminGrantRevokeWProps> = () => {

  function RevokeAdmin(targetID:number){
    alert(`Revoke admin to ${targetID}`);
  }

  function BanUser(targetID:number){
    alert(`Ban user ${targetID}`);    
  }

  function GrantAdmin(){
    alert(`Grant admin privileges to ${(document.getElementById('aUsername') as HTMLInputElement).value}`)
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
            onClick={() => RevokeAdmin(params.row.id)}
            style={{ marginLeft: 0, background: "#833a3a", color: "#d9d9d9", fontSize: '0.7rem' }}
          >
            Revoke admin privileges
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => BanUser(params.row.id)}
            style={{ marginLeft: 14, background: "#833a3a", color: "#d9d9d9", fontSize: '0.7rem' }}
          >
            Ban user
          </Button>
        </strong>
      ), 
    }
  ];
  
  const rows = [
    { id: 0, username: 'admin' },
    { id: 1, username: 'admin2' },
    { id: 2, username: 'admin3' },
    { id: 3, username: 'admin4' },
    { id: 4, username: 'admin5' },
  ];


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
    </div>
  );
}

export default AdminGrantRevokeW;
