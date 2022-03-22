import { FormControlLabel, IconButton, Switch } from '@mui/material';
import React, { FC, useState } from 'react';
import styles from './CommentWriteElement.module.scss';
import SendIcon from '@mui/icons-material/Send';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

interface CommentWriteElementProps {
  movieId:number;
}

const CommentWriteElement: FC<CommentWriteElementProps> = (props) => {

  const [commentTitleW, setCommentTitle] = useState("Post a comment:");
  const [contentLength, setContentLength] = useState(0);

  function RefreshTextLenght(){
    var textBox = document.getElementById('commentTextArea') as HTMLTextAreaElement;
    setContentLength(textBox.value.length);
    if(textBox.value.length > 500){
      textBox.value = textBox.value.substring(0, 500);
      setContentLength(500);
    }
  }
  

  return (
    <>
      <div className={styles.CommentWindowTitle}>{commentTitleW}</div>
      <div className={styles.CommentBox}>
        <div className={styles.CommentTextBox}>
          <textarea id="commentTextArea" 
            onKeyPress={() => RefreshTextLenght()} 
            onKeyDown={() => RefreshTextLenght()}
            onKeyUp={() => RefreshTextLenght()}
            className={styles.CommentTextBox_input}
            />
          <div className={styles.CommentTextBox_wordCounter}>
            <div className={styles.CommentTextBox_wordCounter_text}>
              {contentLength}/500
            </div>
          </div>
        </div>
        <div className={styles.CommentButtonsBox}>
          <IconButton aria-label="Send" style={{color: "#808080"}}>
            <SendIcon />
          </IconButton>
          
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
              control={<Switch color="default" />}
              label="Friends only"
              style={{color: "#a3a3a3"}}
              labelPlacement="start"
            />
          </div>

          <div style={{width: '57%', alignSelf: 'center'}}>
            #BUTTONS#
          </div>          

        </div>

      </div>
    </>
  );
}

export default CommentWriteElement;
