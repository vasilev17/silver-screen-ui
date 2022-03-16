import React, { FC } from 'react';
import MovieRow from '../MovieRow/MovieRow';
import styles from './Movies.module.scss';

function Movies() {
  return (
  <div className={styles.MovieRow}>

    <MovieRow genre="Action" content="Movie" showGenreTittle={true}/>
    <MovieRow genre="Comedy" content="Movie" showGenreTittle={true}/>
    <MovieRow genre="Family" content="Movie" showGenreTittle={true}/>
    <MovieRow genre="History" content="Movie" showGenreTittle={true}/>
    <MovieRow genre="Mystery" content="Movie" showGenreTittle={true}/>
    <MovieRow genre="Sci-Fi" content="Movie" showGenreTittle={true}/>
    <MovieRow genre="War" content="Movie" showGenreTittle={true}/>
    <MovieRow genre="Adventure" content="Movie" showGenreTittle={true}/>
    <MovieRow genre="Crime" content="Movie" showGenreTittle={true}/>
    <MovieRow genre="Fantasy" content="Movie" showGenreTittle={true}/>
    <MovieRow genre="Horror" content="Movie" showGenreTittle={true}/>
    <MovieRow genre="Sport" content="Movie" showGenreTittle={true}/>
    <MovieRow genre="Western" content="Movie" showGenreTittle={true}/>
    <MovieRow genre="Animation" content="Movie" showGenreTittle={true}/>
    <MovieRow genre="Documentary" content="Movie" showGenreTittle={true}/>
    <MovieRow genre="Reality-TV" content="Movie" showGenreTittle={true}/>
    <MovieRow genre="Biography" content="Movie" showGenreTittle={true}/>
    <MovieRow genre="Drama" content="Movie" showGenreTittle={true}/>
    <MovieRow genre="Game-Show" content="Movie" showGenreTittle={true}/>
    <MovieRow genre="Romance" content="Movie" showGenreTittle={true}/>
    <MovieRow genre="Thriller" content="Movie" showGenreTittle={true}/>

    </div>

  );
}

export default Movies;
