import { Avatar, IconButton, Tooltip } from '@mui/material';
import React, { FC } from 'react';
import styles from './CommentElement.module.scss';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';

interface CommentElementProps {
  comment;
  ReportComment;
  isAuthorized;
}

const CommentElement: FC<CommentElementProps> = (props) => (
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

      {props.isAuthorized ?
      <Tooltip title="Report comment">
        <IconButton aria-label="report" style={{
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
  </div>
);

export default CommentElement;
