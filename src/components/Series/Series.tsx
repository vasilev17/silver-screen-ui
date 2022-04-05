import React, { FC, useEffect } from 'react';
import MovieRow from '../MovieRow/MovieRow';
import styles from './Series.module.scss';

function Series() {

  document.title = `Silver Screen - Series`;

  useEffect(() => {

    //Load scroll data
    let stateCheck = setInterval(() => {
      if (document.readyState === 'complete') {
        clearInterval(stateCheck);
      const scrollPosition = sessionStorage.getItem("seriesPageScrollPosition");
      if (scrollPosition) {
        window.scroll(0, parseInt(scrollPosition));
        sessionStorage.removeItem("seriesPageScrollPosition");
      }else{
        window.scrollTo(0, 0);
      }
    }
  }, 100);

    

  }, []);

  return (
  <div className={styles.MovieRow}>
    <MovieRow genre="Action" content="TVSeries" showGenreTittle={true}/>
    <MovieRow genre="Comedy" content="TVSeries" showGenreTittle={true}/>
    <MovieRow genre="Family" content="TVSeries" showGenreTittle={true}/>
    <MovieRow genre="History" content="TVSeries" showGenreTittle={true}/>
    <MovieRow genre="Mystery" content="TVSeries" showGenreTittle={true}/>
    <MovieRow genre="Sci-Fi" showGenreTittle={true}/>
    <MovieRow genre="War" content="TVSeries" showGenreTittle={true}/>
    <MovieRow genre="Adventure" content="TVSeries" showGenreTittle={true}/>
    <MovieRow genre="Crime" content="TVSeries" showGenreTittle={true}/>
    <MovieRow genre="Fantasy" content="TVSeries" showGenreTittle={true}/>
    <MovieRow genre="Western" content="TVSeries" showGenreTittle={true}/>
    <MovieRow genre="Animation" content="TVSeries" showGenreTittle={true}/>
    <MovieRow genre="Documentary" content="TVSeries" showGenreTittle={true}/>
    <MovieRow genre="Reality" content="TVSeries" showGenreTittle={true}/>
    <MovieRow genre="Drama" content="TVSeries" showGenreTittle={true}/>
    <MovieRow genre="Romance" content="TVSeries" showGenreTittle={true}/>
    <MovieRow genre="Thriller" content="TVSeries" showGenreTittle={true}/>

    </div>

  );
}

export default Series;
