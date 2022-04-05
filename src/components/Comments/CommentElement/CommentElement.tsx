import { Avatar, Backdrop, Box, Button, Fade, IconButton, Modal, Tooltip, Typography } from '@mui/material';
import React, { FC } from 'react';
import styles from './CommentElement.module.scss';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';

interface CommentElementProps {
  comment,
  ReportComment,
  isAuthorized,
  alreadyReported:number[],
}

const ReportModalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 510,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: '0.5rem'
};

const CommentElement: FC<CommentElementProps> = (props) => {
  const [openReportWindow, setOpenReportWindow] = React.useState(false);
  const [reportedFromUI, setReportedFromUI] = React.useState(false);
  const handleOpenReportWindow = () => setOpenReportWindow(true);
  const handleCloseReportWindow = () => setOpenReportWindow(false);


  return (
    <div className={styles.CommentElement}>
      <div className={styles.ProfileBox}>
        {/* <Skeleton variant="circular" width={"5rem"} height={"5rem"} style={{margin: 'auto'}} />
        <Skeleton variant="text" /> */}
        {props.comment.isFriendsOnly ? 
        <Tooltip title="This comment is posted by your friend">
          <PersonOutlineOutlinedIcon style={{
            position: 'absolute',
            fontSize: '2.5rem',
            marginTop: '-1.7rem',
            marginLeft: '-1.7rem',
            color: '#808080'
          }}/>
        </Tooltip> : null}
        {props.isAuthorized && !reportedFromUI && props.alreadyReported.find(x => x === props.comment.id) === undefined ?
        <Tooltip title="Report comment">
          <IconButton aria-label="report" 
          onClick={handleOpenReportWindow}
          style={{
            position: 'absolute',
            marginTop: '-1.7rem',
            width: '2.5rem',
            height: '2.5rem',
            marginLeft: '6.7rem'
          }}>
            <FlagOutlinedIcon style={{
              fontSize: '2.5rem',
              color: '#808080'
            }}/>
          </IconButton>
        </Tooltip> : null}
        <Avatar alt={props.comment.user.username} src={props.comment.user.avatar} style={{margin: 'auto'}} sx={{ width: "4.5rem", height: "4.5rem" }} />
        <div className={styles.UsernameText}>{props.comment.user.username.substring(0, 9)}{props.comment.user.username.length > 10 ? "..." : ""}</div>
      </div>
      <div className={styles.CommentContetns}>
        {props.comment.content}
      </div>
      
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openReportWindow}
        onClose={handleCloseReportWindow}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openReportWindow}>
          <Box sx={ReportModalStyle} style={{textAlign: 'center'}}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Are you sure you want to report this comment?
            </Typography>
            <div style={{
              display: 'flex',
              justifyContent: 'space-around',
              margin: '1rem 0 1rem 0'
            }}>
              <Button variant="outlined" style={{width: '30%'}} color="error" onClick={handleCloseReportWindow}>No</Button>
              <Button variant="outlined" style={{width: '30%'}} color="success" onClick={() => {
                props.ReportComment(props.comment.id);
                handleCloseReportWindow();
                setReportedFromUI(true);
              }}>Yes</Button>
            </div>
            <Typography id="transition-modal-description">
              <i style={{color: '#f15b5b'}}>Warning: Reporting without any reason may get your account banned.</i>
            </Typography>
          </Box>
        </Fade>
      </Modal>
          
    </div>
  );
}
export default CommentElement;
