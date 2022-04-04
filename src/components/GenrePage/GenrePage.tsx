import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MovieRow from '../MovieRow/MovieRow';
import styles from './GenrePage.module.scss';

interface GenrePageProps { }
const GenrePage: FC<GenrePageProps> = () => {

  const { genre } = useParams();
  document.title = `Silver Screen - ${genre.charAt(0).toUpperCase() + genre.slice(1)}`;
  const genreString = genre.split(" ");

  useEffect(() => {

    //Load scroll data
    setTimeout(() => {
      const scrollPosition = sessionStorage.getItem(`genrePageScrollPosition - ${genre}`);
      if (scrollPosition) {
        window.scroll(0, parseInt(scrollPosition));
        sessionStorage.removeItem(`genrePageScrollPosition - ${genre}`);
      }else{
        window.scrollTo(0, 0);
      }
    }, 150);

  }, []);
  
  for (let i = 0 ; i < genreString.length ; i++){
    genreString[i] = genreString[i][0].toUpperCase() + genreString[i].substr(1) + " ";
  }

  return (
    <>
      <h1 className={styles.Title}>{
        genreString
      }</h1>
      <div className={styles.GenrePage}>
        <MovieRow genre={genre} />
      </div>
    </>
    
  )
};

export default GenrePage;
