import React, { FC } from 'react';
import styles from './CommentSkeletonElement.module.scss';

interface CommentSkeletonElementProps {}

const CommentSkeletonElement: FC<CommentSkeletonElementProps> = () => (
  <div className={styles.CommentSkeletonElement}>
    CommentSkeletonElement Component
  </div>
);

export default CommentSkeletonElement;
