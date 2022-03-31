import React, { FC, useEffect } from 'react';
import MovieRow from '../MovieRow/MovieRow';
import styles from './MainPage.module.scss';

function MainPage() {


  useEffect(() => {

    //Load scroll data
    setTimeout(() => {
      const scrollPosition = sessionStorage.getItem("mainPageScrollPosition");
      if (scrollPosition) {
        window.scroll(0, parseInt(scrollPosition));
        sessionStorage.removeItem("mainPageScrollPosition");
      }else{
        window.scrollTo(0, 0);
      }
    }, 150);

  }, []);

  return (
  <div className={styles.MovieRow}>

    <MovieRow genre="Action" showGenreTittle={true}/>
    <MovieRow genre="Comedy" showGenreTittle={true}/>
    <MovieRow genre="Family" showGenreTittle={true}/>
    <MovieRow genre="History" showGenreTittle={true}/>
    <MovieRow genre="Mystery" showGenreTittle={true}/>
    <MovieRow genre="Science Fiction" showGenreTittle={true}/>
    <MovieRow genre="War" showGenreTittle={true}/>
    <MovieRow genre="Adventure" showGenreTittle={true}/>
    <MovieRow genre="Crime" showGenreTittle={true}/>
    <MovieRow genre="Fantasy" showGenreTittle={true}/>
    <MovieRow genre="Horror" showGenreTittle={true}/>
    <MovieRow genre="Sport" showGenreTittle={true}/>
    <MovieRow genre="Western" showGenreTittle={true}/>
    <MovieRow genre="Animation" showGenreTittle={true}/>
    <MovieRow genre="Documentary" showGenreTittle={true}/>
    <MovieRow genre="Reality-TV" showGenreTittle={true}/>
    <MovieRow genre="Biography" showGenreTittle={true}/>
    <MovieRow genre="Drama" showGenreTittle={true}/>
    <MovieRow genre="Game-Show" showGenreTittle={true}/>
    <MovieRow genre="Romance" showGenreTittle={true}/>
    <MovieRow genre="Thriller" showGenreTittle={true}/>

    </div>

  );
}
export default MainPage;
