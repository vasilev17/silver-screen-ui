import { IconButton, Tooltip } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import styles from './AdminDashboardButton.module.scss';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router';

interface AdminDashboardButtonProps {}

const AdminDashboardButton: FC<AdminDashboardButtonProps> = () => {
  const [isAdmin, setIsAdmin] = useState(false)
  const navigate = useNavigate();
  
  function CheckAdminStatus(){
    const requestOptions = {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json', 
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    };
    fetch(`${process.env.REACT_APP_API}/AdministrationManagment/UserAuthentication`, requestOptions)
      .then(response => {
        if(response.ok) {
          setIsAdmin(true);
          return response.json();
        }
      }).catch(error => {});
  }

  useEffect(() => {
    CheckAdminStatus();
  }, [])
  
  return (
    <div className={styles.AdminDashboardButton}>
      {isAdmin ? 
        <Tooltip title="Open admin dashboard">
          <IconButton onClick={() => navigate('/administration')} aria-label="delete">
            <SettingsIcon />
          </IconButton>
        </Tooltip>
      : null}
    </div>
  );
}

export default AdminDashboardButton;
