import { fontWeight } from '@mui/system';
import React, { FC } from 'react';
import styles from './MovieInfo.module.scss';
import '../MovieInfo/MovieInfo.module.scss';

interface MovieInfoProps { }

const MovieInfo: FC<MovieInfoProps> = () => (
  <>
    <div className={styles.banner} style={{ backgroundImage: `url(https://imdb-api.com/images/original/MV5BMDE5OWMzM2QtOTU2ZS00NzAyLWI2MDEtOTRlYjIxZGM0OWRjXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_Ratio0.7273_AL_.jpg)` }}></div>


    <div className={`${styles.movieContent} ${styles.container}`}>
      <div className={styles.movieContent__poster}>
        <div className={`${styles.movieContent__poster} ${styles.movieContent__image}`} style={{ backgroundImage: `url(https://imdb-api.com/images/original/MV5BMDE5OWMzM2QtOTU2ZS00NzAyLWI2MDEtOTRlYjIxZGM0OWRjXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_Ratio0.7273_AL_.jpg)` }}></div>
      </div>
      <div className={styles.movieContent__info}>
        <h1 className={styles.title}>
          The Revenant
        </h1>
        <div className={styles.genres}>
              <span className={styles.genres__item}>Action</span>
              <span className={styles.genres__item}>Adventure</span>
              <span className={styles.genres__item}>Drama</span>
        </div>
        <p className={styles.description}>While exploring uncharted wilderness in 1823, legendary frontiersman Hugh Glass sustains injuries from a brutal bear attack. When his hunting team leaves him for dead, Glass must utilize his survival skills to find a way back home while avoiding natives on their own hunt. Grief-stricken and fueled by vengeance, Glass treks through the wintry terrain to track down John Fitzgerald, the former confidant who betrayed and abandoned him.</p>
      </div>
    </div>


  </>
);

export default MovieInfo;
