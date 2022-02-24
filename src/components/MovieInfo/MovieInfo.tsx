import { fontWeight } from '@mui/system';
import React, { FC, useEffect, useState } from 'react';
import styles from './MovieInfo.module.scss';
import '../MovieInfo/MovieInfo.module.scss';
import { useParams } from 'react-router-dom';

interface MovieInfoProps { }


const MovieInfo: FC<MovieInfoProps> = () => {

  const { id } = useParams();

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const getDetail = async () => {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      };
      fetch(`http://localhost:5000/MovieInfo/MovieGetRequest?movieID=${id}`, requestOptions)
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            alert("Error while processing the request!");
          }
        })
        .then(data => { setMovie(data); });

      window.scrollTo(0, 0);
    }
     getDetail();

  }, [id]);



  return (
    <>
      {
        movie && (
          <>
            <div className={styles.banner} style={{ backgroundImage: `url(${movie.thumbnail})` }}></div>


            <div className={styles.movieContent}>
              <div className={styles.movieContent__poster}>
                <div className={`${styles.movieContent__poster} ${styles.movieContent__image}`} style={{ backgroundImage: `url(${movie.thumbnail})` }}></div>
              </div>
              <div className={styles.movieContent__info}>
                <h1 className={styles.title}>
                {movie.title}
                </h1>
                <p className={styles.description}>{movie.description}</p>
              </div>
            </div>
            <div className={styles.genres}>
              <span className={styles.genres__sectionTitle}>Genres:</span>
              <hr className={styles.genres__sectionSeparator} />
              <span className={styles.genres__item}>Action</span>
              <span className={styles.genres__item}>Adventure</span>
              <span className={styles.genres__item}>Drama</span>
            </div>
          </>

        )
      }
      </>
  );
}

export default MovieInfo;
