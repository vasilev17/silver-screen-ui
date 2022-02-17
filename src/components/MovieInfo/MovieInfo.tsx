import React, { FC } from 'react';
import styles from './MovieInfo.module.scss';

interface MovieInfoProps {}

const MovieInfo: FC<MovieInfoProps> = () => (
  <div className={styles.MovieInfo}>
    MovieInfo Component
  </div>
);

export default MovieInfo;
