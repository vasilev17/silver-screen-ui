import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import MovieRow from '../MovieRow/MovieRow';
import styles from './Search.module.scss';

interface SearchProps { }



const Search: FC<SearchProps> = () => {
  
  const { searchString } = useParams();
  
  
  return (
    <>
      <div className={styles.Search}>
      <MovieRow searchString={searchString} showGenreTittle={false}/>
      </div>
    </>
  )
};

export default Search;
