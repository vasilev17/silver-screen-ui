import React, { FC } from 'react';
import MovieRow from '../MovieRow/MovieRow';
import styles from './MainPage.module.scss';

function MainPage() {
  return (
  <div style = {{marginTop:"100px"}}className="MovieRow">
    <MovieRow genre="Action"/>
    <MovieRow genre="Drama"/>
    <MovieRow genre="Comedy"/>
    <MovieRow genre="Family"/>
    <MovieRow genre="Adventure"/>




    </div>

  );
}
export default MainPage;
