import React, { FC } from 'react';
import MovieRow from '../MovieRow/MovieRow';
import styles from './Movies.module.scss';

function Movies() {
  return (
  <div className={styles.MovieRow}>
    <MovieRow genre="Action" content="Movie" showGenreTittle={true}/>
    <MovieRow genre="Drama" content="Movie" showGenreTittle={true}/>
    <MovieRow genre="Comedy" content="Movie" showGenreTittle={true}/>
    <MovieRow genre="Family" content="Movie" showGenreTittle={true}/>
    <MovieRow genre="Adventure" content="Movie" showGenreTittle={true}/>




    </div>

  );
}

export default Movies;
