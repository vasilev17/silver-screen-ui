import React, { FC } from 'react';
import MovieRow from '../MovieRow/MovieRow';
import styles from './MainPage.module.scss';

function MainPage() {
  return (
  <div className={styles.MovieRow}>
    <MovieRow genre="Action" showGenreTittle={true}/>
    <MovieRow genre="Drama" showGenreTittle={true}/>
    <MovieRow genre="Comedy" showGenreTittle={true}/>
    <MovieRow genre="Family" showGenreTittle={true}/>
    <MovieRow genre="Adventure" showGenreTittle={true}/>


 

    </div>

  );
}
export default MainPage;
