import { Skeleton } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import styles from './MovieRow.module.scss';
interface MovieRowProps {
  genre?,
  content?,
  showGenreTittle,
  myListIsWatched?
}
const MovieRow: FC<MovieRowProps> = (MovieRowInfo) => {

  const [movies, setMovies] = useState(null);
  const [loaded, setLoaded] = useState(false);
  var token = localStorage.getItem('token');

  useEffect(() => {
    const getDetail = async () => {
      const requestOptionsWithoutAuthorization = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      };
      const requestOptionsWithAuthorization = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      };
      if (MovieRowInfo.content == null) {
        if (MovieRowInfo.genre == null) {
          //myList movies
          fetch(`http://localhost:5000/api/MainPageMovieInfo/GetMoviesForMyList?watched=${MovieRowInfo.myListIsWatched}`, requestOptionsWithAuthorization)
            .then(response => {
              if (response.ok) {
                return response.json();
              } else {
                console.warn("Error while processing the request!");
              }
            })
            .then(data => { setMovies(data); setLoaded(true); });
        } else {
          //get movies with genre
          fetch(`http://localhost:5000/api/MainPageMovieInfo/GetMoviesForMainPage?genre=${MovieRowInfo.genre}`, requestOptionsWithoutAuthorization)
            .then(response => {
              if (response.ok) {
                return response.json();
              } else {
                console.warn("Error while processing the request!");
              }
            })
            .then(data => { setMovies(data); setLoaded(true); });
        }
      } else {
        //get movies with content and genre
        fetch(`http://localhost:5000/api/MainPageMovieInfo/GetMoviesByContentAndGenre?genre=${MovieRowInfo.genre}&content=${MovieRowInfo.content}`, requestOptionsWithoutAuthorization)
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

  function DisplayMoviesInSeparateRows() {
    return (
      <>
        <div className={styles.rowThumbnails2}>
          {movies.$values.map((movie, i) => (
            <img onClick={() => handleClick(movie.id)} key={i}
              className={styles.rowThumbnail}
              src={movie.thumbnail}
              alt={movie.title}
            />
          ))}
        </div>
      </>

    )
  }

  function DisplayMovies() {
    if (loaded) {
      //movie map code
      if (MovieRowInfo.myListIsWatched != null) {

        return DisplayMoviesInSeparateRows();
      } else {


        return (
          <>
            {MovieRowInfo.showGenreTittle && <h2 className={styles.title}>{MovieRowInfo.genre}</h2>}

            <div className={styles.rowThumbnails}>
              {movies.$values.map((movie, i) => (
                <img onClick={() => handleClick(movie.id)} key={i}
                  className={styles.rowThumbnail}
                  src={movie.thumbnail}
                  alt={movie.title}
                />
              ))}
            </div>
          </>
        );
      }
    }
    else {
      //skeleton code
      return (
        <div style={{ display: "flex" }}>
          <Skeleton variant="rectangular" width={150} height={225} style={{ marginRight: "10px", borderRadius: "25px" }} />
          <Skeleton variant="rectangular" width={150} height={225} style={{ marginRight: "10px", borderRadius: "25px" }} />
          <Skeleton variant="rectangular" width={150} height={225} style={{ marginRight: "10px", borderRadius: "25px" }} />
          <Skeleton variant="rectangular" width={150} height={225} style={{ marginRight: "10px", borderRadius: "25px" }} />
          <Skeleton variant="rectangular" width={150} height={225} style={{ marginRight: "10px", borderRadius: "25px" }} />
          <Skeleton variant="rectangular" width={150} height={225} style={{ marginRight: "10px", borderRadius: "25px" }} />
          <Skeleton variant="rectangular" width={150} height={225} style={{ marginRight: "10px", borderRadius: "25px" }} />
          <Skeleton variant="rectangular" width={150} height={225} style={{ marginRight: "10px", borderRadius: "25px" }} />
          <Skeleton variant="rectangular" width={150} height={225} style={{ marginRight: "10px", borderRadius: "25px" }} />
          <Skeleton variant="rectangular" width={150} height={225} style={{ marginRight: "10px", borderRadius: "25px" }} />
          <Skeleton variant="rectangular" width={150} height={225} style={{ marginRight: "10px", borderRadius: "25px" }} />
        </div>
      );
    }
  }


  return (
    <>



      <div className={styles.row}>
        {DisplayMovies()}
      </div>
    </>
  );
}
export default MovieRow;
