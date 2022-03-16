import React, { FC } from 'react';
import styles from './CommentElement.module.scss';

interface CommentElementProps {}

const CommentElement: FC<CommentElementProps> = () => (
  <div className={styles.CommentElement}>
    CommentElement Component
  </div>
);

export default CommentElement;
