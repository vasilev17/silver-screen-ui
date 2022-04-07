import { Backdrop, Box, Button, Fade, Modal, styled, TextField, Typography } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import styles from './AdminActionModal.module.scss';
import HistoryIcon from '@mui/icons-material/History';
import HistoryElement from './HistoryElement/HistoryElement';

interface AdminActionModalProps {
  // With reason textbox:     [0 - Warning, 1 - Ban]
  // Without reason textbox:  [2 - Clear user stats, 3 - Unban]
  windowType: number,

  openModal,
  setOpenModal,

  userId: number,
  username: string,

  RefreshMethod?,
  reportId?: number,
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: '0.5rem'
};

const BlackTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#c9c9c9c4',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#c9c9c9c4',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#c9c9c98c',
    },
    '&:hover fieldset': {
      borderColor: '#c9c9c9',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#c9c9c9c4',
    },
  },
});

const AdminActionModal: FC<AdminActionModalProps> = (props) => {
  const handleOpenModal = () => props.setOpenModal(true);
  const handleCloseModal = () => props.setOpenModal(false);

  const [reasonText, setReasonText] = React.useState('');
  const [actionButton, setActionButton] = useState("#ACTION#");
  const [actionTitle, setActionTitle] = useState("#ACTION_T#");
  const [titleText, setTitleText] = useState(`Are you sure you want to #ACTION# user ${props.username}?`);
  const [showReasonTextBox, setShowReasonTextBox] = useState(true);
  const [isInMainWindow, setIsInMainWindow] = useState(true);
  const [userPRHisory, setUserPRHistory] = useState([<></>]);


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(event.target.value.length > 300)
    {
      setReasonText(event.target.value.substring(0, 300));
    }
    else
    {
      setReasonText(event.target.value);
    }
  };

  function ExecuteAction(){
    switch(props.windowType){
      case 0:
        IssueWarningOrBan(false);
        break;

      case 1:
        IssueWarningOrBan(true);
        break;

      case 2:
        ClearStats();
        break;

      case 3:
        UnbanUser();
        break;
    }
  }

  function IssueWarningOrBan(isItBan: boolean){
    const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json', 
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
      },
    };
    fetch(`${process.env.REACT_APP_API}/AdministrationManagment/PenalizeUser?targetId=${props.userId}&reason=${reasonText}&isItBan=${isItBan}&reportId=${props.reportId !== null ? props.reportId : -1}`, requestOptions)
    .then(() => {
      if(props.RefreshMethod != null) props.RefreshMethod();
      handleCloseModal();
    });
  }

  function UnbanUser(){
    const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json', 
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
      },
    };
    fetch(`${process.env.REACT_APP_API}/AdministrationManagment/FullUnbanUser?targetId=${props.userId}`, requestOptions)
    .then(() => {
      if(props.RefreshMethod != null) props.RefreshMethod();
      handleCloseModal();
    });
  }

  function ClearStats(){
    const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json', 
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
      },
    };
    fetch(`${process.env.REACT_APP_API}/AdministrationManagment/ClearStatsForUser?targetId=${props.userId}`, requestOptions)
    .then(() => {
      if(props.RefreshMethod != null) props.RefreshMethod();
      handleCloseModal();
    });
  }

  function DownloadUserHistory(){
    const requestOptions = {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json', 
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
      },
    };
    fetch(`${process.env.REACT_APP_API}/AdministrationManagment/LoadHistoryForUser?targetId=${props.userId}`, requestOptions)
      .then(response => {
        if(response.ok) {
          return response.json();
        }
      })
      .then(data => {
        var userDataArr = [];
        data.userHistory.$values.map((user, index) => {
          userDataArr.push(
            <div key={index}>
              <HistoryElement severity={user.severity} banDate={user.banDate} content={user.content}/>
            </div>
          );
        });
        setUserPRHistory(userDataArr);
      })
      .catch(error => {});
  }

  function ChangeWindows(isInHistory: boolean){
    if(isInHistory)
    {
      setTitleText(`${props.username}'s history:`);
      setIsInMainWindow(false);
      DownloadUserHistory();
    }
    else{
      setTitleText(`Are you sure you want to ${actionTitle} user ${props.username}?`);
      setIsInMainWindow(true);
    } 
  }

  function onConstruct(){
    switch(props.windowType){
      case 0:
        setActionTitle("issue a warning to");
        setTitleText(`Are you sure you want to issue a warning to user ${props.username}?`);
        setActionButton("Issue warning");
        setShowReasonTextBox(true);
        break;

      case 1:
        setActionTitle("ban");
        setTitleText(`Are you sure you want to ban user ${props.username}?`);
        setActionButton("Ban");
        setShowReasonTextBox(true);
        break;

      case 2:
        setActionTitle("clear report statistics for");
        setTitleText(`Are you sure you want to clear report statistics for user ${props.username}?`);
        setActionButton("Clear");
        setShowReasonTextBox(false);
        break;

      case 3:
        setActionTitle("unban");
        setTitleText(`Are you sure you want to unban user ${props.username}?`);
        setActionButton("Unban");
        setShowReasonTextBox(false);
        break;
    }
  }

  useEffect(() => {
    onConstruct();
  }, )
  

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.openModal}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2" style={{marginBottom: '1.5rem'}}>
              {isInMainWindow ? titleText : `${props.username}'s history:`}
            </Typography>
              {isInMainWindow ?
                <div>
                  {showReasonTextBox ?   
                    <div style={{marginBottom: '0.7rem'}}>
                      <BlackTextField
                        id="outlined-multiline-static"
                        label="Reason"
                        multiline
                        fullWidth
                        onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                        rows={4}
                        value={reasonText}
                        onChange={handleChange}
                      />
                      <div style={{textAlign: 'right', color: '#8b8b8b'}}>{reasonText.length}/300</div>
                    </div>
                  : null}
                  <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Button color="error" variant="outlined" onClick={handleCloseModal}>Cancel</Button>

                    <Button variant="outlined" color="secondary" onClick={() => ChangeWindows(true)} startIcon={<HistoryIcon />}>
                      Check user's history
                    </Button>
                    <Button color="warning" variant="outlined" onClick={() => ExecuteAction()}>{actionButton}</Button>
                  </div> 
                </div>
              : 
                <div>
                  <div className={styles.HistoryBox}>
                    {userPRHisory}
                  </div>
                  <Button color="error" variant="outlined" onClick={() => ChangeWindows(false)}>Go back</Button>
                </div>
              }
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
export default AdminActionModal;
