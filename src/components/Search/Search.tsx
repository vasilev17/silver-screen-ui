import React, { FC, useEffect, useState, Component } from 'react';
import { useParams } from 'react-router';
import MovieRow from '../MovieRow/MovieRow';
import styles from './Search.module.scss';

interface SearchProps { }



const Search: FC<SearchProps> = () => {
  
  const { searchString } = useParams();
  
  document.title = `Silver Screen - Search for "${searchString}"`;
  
  useEffect(() => {

    //Load scroll data
    setTimeout(() => {
      const scrollPosition = sessionStorage.getItem(`searchPageScrollPosition - ${searchString}`);
      if (scrollPosition) {
        window.scroll(0, parseInt(scrollPosition));
        sessionStorage.removeItem(`searchPageScrollPosition - ${searchString}`);
      }else{
        window.scrollTo(0, 0);
      }
    }, 150);

  }, []);

  return (
    <>
    <h1 className={styles.Title}>Results for: {searchString}</h1>
      <div className={styles.Search}>
      <MovieRow searchString={searchString} showGenreTittle={false}/>
      </div>
    </>
  )
};

export default Search;
