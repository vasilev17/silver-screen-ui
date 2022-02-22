import React, { FC } from 'react';
import styles from './MovieRow.module.scss';

interface MovieRowProps {}

const MovieRow: FC<MovieRowProps> = () => (
  <div className={styles.MovieRow}>
    MovieRow Component
  </div>
);

export default MovieRow;
