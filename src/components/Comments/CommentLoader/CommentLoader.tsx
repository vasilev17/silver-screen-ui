import React, { FC } from 'react';
import styles from './CommentLoader.module.scss';

interface CommentLoaderProps {
  movieId: number;
}

const CommentLoader: FC<CommentLoaderProps> = (props) => (
  <div className={styles.CommentLoader}>
    CommentLoader Component
  </div>
);

export default CommentLoader;
