import React, { FC } from 'react';
import AddIMDBMovies from './AddIMDBMovies/AddIMDBMovies';
import AdminWindowComponent from '../AdminWindowComponent/AdminWindowComponent';
import styles from './MovieManagement.module.scss';

interface MovieManagementProps {}

const MovieManagement: FC<MovieManagementProps> = () => (
  <div className={styles.MovieManagement}>
    <AdminWindowComponent title={"Add movies via the TMDB API:"} iconSet={1} height={'12rem'} padding={'2.4rem'}> 
      <AddIMDBMovies />
    </AdminWindowComponent>
  </div>
);

export default MovieManagement;
