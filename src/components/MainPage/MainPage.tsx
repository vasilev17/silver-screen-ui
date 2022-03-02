import React, { FC } from 'react';
import MovieRow from '../MovieRow/MovieRow';
import styles from './MainPage.module.scss';

function MainPage() {
  return (
  <div style = {{marginTop:"100px"}}className="MovieRow">
    <MovieRow title="Action"/>
    <MovieRow title="Drama"/>
    <MovieRow title="Comedy"/>
    <MovieRow title="Family"/>
    <MovieRow title="Adventure"/>




    </div>

  );
}
export default MainPage;
