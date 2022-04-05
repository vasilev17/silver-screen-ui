import { Button, CircularProgress } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import AdminWindowComponent from '../AdminWindowComponent/AdminWindowComponent';
import styles from './CommentManagement.module.scss';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';

interface CommentManagementProps {}

const CommentManagement: FC<CommentManagementProps> = () => {

  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isThereAComment, setIsThereAComment] = useState(false);

  const [timesReported, setTimesReported] = useState(0);
  const [commentContents, setCommentContents] = useState("");
  const [reportId, setReportId] = useState(0);

  function GetComment() {
    const requestOptions = {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json', 
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
      },
    };
    fetch(`${process.env.REACT_APP_API}/AdministrationManagment/LoadCommentForReview`, requestOptions)
      .then(response => {
        if(response.ok) {
          return response.json();
        } else {
          setIsPageLoading(false);
        }
      })
      .then(data => {
        setIsPageLoading(false);
        setIsThereAComment(data.commentForReview != null);
        
        if(data.commentForReview != null)
        {
          setTimesReported(data.commentForReview.timesReported);
          setCommentContents(data.commentForReview.contents);
          setReportId(data.commentForReview.reviewId);
        }
      })
      .catch(error => {
        setIsPageLoading(false);
      });
  }

  function RenderPage() {
    if(isPageLoading){
      return(
        <div className={styles.LoadingContent}>
          <CircularProgress color='inherit' size={"3.5rem"} />
          <div style={{marginTop: '0.7rem'}}>Loading next comment...</div>
        </div>
      );
    } 
    else if(isThereAComment){
      return (
        <div className={styles.ReportWindow}>
          <div>
            <div className={styles.ContentTitle}>Contents:</div>
            <div className={styles.ContentBox}>
              <div className={styles.ContentBox_text}>
                {commentContents}
              </div>
            </div>
            <div className={styles.ContentBottomTitle}>
              <ReportGmailerrorredIcon style={{fontSize: '2rem'}}/>
              <div style={{marginLeft: '0.4rem'}}>This comment was reported {timesReported > 1 ? `${timesReported} times by the users` : ` only once`}.</div>
            </div>
          </div>
          <div className={styles.AddPriv}>
            <div className={styles.AddPriv_title}>Available actions:</div>
            <Button variant="contained" style={{background: '#333333', color: '#808080', width: '16rem', marginBottom: '0.7rem'}}>Report as false positive</Button>
            <Button variant="contained" style={{background: '#333333', color: '#808080', width: '16rem', marginBottom: '0.7rem'}}>Issue a warning to the user</Button>
            <Button variant="contained" style={{background: '#333333', color: '#808080', width: '16rem'}}>Issue a ban to the user</Button>
          </div>
        </div>
      );
    }
    else {
      return (
        <div className={styles.NoReportedText}>
          <p className={styles.NoReportedText1}>No reported comments for now.</p>
          <p className={styles.NoReportedText2}>Looks like that the users are behaving :D</p>
        </div>
      );
    }
  }

  useEffect(() => {
    GetComment();
  }, [])
  

  return (
    <div>
      <AdminWindowComponent title={"Comment moderation"} iconSet={2} height={'17.8rem'} padding={'0.9rem'}> 
        {RenderPage()}
      </AdminWindowComponent>
    </div>
  );
}
export default CommentManagement;
