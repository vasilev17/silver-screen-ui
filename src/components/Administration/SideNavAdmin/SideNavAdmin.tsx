import { Avatar, Backdrop, Button, CircularProgress } from '@mui/material';
import React, { FC } from 'react';
import styles from './SideNavAdmin.module.scss';
import MovieCreationOutlinedIcon from '@mui/icons-material/MovieCreationOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import { useNavigate } from 'react-router';

interface SideNavAdminProps {
  userAccount,
  currentNav,
  setCurrentNav
}

const SideNavAdmin: FC<SideNavAdminProps> = (userData) => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleToggle = () => {
    setOpen(!open);
  };

  function NavigateToMovieManagement(){
    if(userData.currentNav !== 1){
      userData.setCurrentNav(1);

    }
  }

  function NavigateToCommentManagement(){
    if(userData.currentNav !== 2){
      userData.setCurrentNav(2);
    }
  }

  function NavigateToUserManagement(){
    if(userData.currentNav !== 3){
      userData.setCurrentNav(3);
    }
  }

  
  function ReturnToApp(){
    handleToggle();
    document.body.style.backgroundColor = "#181919";
    navigate('/');
    window.location.reload();
  }

  function LogOut(){
    handleToggle();
    document.body.style.backgroundColor = "#181919";
    localStorage.removeItem("token");
    navigate('/');
    window.location.reload();
  }

  return (
    <div className={styles.SideNavAdmin}>
      
      {/* Up */}
      <div>
        <div onClick={NavigateToMovieManagement} className={userData.currentNav === 1 ? styles.ButtonElementSelected : styles.ButtonElement}>
          <MovieCreationOutlinedIcon style={{width: '2rem', height: '2rem', color: '#808080'}}/>
          <div className={styles.ButtonElement_Text} style={{marginRight: '3.5rem'}}>Movie management</div>
        </div>
        <div onClick={NavigateToCommentManagement} className={userData.currentNav === 2 ? styles.ButtonElementSelected : styles.ButtonElement}>
          <ForumOutlinedIcon style={{width: '2rem', height: '2rem', color: '#808080'}}/>
          <div className={styles.ButtonElement_Text} style={{marginRight: '2.7rem'}}>Comment management</div>
        </div>
        <div onClick={NavigateToUserManagement} className={userData.currentNav === 3 ? styles.ButtonElementSelected : styles.ButtonElement}>
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
          <Button variant="contained" size="small" onClick={LogOut} style={{background: '#333333', color: '#808080', width: '8rem'}}>
            Log out
          </Button>
          <Button variant="contained" size="small" onClick={ReturnToApp} style={{background: '#333333', color: '#808080', width: '8rem'}}>
            Return to app
          </Button>
        </div>
      </div>


      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default SideNavAdmin;
