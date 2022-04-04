import React, { FC, useEffect, useState, Component } from 'react';
import { useParams } from 'react-router';
import MovieRow from '../MovieRow/MovieRow';
import styles from './Search.module.scss';

interface SearchProps { }



const Search: FC<SearchProps> = () => {
  
  const { searchString } = useParams();
  
  document.title = `Silver Screen - Search for "${searchString}"`;
  
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
