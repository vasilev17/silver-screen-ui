import { fontWeight } from '@mui/system';
import React, { FC, useEffect, useState } from 'react';
import styles from './MovieInfo.module.scss';
import '../MovieInfo/MovieInfo.module.scss';
import { useParams } from 'react-router-dom';
import { Title } from '@mui/icons-material';

interface MovieInfoProps { }


const MovieInfo: FC<MovieInfoProps> = () => {

  const { id } = useParams();

  const [data, setData] = useState(null);

  const [duration, setDuration] = useState(null);


  useEffect(() => {
    const getDetail = async () => {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      };
      fetch(`http://localhost:5000/MovieInfo/MovieInfoGetRequest?movieID=${id}`, requestOptions)
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            alert("Error while processing the request!");
          }
        })
        .then(info => {
          setData(info);
          info.movie.releaseDate.includes('(') ? document.title = info.movie.title + " " + info.movie.releaseDate : document.title = info.movie.title + " (" + info.movie.releaseDate + ")";
          setDuration(Math.floor(info.movie.duration/60) + 'h ' +info.movie.duration%60 + 'm')
        });

      window.scrollTo(0, 0);
    }
    getDetail();
  }, [id]);



  return (
    <>
      {
        data && (
          <>
            <div className={styles.banner} style={{ backgroundImage: `url(${data.movie.thumbnail})` }}></div>

            <div className={styles.content}>

              <div className={styles.movieImage} style={{ backgroundImage: `url(${data.movie.thumbnail})` }}></div>

              <div className={styles.movieInfo}>
                <h1 className={styles.movieTitle}>{data.movie.title}</h1>
                <h2 className={styles.subtitleInfo}>{data.movie.releaseDate + ' | '+ data.movie.maturityRating + ' | ' + duration}</h2>
                <p className={styles.movieDescription}>{data.movie.description}</p>
              </div>

              <div className={styles.genres}>
                <span className={styles.genres__sectionTitle}>Genres:</span>
                <hr className={styles.genres__sectionSeparator} />
                {
                  data.genres.$values.map((genre, i) => (
                    <span key={i} className={styles.genres__item}>{genre}</span>
                  ))
                }
              </div>

            </div>
          </>

        )
      }
    </>
  );
}

export default MovieInfo;
