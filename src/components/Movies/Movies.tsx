import React, { FC } from 'react';
import MovieRow from '../MovieRow/MovieRow';
import styles from './Movies.module.scss';

function Movies() {

  document.title = `Silver Screen - Movies`;

  return (
  <div className={styles.MovieRow}>

    <MovieRow genre="Action" content="Movie" showGenreTittle={true}/>
    <MovieRow genre="Comedy" content="Movie" showGenreTittle={true}/>
    <MovieRow genre="Family" content="Movie" showGenreTittle={true}/>
    <MovieRow genre="History" content="Movie" showGenreTittle={true}/>
    <MovieRow genre="Mystery" content="Movie" showGenreTittle={true}/>
    <MovieRow genre="Sci-Fi" showGenreTittle={true}/>
    <MovieRow genre="Science Fiction" content="Movie" showGenreTittle={true}/>
    <MovieRow genre="War" content="Movie" showGenreTittle={true}/>
    <MovieRow genre="Adventure" content="Movie" showGenreTittle={true}/>
    <MovieRow genre="Crime" content="Movie" showGenreTittle={true}/>
    <MovieRow genre="Fantasy" content="Movie" showGenreTittle={true}/>
    <MovieRow genre="Horror" content="Movie" showGenreTittle={true}/>
    <MovieRow genre="Western" content="Movie" showGenreTittle={true}/>
    <MovieRow genre="Animation" content="Movie" showGenreTittle={true}/>
    <MovieRow genre="Documentary" content="Movie" showGenreTittle={true}/>
    <MovieRow genre="Drama" content="Movie" showGenreTittle={true}/>
    <MovieRow genre="Romance" content="Movie" showGenreTittle={true}/>
    <MovieRow genre="Thriller" content="Movie" showGenreTittle={true}/>

    </div>

  );
}

export default Movies;
