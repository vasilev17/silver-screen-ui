import { Avatar, Backdrop, Button, Fade, IconButton, Modal, Tooltip, Typography } from '@mui/material';
import React, { FC } from 'react';
import styles from './NotificationElement.module.scss';
import CloseIcon from '@mui/icons-material/Close';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useNavigate } from 'react-router';

/* eslint-disable jsx-a11y/anchor-is-valid */

interface NotificationElementProps {
  id:number,
  author:{
    avatar:string,
    id:number,
    username:string
  }
  type:string,
  content:string,
  movie?:{
    id:number,
    title:string,
  },
  setNotificationsData,
  notificationsData,
  active:boolean,  
  setButtonState
}

const NotificationElement: FC<NotificationElementProps> = (notificationInfo) => {  
  const [openModal, setOpenModal] = React.useState(false);
  const navigate = useNavigate();
  const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => setOpenModal(false);
  //const navigate = useNavigate();
  
  function DestroyNotificaton()  {
    var notfArr = notificationInfo.notificationsData;
    notfArr = notfArr.filter(x => x.id !== notificationInfo.id);
    notificationInfo.setNotificationsData(notfArr);

    var token = localStorage.getItem('token');
    
    const requestOptions = {
      method: 'DELETE',
      headers: { 
        'Content-Type': 'application/json', 
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        notificationId: notificationInfo.id        
      })
    };
    fetch(`${process.env.REACT_APP_API}/NotificationManagement/DeleteNotification`, requestOptions)
      .then(response => {
        if(response.ok) {
          return response.json();
        } else {
          console.warn("Error while processing the request!");
        }
      })
      .catch(error => {
        console.warn("Error while processing the request!"); 
      });
  }

  function AcceptFriendRequest() {
    var notfArr = notificationInfo.notificationsData;
    notfArr = notfArr.filter(x => x.id !== notificationInfo.id);
    notificationInfo.setNotificationsData(notfArr);

    var token = localStorage.getItem('token');
    
    const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json', 
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        notificationId: notificationInfo.id        
      })
    };
    fetch(`${process.env.REACT_APP_API}/NotificationManagement/RespondToFriendRequest`, requestOptions)
      .then(response => {
        if(response.ok) {
          return response.json();
        } else {
          console.warn("Error while processing the request!");
        }
      })
      .catch(error => {
        console.warn("Error while processing the request!"); 
      });
  }

  function HandleModalFriendButton(accepted:boolean){
    handleModalClose();
    setTimeout(() => {
      if(accepted) {
        AcceptFriendRequest();
      } 
      else {
        DestroyNotificaton();
      }
    }, 400); 
  }

  function HandleModalMoviePage(){
    handleModalClose();
    notificationInfo.setButtonState((prev) => !prev);
    navigate(`/movie/${notificationInfo.movie.id}`);
  }

  function DisplayButtonsForModal(){
    if(notificationInfo.type === 'TextOnly' && notificationInfo.movie === null){
      return (
        <></>
      );
    } 
    else if(notificationInfo.type === 'TextOnly')
    {  
      return (
        <>
          <Button variant="contained" onClick={HandleModalMoviePage} style={{background: '#6a6197', color: 'white', marginBottom: '10px', width: '150px'}}>Go to movie</Button>
        </>
      );
    }
    else if(notificationInfo.type === 'FriendRequest'){
      return (
        <>
          <Button variant="contained" onClick={() => HandleModalFriendButton(true)} style={{background: '#4b724a', color: 'white', marginBottom: '10px', width: '150px'}}>Accept invite</Button>
          <Button variant="contained" onClick={() => HandleModalFriendButton(false)} style={{background: '#834a4a', color: 'white', marginBottom: '10px', width: '150px'}}>Decline invite</Button>         
        </>
      );
    }
  }

  function DisplayAdditionalTextForModal(){
    if(notificationInfo.type === 'TextOnly' && notificationInfo.movie === null){
      return (
        <></>
      );
    } 
    else if(notificationInfo.type === 'TextOnly')
    {  
      return (
        <>
          <p style={{marginBottom: '-5px', marginTop: '5px', fontWeight: '600'}}>recommended you <i><b style={{color: "#ff9562"}}>{notificationInfo.movie.title}</b></i>:</p>
        </>
      );
    }
    else if(notificationInfo.type === 'FriendRequest'){
      return (
        <>
          <p style={{marginBottom: '-5px', marginTop: '5px', fontWeight: '600'}}>wants to add you as a friend:</p>
        </>
      );
    }
  }
  
  function DisplayNotification(){
    if(notificationInfo.type === 'TextOnly' && notificationInfo.movie === null){
      return (
        <>
          <div className={styles.NotificationBox}>
            <Avatar alt={notificationInfo.author.username} src={notificationInfo.author.avatar}/>
            <Tooltip title="Expand notification">
              <a onClick={() => handleModalOpen()} className={styles.NotificationBox_textExpand}>{notificationInfo.content}</a>
            </Tooltip>
            <Tooltip title="Delete notification">
              <IconButton onClick={() => DestroyNotificaton()} aria-label="close" size="small" sx={{color:"#c9c9c98c", marginTop: "2%"}} className={styles.NotificationBox_closeButton}>
                <CloseIcon />
              </IconButton>
            </Tooltip>
          </div>
        </>
      );
    } 
    else if(notificationInfo.type === 'TextOnly')
    {  
      var username1 = notificationInfo.author.username;
      var title = notificationInfo.movie.title;
      if(username1.length>20)
      {
        username1 = username1.substring(0, 20) + "...";
      }
      if(title.length>20)
      {
        title = title.substring(0, 20) + "...";
      }
      return (
        <>
          <div className={styles.NotificationBox}>
            <Avatar alt={notificationInfo.author.username} src={notificationInfo.author.avatar}/>
            <Tooltip title="Expand notification">
              <a onClick={() => handleModalOpen()}  className={styles.NotificationBox_textExpand}><b style={{color: "#d37dff"}}>{username1}</b> recommended you <i><b style={{color: "#ff9562"}}>{title}</b></i>.</a>
            </Tooltip>
            <Tooltip title="Delete notification">
              <IconButton onClick={() => DestroyNotificaton()} aria-label="close" size="small" sx={{color:"#c9c9c98c", marginTop: "2%"}} className={styles.NotificationBox_closeButton}>
                <CloseIcon />
              </IconButton>
            </Tooltip>
          </div>
        </>
      );
    }
    else if(notificationInfo.type === 'FriendRequest'){
      var username2 = notificationInfo.author.username;
      if(username2.length>17)
      {
        username2 = username2.substring(0, 17) + "...";
      }
      return (
        <>
          <div className={styles.NotificationBox}>
            <Avatar alt={notificationInfo.author.username} src={notificationInfo.author.avatar}/>
            <Tooltip title="Expand notification">
              <a onClick={() => handleModalOpen()} className={styles.NotificationBox_textExpand}><b style={{color: "#d37dff"}}>{username2}</b> wants to become your friend!</a>
            </Tooltip>
            <Tooltip title="Accept">
              <IconButton onClick={() => AcceptFriendRequest()} aria-label="close" size="small" color="success" sx={{ marginTop: "2%"}} className={styles.NotificationBox_closeButton}>
                <CheckCircleOutlineIcon style={{fontSize: "26px"}} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Decline">
              <IconButton onClick={() => DestroyNotificaton()} aria-label="close" size="small" color="error" sx={{ marginTop: "2%"}} className={styles.NotificationBox_closeButton}>
                <DoDisturbIcon />
              </IconButton>
            </Tooltip>
          </div>
        </>
      );
    }
  }

  return(
    <div>
      <Modal
        open={openModal}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <div className={styles.ModalBox}>
            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{textAlign: 'center'}} style={{backgroundColor: '#0000003d'}}>
              <div style={{padding: '1%'}}>Notification contents</div>
              <div style={{borderBottom: 'solid 2px #c9c9c98c'}}/>
            </Typography>
            <div className={styles.ModalBox_contents}>
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <div style={{display: 'relative'}}>
                  <div className={styles.ModalBox_contents_author}>
                    <Avatar sx={{marginRight: '5px'}} alt={notificationInfo.author.username} src={notificationInfo.author.avatar}/>
                    <div style={{placeSelf: 'center'}}>{notificationInfo.author.username}</div>
                  </div>
                  {DisplayAdditionalTextForModal()}
                  <div className={styles.ModalBox_contents_text}><i>„{notificationInfo.content}“</i></div>
                </div>
                <div style={{display: 'flex', flexFlow: 'column-reverse'}}>
                <div style={{marginLeft: '46px'}}>
                    {DisplayButtonsForModal()}
                    <Button variant="contained" onClick={handleModalClose} style={{background: '#4e4e4e', color: 'white', width: '150px'}}>Close</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
      {DisplayNotification()}
      <div style={{borderBottom: 'solid 1.5px #c9c9c98c'}}/>
    </div>
  );
};
export default NotificationElement;
