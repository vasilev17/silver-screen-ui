import { Skeleton } from '@mui/material';
import React, { FC } from 'react';
import styles from './CommentSkeletonElement.module.scss';

interface CommentSkeletonElementProps {}

const CommentSkeletonElement: FC<CommentSkeletonElementProps> = () => (
  <div className={styles.CommentSkeletonElement}>
    <div style={{padding: '2rem', 
                 borderRight: 'solid 0.2rem #4d4d4d', 
                 height: '-webkit-fill-available'}}>
      <Skeleton variant="circular" width={"5rem"} height={"5rem"} style={{margin: 'auto'}} />
      <Skeleton variant="text" style={{width: '8rem',height: '1.5rem',marginTop: '0.5rem'}}/>
    </div>
    <div style={{padding: '1.4rem'}}>
      <Skeleton animation="wave" variant="text" width={"33rem"} />
      <Skeleton animation="wave" variant="text" width={"32rem"} />
      <Skeleton animation="wave" variant="text" width={"34rem"} />
      <Skeleton animation="wave" variant="text" width={"35.5rem"} />
      <Skeleton animation="wave" variant="text" width={"33rem"} />
      <Skeleton animation="wave" variant="text" width={"34rem"} />
    </div>
  </div>
);

export default CommentSkeletonElement;
