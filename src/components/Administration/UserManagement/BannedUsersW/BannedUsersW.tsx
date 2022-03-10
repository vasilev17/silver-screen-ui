import { Button, Checkbox, FormControlLabel, Slider, Tooltip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { FC } from 'react';
import styles from './BannedUsersW.module.scss';

interface BannedUsersWProps {}

const BannedUsersW: FC<BannedUsersWProps> = () => {

  function ValueLabelComponent(props) {
    const { children, value } = props;
  
    return (
      <Tooltip enterTouchDelay={0} placement="top" title={value + "%"}>
        {children}
      </Tooltip>
    );
  }
  
  function UnbanUser(userID){
    alert('Unban user: ' + userID);
  }

  function ApplyChanges(){
    alert('Apply changes');
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
            onClick={() => UnbanUser(params.row.id)}
            style={{ marginLeft: 0, background: "#915f2d", color: "#d9d9d9", fontSize: '0.7rem' }}
          >
            Unban
          </Button>
        </strong>
      ), 
    }
  ];
  
  const rows = [
    { id: 0, username: 'user1', fakeReports: 412, reports: 0, warnings: 4 },
    { id: 1, username: 'user2', fakeReports: 100, reports: 3, warnings: 4 },
    { id: 2, username: 'user3', fakeReports: 52, reports: 1, warnings: 4 },
  ];

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
        <FormControlLabel control={<Checkbox style={{color:'#666666'}} />} style={{color:'#666666'}} label="They reach a specified fake reports limit:" />
        <div style={{display: 'inline-flex'}}>
          <div className={styles.AddPriv_leftLabel}>0%</div>
          <Slider
            disabled
            valueLabelDisplay="auto"
            components={{
              ValueLabel: ValueLabelComponent,
            }}
            style={{color:'#666666'}}
            defaultValue={80}
          />  
          <div className={styles.AddPriv_rightLabel}>100%</div>
        </div>
        <div style={{display: 'inline-flex'}}>
          <FormControlLabel control={<Checkbox style={{color:'#666666'}} />} style={{color:'#666666'}} label="They reach a specified warnings limit:" />
          <input disabled min={1} max={99} type="number" id="nWarnings" name="NumberOfWarnings" required className={styles.AddPriv_textBox} value={4} />
        </div>
        <Button variant="contained" onClick={ApplyChanges} style={{background: '#333333', color: '#808080', width: '13rem', alignSelf: 'center', fontSize: '0.8rem', marginTop: '0.4rem'}}>Apply settings</Button>
      </div>
    </div>
  );
  }

export default BannedUsersW;
