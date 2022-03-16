import React, { FC } from 'react';
import { useParams } from 'react-router';
import styles from './Search.module.scss';

interface SearchProps {}



const Search: FC<SearchProps> = () => {
  const{searchString} = useParams();
  return(
    <>
  <div className={styles.Search}>
    {searchString}
  </div>
  </>
  )
};

export default Search;
