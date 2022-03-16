import React, { FC } from 'react';
import MovieRow from '../MovieRow/MovieRow';
import styles from './Series.module.scss';

function Series() {
  return (
  <div className={styles.MovieRow}>
    <MovieRow genre="Action" content="TVSeries" showGenreTittle={true}/>
    <MovieRow genre="Comedy" content="TVSeries" showGenreTittle={true}/>
    <MovieRow genre="Family" content="TVSeries" showGenreTittle={true}/>
    <MovieRow genre="History" content="TVSeries" showGenreTittle={true}/>
    <MovieRow genre="Mystery" content="TVSeries" showGenreTittle={true}/>
    <MovieRow genre="Sci-Fi" content="TVSeries" showGenreTittle={true}/>
    <MovieRow genre="War" content="TVSeries" showGenreTittle={true}/>
    <MovieRow genre="Adventure" content="TVSeries" showGenreTittle={true}/>
    <MovieRow genre="Crime" content="TVSeries" showGenreTittle={true}/>
    <MovieRow genre="Fantasy" content="TVSeries" showGenreTittle={true}/>
    <MovieRow genre="Horror" content="TVSeries" showGenreTittle={true}/>
    <MovieRow genre="Sport" content="TVSeries" showGenreTittle={true}/>
    <MovieRow genre="Western" content="TVSeries" showGenreTittle={true}/>
    <MovieRow genre="Animation" content="TVSeries" showGenreTittle={true}/>
    <MovieRow genre="Documentary" content="TVSeries" showGenreTittle={true}/>
    <MovieRow genre="Reality-TV" content="TVSeries" showGenreTittle={true}/>
    <MovieRow genre="Biography" content="TVSeries" showGenreTittle={true}/>
    <MovieRow genre="Drama" content="TVSeries" showGenreTittle={true}/>
    <MovieRow genre="Game-Show" content="TVSeries" showGenreTittle={true}/>
    <MovieRow genre="Romance" content="TVSeries" showGenreTittle={true}/>
    <MovieRow genre="Thriller" content="TVSeries" showGenreTittle={true}/>

    </div>

  );
}

export default Series;
