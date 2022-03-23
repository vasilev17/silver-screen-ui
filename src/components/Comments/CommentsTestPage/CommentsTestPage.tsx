import { Alert, Snackbar } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import CommentLoader from '../CommentLoader/CommentLoader';
import CommentWriteElement from '../CommentWriteElement/CommentWriteElement';
import styles from './CommentsTestPage.module.scss';

interface CommentsTestPageProps {}

const CommentsTestPage: FC<CommentsTestPageProps> = () => {
  
  useEffect(() => {
    var navbar = document.getElementById('mainNavbar');
    navbar.hidden = true;  
  },[])
  
  return (
    <>
      {/* <div className={styles.CommentsTestPage}> */}
      <div>
        <CommentWriteElement movieId={1}/>
        <br/>
        <CommentLoader movieId={1}/>
      </div>
    </>
  );
}

export default CommentsTestPage;
