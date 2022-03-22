import { Alert, CircularProgress, FormControlLabel, IconButton, Snackbar, Switch } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import styles from './CommentWriteElement.module.scss';
import SendIcon from '@mui/icons-material/Send';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

interface CommentWriteElementProps {
  movieId:number;
  setOpenAlert;
  setAlertMsg;
  setAlertErr;
}

const CommentWriteElement: FC<CommentWriteElementProps> = (props) => {

  const [commentTitleW, setCommentTitle] = useState("Post a comment:");
  const [contentLength, setContentLength] = useState(0);
  const [notLoggedIn, setNotLoggedIn] = useState(true);
  const [loadingComment, setLoadingComment] = useState(true);
  const [loadingMsg, setLoadingMsg] = useState("Loading comment...");
  const [commentContents, setCommentContents] = useState("");
  const [commentIsFriendOnly, setCommentIsFriendOnly] = useState(false);
  const [inEditMode, setInEditMode] = useState(false);

  function RefreshTextLenght() {  
    var textBox = document.getElementById('commentTextArea') as HTMLTextAreaElement;
    setContentLength(textBox.value.length);
    if(textBox.value.length > 500){
      textBox.value = textBox.value.substring(0, 500);
      setContentLength(500);
    };
    setCommentContents(textBox.value); 
  }

  const RestrictEnter = (e) => {
    if(e.keyCode == 13){
      e.preventDefault();
    }
  }

  function GetOwnComment(){
    const requestOptions = {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json', 
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
      },
    };
    fetch(`${process.env.REACT_APP_API}/Comments/GetOwnComment?movieId=${props.movieId}`, requestOptions)
      .then(response => {
        if(response.ok) {
          return response.json();
        } else {
          setLoadingComment(false);
        }
      })
      .then(data => {
        setLoadingComment(false);
        setNotLoggedIn(false);
        if(data.comment == null) {
          EmptyCommentD();
        }
        else
        {
          ExistingCommentD();
          setCommentContents(data.comment.content);
          setCommentIsFriendOnly(data.comment.isFriendsOnly);
          RefreshTextLenght();
          setInEditMode(true);
        }
      })
      .catch(error => {
        setLoadingComment(false);
      });
  }

  function EmptyCommentD(){
    setCommentTitle("Post a comment:");
  }
  
  function ExistingCommentD(){
    setCommentTitle("Edit your comment:");
  }

  function DisplayButtonSet(){
    if(inEditMode){
      return(
        <>
          <IconButton aria-label="EditComment" onClick={SendComment} style={{color: "#808080"}}>
            <EditOutlinedIcon />
          </IconButton>
          <IconButton aria-label="DeleteComment" onClick={DeleteComment} style={{color: "#808080"}}>
            <DeleteOutlineOutlinedIcon />
          </IconButton>
        </>
      );
    } 
    else {
      return(
        <>
          <IconButton aria-label="Send" onClick={SendComment} style={{color: "#808080"}}>
            <SendIcon />
          </IconButton>
        </>
      );
    }
  }

  function SendComment(){
    if(commentContents.length === 0){
      props.setOpenAlert(true);
      props.setAlertMsg("You can't send comment with empty contents!");;
      props.setAlertErr(true);
      return;
    }
    setLoadingComment(true);
    setLoadingMsg(inEditMode ? "Editing comment..." : "Publishing comment...");
    const requestOptions = {
      method: inEditMode ? 'PUT' : 'POST',
      headers: { 
        'Content-Type': 'application/json', 
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
      },
    };
    fetch(`${process.env.REACT_APP_API}/Comments/${inEditMode ? "UpdateComment" : "PostComment"}?movieId=${props.movieId}&message=${commentContents}&friendsOnly=${commentIsFriendOnly}`, requestOptions)
      .then(response => {
        if(response.ok) {
          ExistingCommentD();
          setInEditMode(true);
          setLoadingComment(false);
          props.setOpenAlert(true);
          props.setAlertMsg(`Your comment has been ${inEditMode ? "edited successfully!" : "published!"}`);
          props.setAlertErr(false);
        } else {
          setLoadingComment(false);
          props.setOpenAlert(true);
          props.setAlertMsg(inEditMode ? "Something went wrong while editing your comment!" : "Your comment has already been published!");
          props.setAlertErr(true);
        }
      })
      .catch(error => {
        setLoadingComment(false);
        props.setOpenAlert(true);
        props.setAlertMsg(inEditMode ? "Something went wrong while editing your comment!" : "Your comment has already been published!");
        props.setAlertErr(true);
      });
  }

  function DeleteComment(){
    setLoadingComment(true);
    setLoadingMsg("Deleting comment...");
    const requestOptions = {
      method: 'DELETE',
      headers: { 
        'Content-Type': 'application/json', 
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
      },
    };
    fetch(`${process.env.REACT_APP_API}/Comments/DeleteComment?movieId=${props.movieId}`, requestOptions)
      .then(response => {
        if(response.ok) {
          setCommentContents("");
          setCommentIsFriendOnly(false);
          EmptyCommentD();
          setInEditMode(false);
          setLoadingComment(false);
          props.setOpenAlert(true);
          props.setAlertMsg(`Your comment has been deleted successfully!`);
          props.setAlertErr(false);
          RefreshTextLenght();
        } else {
          setLoadingComment(false);
          props.setOpenAlert(true);
          props.setAlertMsg("Something went wrong while deleting your comment!");
          props.setAlertErr(true);
        }
      })
      .catch(error => {
        setLoadingComment(false);
        props.setOpenAlert(true);
        props.setAlertMsg("Something went wrong while deleting your comment!");
        props.setAlertErr(true);
      });
  }

  function RenderComment(loadingC:boolean){
    
    if(loadingC){
      return (
        <>
          <div className={styles.CommentBoxLoading}>
            <div>
              <CircularProgress style={{width: '3.2rem', height: '3.2rem', color: '#8b8b8b'}} />
            </div>
            <div className={styles.CommentBoxLoading_text}>{loadingMsg}</div>
          </div>
        </>
      )
    }

    if(notLoggedIn) {
      return (
        <>
          <div className={styles.CommentBoxLoading}>
            <div>
              <LockOutlinedIcon style={{width: '3.2rem', height: '3.2rem', color: '#8b8b8b'}} />
            </div>
            <div className={styles.CommentBoxLoading_text}>You are currently not logged in to post a comment!</div>
          </div>
        </>
      );
    }

    return (
      <>
        <div className={styles.CommentTextBox}>
          <textarea id="commentTextArea" 
            onChange={() => RefreshTextLenght()} 
            onKeyDown={(e) => RestrictEnter(e)}        
            className={styles.CommentTextBox_input}
            defaultValue={ commentContents }
            />
          <div className={styles.CommentTextBox_wordCounter}>
            <div className={styles.CommentTextBox_wordCounter_text}>
              {contentLength}/500
            </div>
          </div>
        </div>
        <div className={styles.CommentButtonsBox}>
          {DisplayButtonSet()}
          
          <div style={{marginRight: "8rem"}}>
            <LockOutlinedIcon
              style={{
                fontSize: '2rem',
                position: 'absolute',
                marginLeft: '-1.3rem',
                marginTop: '0.2rem',
                color: '#a3a3a3'
              }}/>
            <FormControlLabel
              value="start"
              control={
                <Switch color="default" 
                  checked={commentIsFriendOnly} 
                  onChange={() => setCommentIsFriendOnly((prev) => !prev)} 
                />
              }
              label="Friends only"
              style={{color: "#a3a3a3"}}
              labelPlacement="start"
            />
          </div>

          {/* <div style={{width: '57%', alignSelf: 'center'}}>
            #BUTTONS#
          </div>*/}

        </div>
      </>
    )
  }

  useEffect(() => {
    GetOwnComment();
  },[])
  

  return (
    <>
      <div className={styles.CommentWindowTitle}>{commentTitleW}</div>
      <div className={styles.CommentBox}>
        {RenderComment(loadingComment)}
      </div>
    </>
  );
}

export default CommentWriteElement;
