import { Avatar, Button } from '@mui/material';
import React, { FC } from 'react';
import styles from './SideNavAdmin.module.scss';
import MovieCreationOutlinedIcon from '@mui/icons-material/MovieCreationOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';

interface SideNavAdminProps {
  userAccount
}

const SideNavAdmin: FC<SideNavAdminProps> = (userData) => {
  return (
    <div className={styles.SideNavAdmin}>
      
      {/* Up */}
      <div>
        <div className={styles.ButtonElement}>
          <MovieCreationOutlinedIcon style={{width: '2rem', height: '2rem', color: '#808080'}}/>
          <div className={styles.ButtonElement_Text} style={{marginRight: '3.5rem'}}>Movie management</div>
        </div>
        <div className={styles.ButtonElement}>
          <ForumOutlinedIcon style={{width: '2rem', height: '2rem', color: '#808080'}}/>
          <div className={styles.ButtonElement_Text} style={{marginRight: '2.7rem'}}>Comment management</div>
        </div>
        <div className={styles.ButtonElement}>
          <ManageAccountsOutlinedIcon style={{width: '2rem', height: '2rem', color: '#808080'}}/>
          <div className={styles.ButtonElement_Text} style={{marginRight: '3.9rem'}}>User management</div>
        </div>
      </div>
      
      {/* Down */}
      <div className={styles.DownUI}>
        <div className={styles.DownUI_LoggedInText}>Logged in as:</div>
        <div style={{ display: 'inline-flex' }}>
          <Avatar alt='userAvatar' src={userData.userAccount.avatar} style={{marginRight: '1rem'}}/>
          <div>
            <div className={styles.DownUI_Username}>{userData.userAccount.username}</div>
            <div className={styles.DownUI_AccountType}>Administrator account</div>
          </div>
        </div>
        <div className={styles.DownUI_ButtonGroup}>
          <Button variant="contained" size="small" style={{background: '#333333', color: '#808080', width: '8rem'}}>
            Log out
          </Button>
          <Button variant="contained" size="small" style={{background: '#333333', color: '#808080', width: '8rem'}}>
            Return to app
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SideNavAdmin;
