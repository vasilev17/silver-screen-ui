import React, { FC } from 'react';
import MovieRow from '../MovieRow/MovieRow';
import styles from './Movies.module.scss';

function Movies() {
  return (
  <div className={styles.MovieRow}>
    <MovieRow genre="Action" content="Movie"/>
    <MovieRow genre="Drama" content="Movie"/>
    <MovieRow genre="Comedy" content="Movie"/>
    <MovieRow genre="Family" content="Movie"/>
    <MovieRow genre="Adventure" content="Movie"/>




    </div>

  );
}

export default Movies;
