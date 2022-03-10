import { Skeleton } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import styles from './MovieRow.module.scss';
interface MovieRowProps {
  genre,
  content?
}
const MovieRow: FC<MovieRowProps> = (MovieRowInfo) => {
  const [movies, setMovies] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const getDetail = async () => {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      };
      if (MovieRowInfo.content == null) {
        fetch(`http://localhost:5000/api/MainPageMovieInfo/GetMoviesForMainPage?genre=${MovieRowInfo.genre}`, requestOptions)
          .then(response => {
            if (response.ok) {
              return response.json();
            } else {
              console.warn("Error while processing the request!");
            }
          })
          .then(data => { setMovies(data); setLoaded(true); });
      } else {
        fetch(`http://localhost:5000/api/MainPageMovieInfo/GetMoviesByContentAndGenre?genre=${MovieRowInfo.genre}&content=${MovieRowInfo.content}`, requestOptions)
          .then(response => {
            if (response.ok) {
              return response.json();
            } else {
              console.warn("Error while processing the request!");
            }
          })
          .then(data => { setMovies(data); setLoaded(true); });
      }
      window.scrollTo(0, 0);
    }
    getDetail();

  }, [MovieRowInfo.genre]);



  const handleClick = (id) => {
    window.location.href = "/title/" + id;

  };

  function DisplayMovies() {
    if (loaded) {
      //movie map code
      return (
        <>
          {movies.$values.map((movie, i) => (
            <img onClick={() => handleClick(movie.id)} key={i}
              className={styles.rowThumbnail}
              src={movie.thumbnail}
              alt={movie.title}
            />
          ))}
        </>
      );
    }
    else {
      //skeleton code
      return (
        <>
          <Skeleton variant="rectangular" width={150} height={225} style={{marginRight: "10px", borderRadius: "25px"}}/>
          <Skeleton variant="rectangular" width={150} height={225} style={{marginRight: "10px", borderRadius: "25px"}}/>
          <Skeleton variant="rectangular" width={150} height={225} style={{marginRight: "10px", borderRadius: "25px"}}/>
          <Skeleton variant="rectangular" width={150} height={225} style={{marginRight: "10px", borderRadius: "25px"}}/>
          <Skeleton variant="rectangular" width={150} height={225} style={{marginRight: "10px", borderRadius: "25px"}}/>
          <Skeleton variant="rectangular" width={150} height={225} style={{marginRight: "10px", borderRadius: "25px"}}/>
          <Skeleton variant="rectangular" width={150} height={225} style={{marginRight: "10px", borderRadius: "25px"}}/>
          <Skeleton variant="rectangular" width={150} height={225} style={{marginRight: "10px", borderRadius: "25px"}}/>
          <Skeleton variant="rectangular" width={150} height={225} style={{marginRight: "10px", borderRadius: "25px"}}/>
          <Skeleton variant="rectangular" width={150} height={225} style={{marginRight: "10px", borderRadius: "25px"}}/>
          <Skeleton variant="rectangular" width={150} height={225} style={{marginRight: "10px", borderRadius: "25px"}}/>
        </>
      );
    }
  }


  return (
    <>



      <div className={styles.row}>
        <h2 className={styles.title}>{MovieRowInfo.genre}</h2>

        <div className={styles.rowThumbnails}>
          {DisplayMovies()}
        </div>
      </div>
    </>
  ); 
}
export default MovieRow;
