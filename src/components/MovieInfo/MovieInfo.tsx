import { fontWeight } from '@mui/system';
import React, { FC, useEffect, useState } from 'react';
import styles from './MovieInfo.module.scss';
import '../MovieInfo/MovieInfo.module.scss';
import { useParams } from 'react-router-dom';
import { Title } from '@mui/icons-material';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import { yellow } from '@mui/material/colors';

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
      fetch(`http://localhost:5000/api/MovieInfo/MovieInfoGetRequest?movieID=${id}`, requestOptions)
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            console.warn("Error while processing the request!");
          }
        })
        .then(info => {
          setData(info);
          info.movie.releaseDate.includes('(') ? document.title = info.movie.title + " " + info.movie.releaseDate : document.title = info.movie.title + " (" + info.movie.releaseDate + ")";
          info.movie.duration < 60 ? setDuration(info.movie.duration + "m") : setDuration(Math.floor(info.movie.duration / 60) + 'h ' + info.movie.duration % 60 + 'm')
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
                <h2 className={styles.subtitleInfo}>{data.movie.releaseDate + ' | ' + data.movie.maturityRating + ' | ' + duration}</h2>
                <p className={styles.movieDescription}>{data.movie.description}</p>
              </div>

              <div className={styles.ratings}>
                <span className={styles.sectionTitle}>Ratings:</span>
                <hr className={styles.sectionSeparator} />

                <div className={styles.ratings__ratingSection}>
                  <div className={styles.ratings__ratingSource}>
                    <img src="/IMDb_icon.svg" alt="IMDb:" />
                    <StarRoundedIcon className={styles.ratings__ratingStar} />
                    <span className={styles.ratings__ratingNumber}>{data.movie.rating.toFixed(1)}</span>
                    <span className={styles.ratings__ratingOutOf}>/10</span>
                  </div>

                  <div className={styles.ratings__ratingSource}>
                    <img src="/FriendRating_icon.svg" alt="Friend Rating:" />
                    <StarRoundedIcon className={styles.ratings__ratingStar} />
                    <span className={styles.ratings__ratingNumber}>???</span>
                    <span className={styles.ratings__ratingOutOf}>/10</span>
                  </div>
                </div>

              </div>

              <div className={styles.genres}>
                <span className={styles.sectionTitle}>Genres:</span>
                <hr className={styles.sectionSeparator} />
                {
                  data.genres.$values.map((genre, i) => (
                    <a href={'/' + genre} key={i} className={styles.genres__item}>{genre}</a>
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
