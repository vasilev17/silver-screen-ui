import { Avatar } from '@mui/material';
import React, { FC } from 'react';
import styles from './CommentElement.module.scss';

interface CommentElementProps {
  comment;
  ReportComment;
}

const CommentElement: FC<CommentElementProps> = (props) => (
  <div className={styles.CommentElement}>
    <div style={{padding: '2rem', 
                 width: '40rem',
                 maxWidth: '40rem',
                 borderRight: 'solid 0.2rem #4d4d4d', 
                 height: '-webkit-fill-available',
                 overflow: 'hidden'}}>
      
      {/* <Skeleton variant="circular" width={"5rem"} height={"5rem"} style={{margin: 'auto'}} />
      <Skeleton variant="text" /> */}
      <Avatar alt={props.comment.user.username} src={props.comment.user.avatar} style={{margin: 'auto'}} sx={{ width: "4.5rem", height: "4.5rem" }} />
      <div className={styles.UsernameText}>{props.comment.user.username.substring(0, 9)}{props.comment.user.username.length > 10 ? "..." : ""}</div>
    </div>
    <div className={styles.CommentContetns}>
      {props.comment.content}
    </div>
  </div>
);

export default CommentElement;
