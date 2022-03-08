import React, { FC } from 'react';
import MovieRow from '../MovieRow/MovieRow';
import styles from './Series.module.scss';

function Series() {
  return (
  <div style = {{marginTop:"100px"}}className="MovieRow">
    <MovieRow genre="Action" content="TVSeries"/>
    <MovieRow genre="Drama" content="TVSeries"/>
    <MovieRow genre="Comedy" content="TVSeries"/>
    <MovieRow genre="Family" content="TVSeries"/>
    <MovieRow genre="Adventure" content="TVSeries"/>




    </div>

  );
}

export default Series;
