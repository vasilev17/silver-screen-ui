import React, { FC, useEffect, useState } from 'react';
import CommentElement from '../CommentElement/CommentElement';
import CommentSkeletonElement from '../CommentSkeletonElement/CommentSkeletonElement';
import styles from './CommentLoader.module.scss';

interface CommentLoaderProps {
  movieId: number;
}

const CommentLoader: FC<CommentLoaderProps> = (props) => {

  const [loadingComments, setLoadingComments] = useState(true);
  const [comments, setComments]:any = useState(null);

  function FetchComments(){
    const requestOptions = {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json', 
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
      },
    };
    fetch(`${process.env.REACT_APP_API}/Comments/GetComments?movieId=${props.movieId}`, requestOptions)
      .then(response => {
        if(response.ok) {
          return response.json();
        } else {
          setLoadingComments(false);
        }
      })
      .then(data => {
        setLoadingComments(false);
        setComments(data)
      })
      .catch(error => {
        setLoadingComments(false);
      });
  }

  function ReportComment(commentId){

  }

  function DisplayComments(isLoading){
    if(isLoading) {
      return (
        <>
          <CommentSkeletonElement />
          <br/>
          <CommentSkeletonElement />
          <br/>
          <CommentSkeletonElement />
        </>
      );
    }
    else {
      return (
        <>
          {comments !== null ? comments.comments.$values.map(data => (
              <div key={data.id}>
                <CommentElement
                  comment={data}
                  ReportComment={ReportComment}
                  isAuthorized={comments.authorized}
                />
                <br/>
              </div>
            )) : null}
        </>
      );
    }
  }

  useEffect(() => {
    FetchComments();
  },[])

  return (
    <div className={styles.CommentLoader}>
      {DisplayComments(loadingComments)}
    </div>
  );
}
export default CommentLoader;
