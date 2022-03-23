import { Alert, Snackbar } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import CommentLoader from '../CommentLoader/CommentLoader';
import CommentWriteElement from '../CommentWriteElement/CommentWriteElement';
import styles from './CommentsTestPage.module.scss';

interface CommentsTestPageProps {}

const CommentsTestPage: FC<CommentsTestPageProps> = () => {

  const [openAlert, setOpenAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("Test message.");
  const [alertErr, setAlertErr] = useState(false);
  
  useEffect(() => {
    var navbar = document.getElementById('mainNavbar');
    navbar.hidden = true;  
  },[])
  
  return (
    <>
      <div className={styles.CommentsTestPage}>
        <CommentWriteElement setOpenAlert={setOpenAlert} setAlertMsg={setAlertMsg} setAlertErr={setAlertErr} movieId={1}/>
        <br/>
        <CommentLoader movieId={1}/>
      </div>
      <Snackbar open={openAlert} autoHideDuration={3000} onClose={() => setOpenAlert(false)}>
        <Alert onClose={() => setOpenAlert(false)} severity={alertErr ? "error" : "success"} sx={{ width: '100%' }}>
          {alertMsg}
        </Alert>
      </Snackbar>
    </>
  );
}

export default CommentsTestPage;
