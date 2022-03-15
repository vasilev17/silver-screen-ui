import React, { FC } from 'react';
import MovieRow from '../MovieRow/MovieRow';
import styles from './Series.module.scss';

function Series() {
  return (
  <div className={styles.MovieRow}>
    <MovieRow genre="Action" content="TVSeries" showGenreTittle={true}/>
    <MovieRow genre="Drama" content="TVSeries" showGenreTittle={true}/>
    <MovieRow genre="Comedy" content="TVSeries" showGenreTittle={true}/>
    <MovieRow genre="Family" content="TVSeries" showGenreTittle={true}/>
    <MovieRow genre="Adventure" content="TVSeries" showGenreTittle={true}/>




    </div>

  );
}

export default Series;
